import { GraphQLError } from "graphql";
import type { Context } from "../../context.js";
import { requireAuth } from "./user.js";

type CreateInput = {
  title: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  date: Date;
  categoryId?: string | null;
};

type UpdateInput = Partial<CreateInput>;

const include = { category: true } as const;

const findOwned = async (ctx: Context, userId: string, id: string) => {
  const transaction = await ctx.prisma.transaction.findFirst({
    where: { id, userId },
  });
  if (!transaction) {
    throw new GraphQLError("Transação não encontrada", {
      extensions: { code: "NOT_FOUND" },
    });
  }
  return transaction;
};

const assertCategoryOwnership = async (
  ctx: Context,
  userId: string,
  categoryId: string | null | undefined,
) => {
  if (!categoryId) return;
  const category = await ctx.prisma.category.findFirst({
    where: { id: categoryId, userId },
  });
  if (!category) {
    throw new GraphQLError("Categoria inválida", {
      extensions: { code: "BAD_USER_INPUT" },
    });
  }
};

export const transactionResolvers = {
  Query: {
    transactions: (_: unknown, __: unknown, ctx: Context) => {
      const userId = requireAuth(ctx.userId);
      return ctx.prisma.transaction.findMany({
        where: { userId },
        orderBy: { date: "desc" },
        include,
      });
    },
    transaction: async (_: unknown, { id }: { id: string }, ctx: Context) => {
      const userId = requireAuth(ctx.userId);
      await findOwned(ctx, userId, id);
      return ctx.prisma.transaction.findUnique({ where: { id }, include });
    },
    transactionsSummary: async (_: unknown, __: unknown, ctx: Context) => {
      const userId = requireAuth(ctx.userId);
      const grouped = await ctx.prisma.transaction.groupBy({
        by: ["type"],
        where: { userId },
        _sum: { amount: true },
      });
      const totals = { INCOME: 0, EXPENSE: 0 };
      for (const row of grouped) {
        if (row.type === "INCOME" || row.type === "EXPENSE") {
          totals[row.type] = row._sum.amount ?? 0;
        }
      }
      return {
        income: totals.INCOME,
        expense: totals.EXPENSE,
        balance: totals.INCOME - totals.EXPENSE,
      };
    },
  },
  Mutation: {
    createTransaction: async (
      _: unknown,
      { input }: { input: CreateInput },
      ctx: Context,
    ) => {
      const userId = requireAuth(ctx.userId);
      await assertCategoryOwnership(ctx, userId, input.categoryId);
      return ctx.prisma.transaction.create({
        data: { ...input, userId },
        include,
      });
    },
    updateTransaction: async (
      _: unknown,
      { id, input }: { id: string; input: UpdateInput },
      ctx: Context,
    ) => {
      const userId = requireAuth(ctx.userId);
      await findOwned(ctx, userId, id);
      await assertCategoryOwnership(ctx, userId, input.categoryId);
      return ctx.prisma.transaction.update({
        where: { id },
        data: input,
        include,
      });
    },
    deleteTransaction: async (_: unknown, { id }: { id: string }, ctx: Context) => {
      const userId = requireAuth(ctx.userId);
      await findOwned(ctx, userId, id);
      await ctx.prisma.transaction.delete({ where: { id } });
      return true;
    },
  },
};

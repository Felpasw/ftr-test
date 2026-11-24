import { GraphQLError } from "graphql";
import type { Context } from "../../context.js";
import { requireAuth } from "./user.js";

type CreateArgs = { input: { name: string; color?: string | null } };
type UpdateArgs = { id: string; input: { name?: string; color?: string | null } };

const findOwned = async (ctx: Context, userId: string, id: string) => {
  const category = await ctx.prisma.category.findFirst({ where: { id, userId } });
  if (!category) {
    throw new GraphQLError("Categoria não encontrada", {
      extensions: { code: "NOT_FOUND" },
    });
  }
  return category;
};

export const categoryResolvers = {
  Query: {
    categories: (_: unknown, __: unknown, ctx: Context) => {
      const userId = requireAuth(ctx.userId);
      return ctx.prisma.category.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
      });
    },
    category: (_: unknown, { id }: { id: string }, ctx: Context) => {
      const userId = requireAuth(ctx.userId);
      return findOwned(ctx, userId, id);
    },
    categoriesOverview: async (_: unknown, __: unknown, ctx: Context) => {
      const userId = requireAuth(ctx.userId);
      const [totalCategories, totalTransactions, topGroup] = await Promise.all([
        ctx.prisma.category.count({ where: { userId } }),
        ctx.prisma.transaction.count({ where: { userId } }),
        ctx.prisma.transaction.groupBy({
          by: ["categoryId"],
          where: { userId, categoryId: { not: null } },
          _count: { _all: true },
          orderBy: { _count: { categoryId: "desc" } },
          take: 1,
        }),
      ]);

      const topRow = topGroup[0];
      const mostUsed =
        topRow?.categoryId
          ? await ctx.prisma.category.findFirst({
              where: { id: topRow.categoryId, userId },
            })
          : null;

      return { totalCategories, totalTransactions, mostUsed };
    },
    categoryStats: async (_: unknown, __: unknown, ctx: Context) => {
      const userId = requireAuth(ctx.userId);
      const [categories, aggregates] = await Promise.all([
        ctx.prisma.category.findMany({
          where: { userId },
          orderBy: { createdAt: "asc" },
        }),
        ctx.prisma.transaction.groupBy({
          by: ["categoryId"],
          where: { userId, categoryId: { not: null } },
          _count: { _all: true },
          _sum: { amount: true },
        }),
      ]);

      const statsByCategory = new Map<
        string,
        { count: number; sum: number }
      >();
      for (const row of aggregates) {
        if (!row.categoryId) continue;
        statsByCategory.set(row.categoryId, {
          count: row._count._all,
          sum: row._sum.amount ?? 0,
        });
      }

      return categories.map((category) => {
        const stat = statsByCategory.get(category.id);
        return {
          category,
          transactionCount: stat?.count ?? 0,
          totalAmount: stat?.sum ?? 0,
        };
      });
    },
  },
  Mutation: {
    createCategory: (_: unknown, { input }: CreateArgs, ctx: Context) => {
      const userId = requireAuth(ctx.userId);
      return ctx.prisma.category.create({ data: { ...input, userId } });
    },
    updateCategory: async (_: unknown, { id, input }: UpdateArgs, ctx: Context) => {
      const userId = requireAuth(ctx.userId);
      await findOwned(ctx, userId, id);
      return ctx.prisma.category.update({ where: { id }, data: input });
    },
    deleteCategory: async (_: unknown, { id }: { id: string }, ctx: Context) => {
      const userId = requireAuth(ctx.userId);
      await findOwned(ctx, userId, id);
      await ctx.prisma.category.delete({ where: { id } });
      return true;
    },
  },
};

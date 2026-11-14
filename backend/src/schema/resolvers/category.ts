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

import { GraphQLError } from "graphql";
import { AUTH_COOKIE, authCookieOptions, type Context } from "../../context.js";
import { hashPassword, verifyPassword } from "../../lib/password.js";
import { signToken } from "../../lib/jwt.js";

export const requireAuth = (userId: string | null): string => {
  if (!userId) {
    throw new GraphQLError("Não autenticado", {
      extensions: { code: "UNAUTHENTICATED" },
    });
  }
  return userId;
};

type SignUpArgs = { input: { name: string; email: string; password: string } };
type SignInArgs = { input: { email: string; password: string } };

const issueAuthCookie = (ctx: Context, userId: string) => {
  ctx.res.cookie(AUTH_COOKIE, signToken({ userId }), authCookieOptions());
};

export const userResolvers = {
  Query: {
    me: (_: unknown, __: unknown, ctx: Context) => {
      if (!ctx.userId) return null;
      return ctx.prisma.user.findUnique({ where: { id: ctx.userId } });
    },
  },
  Mutation: {
    signUp: async (_: unknown, { input }: SignUpArgs, ctx: Context) => {
      const email = input.email.toLowerCase();
      const existing = await ctx.prisma.user.findUnique({ where: { email } });
      if (existing) {
        throw new GraphQLError("E-mail já cadastrado", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }
      const user = await ctx.prisma.user.create({
        data: {
          name: input.name,
          email,
          password: await hashPassword(input.password),
        },
      });
      issueAuthCookie(ctx, user.id);
      return { user };
    },
    signIn: async (_: unknown, { input }: SignInArgs, ctx: Context) => {
      const email = input.email.toLowerCase();
      const user = await ctx.prisma.user.findUnique({ where: { email } });
      const valid = user && (await verifyPassword(input.password, user.password));
      if (!valid) {
        throw new GraphQLError("Credenciais inválidas", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }
      issueAuthCookie(ctx, user.id);
      return { user };
    },
    signOut: (_: unknown, __: unknown, ctx: Context) => {
      ctx.res.clearCookie(AUTH_COOKIE, { path: "/" });
      return true;
    },
  },
};

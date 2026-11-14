import type { CookieOptions, Request, Response } from "express";
import { prisma } from "./lib/prisma.js";
import { verifyToken } from "./lib/jwt.js";

export const AUTH_COOKIE = "finance_token";

const COOKIE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

/*
 * `httpOnly` fecha a porta pra JS ler o token (XSS não consegue levar);
 * `sameSite: lax` já basta em dev porque front e back compartilham o site
 * `localhost`. Em produção com domínios separados, vira `none` + `secure`
 * (e aí o backend precisa estar em HTTPS).
 */
export const authCookieOptions = (): CookieOptions => ({
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  maxAge: COOKIE_MAX_AGE_MS,
  path: "/",
});

export type Context = {
  prisma: typeof prisma;
  userId: string | null;
  res: Response;
};

const extractUserId = (req: Request): string | null => {
  const cookieToken = (req.cookies as Record<string, string> | undefined)?.[
    AUTH_COOKIE
  ];
  if (!cookieToken) return null;
  try {
    return verifyToken(cookieToken).userId;
  } catch {
    return null;
  }
};

export const createContext = async ({
  req,
  res,
}: {
  req: Request;
  res: Response;
}): Promise<Context> => ({
  prisma,
  userId: extractUserId(req),
  res,
});

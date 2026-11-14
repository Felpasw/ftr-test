import jwt from "jsonwebtoken";

type Payload = { userId: string };

const getSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET não configurado");
  return secret;
};

export const signToken = (payload: Payload) =>
  jwt.sign(payload, getSecret(), { expiresIn: "7d" });

export const verifyToken = (token: string): Payload =>
  jwt.verify(token, getSecret()) as Payload;

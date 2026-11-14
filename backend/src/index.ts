import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./schema/typeDefs.js";
import { resolvers } from "./schema/resolvers/index.js";
import { createContext, type Context } from "./context.js";

const bootstrap = async () => {
  const app = express();

  const apollo = new ApolloServer<Context>({ typeDefs, resolvers });
  await apollo.start();

  /*
   * CORS com `credentials: true` + origem explícita é obrigatório pro
   * navegador anexar o cookie httpOnly nas requests do frontend. Com
   * wildcard `*` o browser bloqueia o envio de credenciais.
   */
  const frontendUrl = process.env.FRONTEND_URL ?? "http://localhost:5173";

  app.use(
    "/graphql",
    cors<cors.CorsRequest>({ origin: frontendUrl, credentials: true }),
    express.json(),
    cookieParser(),
    expressMiddleware(apollo, {
      context: ({ req, res }) => createContext({ req, res }),
    }),
  );

  const port = Number(process.env.PORT ?? 4000);
  app.listen(port, () => {
    console.log(`GraphQL em http://localhost:${port}/graphql`);
  });
};

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});

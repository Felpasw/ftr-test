import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

/*
 * `credentials: "include"` manda cookies (inclusive o `finance_token`
 * httpOnly que o backend grava no signin/signup) em cada request. Sem isso o
 * browser omite credenciais em chamadas cross-origin e toda query fica
 * anônima.
 */
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_BACKEND_URL,
  credentials: "include",
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

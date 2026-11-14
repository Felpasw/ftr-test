import { apolloClient } from "./apolloClient";
import {
  SIGN_IN_MUTATION,
  SIGN_OUT_MUTATION,
  SIGN_UP_MUTATION,
} from "./graphql/mutations";
import { ME_QUERY } from "./graphql/queries";
import type {
  AuthPayload,
  IAuthService,
  SigninCredentials,
  SignupCredentials,
} from "./interfaces/auth.interface";

/*
 * Signin/signup/signout refazem `ME_QUERY` pra que a tela reaja à mudança de
 * sessão: o cookie `httpOnly` vive fora do JS, então o único jeito de saber
 * se o usuário logou/deslogou é perguntar ao backend outra vez.
 */
const REFETCH = [{ query: ME_QUERY }];

class AuthService implements IAuthService {
  async signin(input: SigninCredentials): Promise<AuthPayload> {
    const { data } = await apolloClient.mutate<{ signIn: AuthPayload }>({
      mutation: SIGN_IN_MUTATION,
      variables: { input },
      refetchQueries: REFETCH,
      awaitRefetchQueries: true,
    });
    if (!data) throw new Error("Resposta vazia do servidor");
    return data.signIn;
  }

  async signup(input: SignupCredentials): Promise<AuthPayload> {
    const { data } = await apolloClient.mutate<{ signUp: AuthPayload }>({
      mutation: SIGN_UP_MUTATION,
      variables: { input },
      refetchQueries: REFETCH,
      awaitRefetchQueries: true,
    });
    if (!data) throw new Error("Resposta vazia do servidor");
    return data.signUp;
  }

  async signout(): Promise<void> {
    await apolloClient.mutate({
      mutation: SIGN_OUT_MUTATION,
      refetchQueries: REFETCH,
      awaitRefetchQueries: true,
    });
    await apolloClient.clearStore();
  }
}

export const authService = new AuthService();

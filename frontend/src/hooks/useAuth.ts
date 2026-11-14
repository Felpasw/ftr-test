/* eslint-disable react-hooks/rules-of-hooks --
 * Plain TS class não é componente React; `authHooks.use()` roda no render em
 * ordem fixa (nenhum `if`/loop envolta), então Rules of Hooks (runtime)
 * continua íntegra.
 */
import { useMutation, useQuery } from "@apollo/client";
import { useCallback } from "react";

import { ME_QUERY } from "../services/graphql/queries";
import {
  SIGN_IN_MUTATION,
  SIGN_OUT_MUTATION,
  SIGN_UP_MUTATION,
} from "../services/graphql/mutations";
import { apolloClient } from "../services/apolloClient";
import type {
  AuthPayload,
  SigninCredentials,
  SignupCredentials,
  User,
} from "../services/interfaces/auth.interface";

import type {
  AuthHooksResult,
  IAuthHooks,
} from "./interfaces/useAuth.interface";

/*
 * O cookie `httpOnly` fica invisível pro JS, então o único indicador de
 * sessão é a resposta de `me`: user preenchido → logado, null → anônimo.
 * Mutations de signin/signup/signout invalidam `me` via `refetchQueries` no
 * service, e o Apollo propaga o novo valor pra todo consumer deste hook.
 */
const REFETCH_ME = [{ query: ME_QUERY }];

class AuthHooks implements IAuthHooks {
  use(): AuthHooksResult {
    const { data, loading } = useQuery<{ me: User | null }>(ME_QUERY);

    const [signinMutation, signinState] = useMutation<{
      signIn: AuthPayload;
    }>(SIGN_IN_MUTATION, {
      refetchQueries: REFETCH_ME,
      awaitRefetchQueries: true,
    });

    const [signupMutation, signupState] = useMutation<{
      signUp: AuthPayload;
    }>(SIGN_UP_MUTATION, {
      refetchQueries: REFETCH_ME,
      awaitRefetchQueries: true,
    });

    const [signoutMutation, signoutState] = useMutation(SIGN_OUT_MUTATION, {
      refetchQueries: REFETCH_ME,
      awaitRefetchQueries: true,
    });

    const signin = useCallback(
      async (input: SigninCredentials) => {
        const result = await signinMutation({ variables: { input } });
        if (!result.data) throw new Error("Resposta vazia do servidor");
        return result.data.signIn.user;
      },
      [signinMutation],
    );

    const signup = useCallback(
      async (input: SignupCredentials) => {
        const result = await signupMutation({ variables: { input } });
        if (!result.data) throw new Error("Resposta vazia do servidor");
        return result.data.signUp.user;
      },
      [signupMutation],
    );

    const signout = useCallback(async () => {
      await signoutMutation();
      await apolloClient.clearStore();
    }, [signoutMutation]);

    const user = data?.me ?? null;
    /*
     * `loading` fica true também em refetch (ex: logo após signin, enquanto
     * `me` revalida). Durante esse intervalo `data` continua populado, então
     * só reporta loading quando é o boot inicial — evita flashear o shell.
     */
    const isBooting = loading && data === undefined;

    return {
      user,
      isLoading: isBooting,
      isAuthenticated: Boolean(user),
      signin,
      signinLoading: signinState.loading,
      signup,
      signupLoading: signupState.loading,
      signout,
      signoutLoading: signoutState.loading,
    };
  }
}

export const authHooks = new AuthHooks();

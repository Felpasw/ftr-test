import type {
  SigninCredentials,
  SignupCredentials,
  User,
} from "../../services/interfaces/auth.interface";

export type AuthHooksResult = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signin: (input: SigninCredentials) => Promise<User>;
  signinLoading: boolean;
  signup: (input: SignupCredentials) => Promise<User>;
  signupLoading: boolean;
  signout: () => Promise<void>;
  signoutLoading: boolean;
};

export interface IAuthHooks {
  use(): AuthHooksResult;
}

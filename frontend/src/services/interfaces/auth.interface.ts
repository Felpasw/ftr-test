export type User = {
  id: string;
  name: string;
  email: string;
};

export type AuthPayload = {
  user: User;
};

export type SigninCredentials = {
  email: string;
  password: string;
};

export type SignupCredentials = {
  name: string;
  email: string;
  password: string;
};

export interface IAuthService {
  signin(input: SigninCredentials): Promise<AuthPayload>;
  signup(input: SignupCredentials): Promise<AuthPayload>;
  signout(): Promise<void>;
}

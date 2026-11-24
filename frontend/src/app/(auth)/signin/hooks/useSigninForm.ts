import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { authHooks } from "../../../../hooks/useAuth";

export const SIGNIN_MESSAGES = {
  title: "Fazer login",
  subtitle: "Entre na sua conta para continuar",
  emailLabel: "E-mail",
  emailPlaceholder: "mail@exemplo.com",
  emailRequired: "Informe seu e-mail",
  emailInvalid: "E-mail inválido",
  passwordLabel: "Senha",
  passwordPlaceholder: "Digite sua senha",
  passwordMin: "Mínimo de 6 caracteres",
  passwordShow: "Mostrar senha",
  passwordHide: "Ocultar senha",
  rememberMe: "Lembrar-me",
  forgotPassword: "Recuperar senha",
  submit: "Entrar",
  submitLoading: "Entrando...",
  errorGeneric: "Não foi possível entrar. Confira suas credenciais.",
  dividerOr: "ou",
  noAccountPrompt: "Ainda não tem uma conta?",
  noAccountCta: "Criar conta",
} as const;

const signinSchema = z.object({
  email: z
    .string()
    .min(1, SIGNIN_MESSAGES.emailRequired)
    .email(SIGNIN_MESSAGES.emailInvalid),
  password: z.string().min(6, SIGNIN_MESSAGES.passwordMin),
  rememberMe: z.boolean().default(false),
});

export type SigninFormValues = z.infer<typeof signinSchema>;

export function useSigninForm() {
  const auth = authHooks.use();

  const form = useForm<SigninFormValues>({
    defaultValues: { email: "", password: "", rememberMe: false },
    resolver: zodResolver(signinSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await auth.signin({ email: values.email, password: values.password });
    } catch (error) {
      form.setError("root", {
        message:
          error instanceof Error ? error.message : SIGNIN_MESSAGES.errorGeneric,
      });
    }
  });

  return {
    control: form.control,
    register: form.register,
    onSubmit,
    rootError: form.formState.errors.root?.message,
    isPending: auth.signinLoading,
  };
}

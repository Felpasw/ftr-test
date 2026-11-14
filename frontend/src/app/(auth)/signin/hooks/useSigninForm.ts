import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { authHooks } from "../../../../hooks/useAuth";

export const SIGNIN_MESSAGES = {
  title: "Bem-vindo de volta",
  subtitle: "Acesse sua conta para gerenciar suas finanças",
  emailLabel: "E-mail",
  emailPlaceholder: "voce@exemplo.com",
  emailRequired: "Informe seu e-mail",
  emailInvalid: "E-mail inválido",
  passwordLabel: "Senha",
  passwordPlaceholder: "Mínimo 6 caracteres",
  passwordMin: "Mínimo de 6 caracteres",
  submit: "Entrar",
  submitLoading: "Entrando...",
  errorGeneric: "Não foi possível entrar. Confira suas credenciais.",
  noAccountPrompt: "Não tem conta?",
  noAccountCta: "Cadastre-se",
} as const;

const signinSchema = z.object({
  email: z
    .string()
    .min(1, SIGNIN_MESSAGES.emailRequired)
    .email(SIGNIN_MESSAGES.emailInvalid),
  password: z.string().min(6, SIGNIN_MESSAGES.passwordMin),
});

export type SigninFormValues = z.infer<typeof signinSchema>;

export function useSigninForm() {
  const auth = authHooks.use();

  const form = useForm<SigninFormValues>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(signinSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await auth.signin(values);
    } catch (error) {
      form.setError("root", {
        message: error instanceof Error ? error.message : SIGNIN_MESSAGES.errorGeneric,
      });
    }
  });

  return {
    control: form.control,
    onSubmit,
    rootError: form.formState.errors.root?.message,
    isPending: auth.signinLoading,
  };
}

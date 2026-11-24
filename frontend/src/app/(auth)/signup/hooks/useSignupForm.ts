import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { authHooks } from "../../../../hooks/useAuth";

export const SIGNUP_MESSAGES = {
  title: "Criar conta",
  subtitle: "Comece a controlar suas finanças ainda hoje",
  nameLabel: "Nome completo",
  namePlaceholder: "Seu nome completo",
  nameRequired: "Informe seu nome",
  emailLabel: "E-mail",
  emailPlaceholder: "mail@exemplo.com",
  emailRequired: "Informe seu e-mail",
  emailInvalid: "E-mail inválido",
  passwordLabel: "Senha",
  passwordPlaceholder: "Digite sua senha",
  passwordHint: "A senha deve ter no mínimo 8 caracteres",
  passwordMin: "A senha deve ter no mínimo 8 caracteres",
  passwordShow: "Mostrar senha",
  passwordHide: "Ocultar senha",
  submit: "Cadastrar",
  submitLoading: "Cadastrando...",
  errorGeneric: "Não foi possível criar sua conta. Tente novamente.",
  dividerOr: "ou",
  hasAccountPrompt: "Já tem uma conta?",
  hasAccountCta: "Fazer login",
} as const;

const signupSchema = z.object({
  name: z.string().min(2, SIGNUP_MESSAGES.nameRequired),
  email: z
    .string()
    .min(1, SIGNUP_MESSAGES.emailRequired)
    .email(SIGNUP_MESSAGES.emailInvalid),
  password: z.string().min(8, SIGNUP_MESSAGES.passwordMin),
});

export type SignupFormValues = z.infer<typeof signupSchema>;

export function useSignupForm() {
  const auth = authHooks.use();

  const form = useForm<SignupFormValues>({
    defaultValues: { name: "", email: "", password: "" },
    resolver: zodResolver(signupSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await auth.signup(values);
    } catch (error) {
      form.setError("root", {
        message:
          error instanceof Error ? error.message : SIGNUP_MESSAGES.errorGeneric,
      });
    }
  });

  return {
    control: form.control,
    onSubmit,
    rootError: form.formState.errors.root?.message,
    isPending: auth.signupLoading,
  };
}

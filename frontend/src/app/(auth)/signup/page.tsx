import { Link } from "react-router-dom";

import { Button, ControlledInput } from "../../../components";

import { SIGNUP_MESSAGES, useSignupForm } from "./hooks";

export function SignupPage() {
  const { control, onSubmit, rootError, isPending } = useSignupForm();
  const submitLabel = isPending ? SIGNUP_MESSAGES.submitLoading : SIGNUP_MESSAGES.submit;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm space-y-4 rounded-xl bg-white p-8 shadow-lg"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {SIGNUP_MESSAGES.title}
          </h1>
          <p className="text-sm text-slate-500">{SIGNUP_MESSAGES.subtitle}</p>
        </div>

        <ControlledInput
          control={control}
          name="name"
          autoComplete="name"
          label={SIGNUP_MESSAGES.nameLabel}
          placeholder={SIGNUP_MESSAGES.namePlaceholder}
        />

        <ControlledInput
          control={control}
          name="email"
          type="email"
          autoComplete="email"
          label={SIGNUP_MESSAGES.emailLabel}
          placeholder={SIGNUP_MESSAGES.emailPlaceholder}
        />

        <ControlledInput
          control={control}
          name="password"
          type="password"
          autoComplete="new-password"
          label={SIGNUP_MESSAGES.passwordLabel}
          placeholder={SIGNUP_MESSAGES.passwordPlaceholder}
        />

        {rootError ? (
          <p className="text-sm text-red-600">{rootError}</p>
        ) : null}

        <Button type="submit" fullWidth loading={isPending}>
          {submitLabel}
        </Button>

        <p className="text-center text-sm text-slate-500">
          {SIGNUP_MESSAGES.hasAccountPrompt}{" "}
          <Link to="/" className="font-medium text-slate-900 underline">
            {SIGNUP_MESSAGES.hasAccountCta}
          </Link>
        </p>
      </form>
    </div>
  );
}

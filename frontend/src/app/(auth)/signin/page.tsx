import { Link } from "react-router-dom";

import { Button, ControlledInput } from "../../../components";

import { SIGNIN_MESSAGES, useSigninForm } from "./hooks";

export function SigninPage() {
  const { control, onSubmit, rootError, isPending } = useSigninForm();
  const submitLabel = isPending ? SIGNIN_MESSAGES.submitLoading : SIGNIN_MESSAGES.submit;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm space-y-4 rounded-xl bg-white p-8 shadow-lg"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {SIGNIN_MESSAGES.title}
          </h1>
          <p className="text-sm text-slate-500">{SIGNIN_MESSAGES.subtitle}</p>
        </div>

        <ControlledInput
          control={control}
          name="email"
          type="email"
          autoComplete="email"
          label={SIGNIN_MESSAGES.emailLabel}
          placeholder={SIGNIN_MESSAGES.emailPlaceholder}
        />

        <ControlledInput
          control={control}
          name="password"
          type="password"
          autoComplete="current-password"
          label={SIGNIN_MESSAGES.passwordLabel}
          placeholder={SIGNIN_MESSAGES.passwordPlaceholder}
        />

        {rootError ? (
          <p className="text-sm text-red-600">{rootError}</p>
        ) : null}

        <Button type="submit" fullWidth loading={isPending}>
          {submitLabel}
        </Button>

        <p className="text-center text-sm text-slate-500">
          {SIGNIN_MESSAGES.noAccountPrompt}{" "}
          <Link to="/signup" className="font-medium text-slate-900 underline">
            {SIGNIN_MESSAGES.noAccountCta}
          </Link>
        </p>
      </form>
    </div>
  );
}

import { Link } from "react-router-dom";

import { ControlledInput, ControlledPasswordInput } from "../../../components";

import { SIGNUP_MESSAGES, useSignupForm } from "./hooks";

const LOGO_SRC = "/icons/logo.svg";
const USER_ROUND_ICON_SRC = "/icons/user-round.svg";
const MAIL_ICON_SRC = "/icons/mail.svg";
const LOCK_ICON_SRC = "/icons/lock.svg";
const LOGIN_ICON_SRC = "/icons/log-in.svg";

function LeadingIcon({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} className="size-4" />;
}

export function SignupPage() {
  const { control, onSubmit, rootError, isPending } = useSignupForm();
  const submitLabel = isPending
    ? SIGNUP_MESSAGES.submitLoading
    : SIGNUP_MESSAGES.submit;

  return (
    <div className="flex min-h-screen flex-col items-center gap-8 bg-[#f8f9fa] p-12">
      <img src={LOGO_SRC} alt="Financy" className="h-8 w-auto" />

      <form
        onSubmit={onSubmit}
        className="flex w-[448px] max-w-full flex-col gap-8 rounded-xl border border-[#e5e7eb] bg-white p-[33px]"
      >
        <header className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-xl font-bold leading-7 text-[#111827]">
            {SIGNUP_MESSAGES.title}
          </h1>
          <p className="text-base leading-6 text-[#4b5563]">
            {SIGNUP_MESSAGES.subtitle}
          </p>
        </header>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <ControlledInput
              control={control}
              name="name"
              autoComplete="name"
              label={SIGNUP_MESSAGES.nameLabel}
              placeholder={SIGNUP_MESSAGES.namePlaceholder}
              leading={<LeadingIcon src={USER_ROUND_ICON_SRC} alt="" />}
            />

            <ControlledInput
              control={control}
              name="email"
              type="email"
              autoComplete="email"
              label={SIGNUP_MESSAGES.emailLabel}
              placeholder={SIGNUP_MESSAGES.emailPlaceholder}
              leading={<LeadingIcon src={MAIL_ICON_SRC} alt="" />}
            />

            <ControlledPasswordInput
              control={control}
              name="password"
              autoComplete="new-password"
              label={SIGNUP_MESSAGES.passwordLabel}
              placeholder={SIGNUP_MESSAGES.passwordPlaceholder}
              hint={SIGNUP_MESSAGES.passwordHint}
              showLabel={SIGNUP_MESSAGES.passwordShow}
              hideLabel={SIGNUP_MESSAGES.passwordHide}
              leading={<LeadingIcon src={LOCK_ICON_SRC} alt="" />}
            />
          </div>

          {rootError ? (
            <p className="text-sm text-red-600">{rootError}</p>
          ) : null}

          <button
            type="submit"
            disabled={isPending}
            className="flex h-12 items-center justify-center rounded-lg bg-[#1f6f43] px-4 py-3 text-base font-medium leading-6 text-white transition hover:bg-[#1a5d39] disabled:opacity-60"
          >
            {submitLabel}
          </button>

          <div className="flex items-center gap-3">
            <span className="h-px flex-1 border-t border-[#d1d5db]" />
            <span className="text-sm leading-5 text-[#6b7280]">
              {SIGNUP_MESSAGES.dividerOr}
            </span>
            <span className="h-px flex-1 border-t border-[#d1d5db]" />
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-center text-sm leading-5 text-[#4b5563]">
              {SIGNUP_MESSAGES.hasAccountPrompt}
            </p>
            <Link
              to="/"
              className="flex h-12 items-center justify-center gap-2 rounded-lg border border-[#d1d5db] bg-white px-4 py-3 text-base font-medium leading-6 text-[#374151] transition hover:bg-slate-50"
            >
              <img src={LOGIN_ICON_SRC} alt="" className="size-[18px]" />
              {SIGNUP_MESSAGES.hasAccountCta}
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

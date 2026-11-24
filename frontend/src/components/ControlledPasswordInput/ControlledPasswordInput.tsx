import { useState, type ReactNode } from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

import { ControlledInput } from "../ControlledInput";

type ControlledPasswordInputProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder?: string;
  autoComplete?: "current-password" | "new-password";
  leading?: ReactNode;
  hint?: string;
  showLabel: string;
  hideLabel: string;
};

const EYE_ICON_SRC = "/icons/eye-closed.svg";

export function ControlledPasswordInput<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  autoComplete = "current-password",
  leading,
  hint,
  showLabel,
  hideLabel,
}: ControlledPasswordInputProps<TFieldValues>) {
  const [visible, setVisible] = useState(false);
  const toggleLabel = visible ? hideLabel : showLabel;

  return (
    <ControlledInput
      control={control}
      name={name}
      label={label}
      placeholder={placeholder}
      autoComplete={autoComplete}
      type={visible ? "text" : "password"}
      leading={leading}
      hint={hint}
      trailing={
        <button
          type="button"
          onClick={() => setVisible((prev) => !prev)}
          aria-label={toggleLabel}
          className="flex size-4 items-center justify-center text-[#374151]"
        >
          <img src={EYE_ICON_SRC} alt="" className="size-4" />
        </button>
      }
    />
  );
}

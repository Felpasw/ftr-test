import type {
  HTMLInputAutoCompleteAttribute,
  HTMLInputTypeAttribute,
  ReactNode,
} from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

type ControlledInputProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  step?: string;
  /** Ícone opcional renderizado à esquerda do input, dentro do wrapper. */
  leading?: ReactNode;
  /** Slot opcional à direita — útil pro botão de mostrar/ocultar senha. */
  trailing?: ReactNode;
  /** Texto auxiliar exibido abaixo do input quando não há erro. */
  hint?: string;
};

export function ControlledInput<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  autoComplete,
  step,
  leading,
  trailing,
  hint,
}: ControlledInputProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="space-y-2">
          <label
            htmlFor={field.name}
            className="block text-sm font-medium leading-5 text-[#374151]"
          >
            {label}
          </label>
          <div className="flex items-center gap-3 rounded-lg border border-[#d1d5db] bg-white px-[13px] py-[15px] focus-within:border-[#1f6f43] focus-within:ring-1 focus-within:ring-[#1f6f43]">
            {leading ? (
              <span className="flex size-4 shrink-0 items-center justify-center text-[#374151]">
                {leading}
              </span>
            ) : null}
            <input
              {...field}
              id={field.name}
              type={type}
              placeholder={placeholder}
              autoComplete={autoComplete}
              step={step}
              value={field.value ?? ""}
              className="min-w-0 flex-1 bg-transparent text-base text-[#111827] placeholder:text-[#9ca3af] focus:outline-none"
            />
            {trailing ? <span className="shrink-0">{trailing}</span> : null}
          </div>
          {fieldState.error ? (
            <p className="text-xs text-red-600">{fieldState.error.message}</p>
          ) : null}
          {!fieldState.error && hint ? (
            <p className="text-xs leading-4 text-[#6b7280]">{hint}</p>
          ) : null}
        </div>
      )}
    />
  );
}

import type { HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute } from "react";
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
};

/**
 * Bridge entre `react-hook-form` e `<input>` nativo. A UI deste projeto não
 * tem design system externo — a cola fica aqui, generic no shape do form pra
 * que o `name` seja tipado contra o schema.
 */
export function ControlledInput<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  autoComplete,
  step,
}: ControlledInputProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="space-y-1">
          <label
            htmlFor={field.name}
            className="block text-sm font-medium text-slate-700"
          >
            {label}
          </label>
          <input
            {...field}
            id={field.name}
            type={type}
            placeholder={placeholder}
            autoComplete={autoComplete}
            step={step}
            value={field.value ?? ""}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          />
          {fieldState.error ? (
            <p className="text-xs text-red-600">{fieldState.error.message}</p>
          ) : null}
        </div>
      )}
    />
  );
}

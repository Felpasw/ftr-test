import type { ReactNode } from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

type ControlledSelectProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  children: ReactNode;
};

export function ControlledSelect<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  children,
}: ControlledSelectProps<TFieldValues>) {
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
          <select
            {...field}
            id={field.name}
            value={field.value ?? ""}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          >
            {children}
          </select>
          {fieldState.error ? (
            <p className="text-xs text-red-600">{fieldState.error.message}</p>
          ) : null}
        </div>
      )}
    />
  );
}

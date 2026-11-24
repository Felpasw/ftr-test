import type { ReactNode } from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

const CHEVRON_DOWN = "/icons/chevron-down.svg";

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
        <div className="space-y-2">
          <label
            htmlFor={field.name}
            className="block text-sm font-medium leading-5 text-[#374151]"
          >
            {label}
          </label>
          <div className="flex items-center gap-3 rounded-lg border border-[#d1d5db] bg-white px-[13px] py-[15px] focus-within:border-[#1f6f43] focus-within:ring-1 focus-within:ring-[#1f6f43]">
            <select
              {...field}
              id={field.name}
              value={field.value ?? ""}
              className="min-w-0 flex-1 appearance-none bg-transparent text-base text-[#111827] focus:outline-none"
            >
              {children}
            </select>
            <img src={CHEVRON_DOWN} alt="" className="size-4 shrink-0" />
          </div>
          {fieldState.error ? (
            <p className="text-xs text-red-600">{fieldState.error.message}</p>
          ) : null}
        </div>
      )}
    />
  );
}

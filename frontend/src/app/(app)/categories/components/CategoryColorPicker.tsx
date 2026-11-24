import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

import {
  CATEGORY_COLOR_OPTIONS,
  type CategoryColor,
} from "../../../../utils/categoryVisuals";

const BUTTON_CLASS =
  "flex flex-1 items-center justify-center overflow-clip rounded-lg border p-[5px] transition " +
  "data-[selected=true]:border-[#1f6f43] data-[selected=true]:bg-[#f8f9fa] " +
  "data-[selected=false]:border-[#d1d5db] data-[selected=false]:bg-transparent";

type CategoryColorPickerProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
};

export function CategoryColorPicker<T extends FieldValues>({
  control,
  name,
  label,
}: CategoryColorPickerProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const current = field.value as CategoryColor | undefined;
        return (
          <div className="space-y-2">
            <span className="block text-sm font-medium leading-5 text-[#374151]">
              {label}
            </span>
            <div className="flex gap-2">
              {CATEGORY_COLOR_OPTIONS.map((color) => (
                <button
                  key={color}
                  type="button"
                  data-selected={current === color}
                  onClick={() => field.onChange(color)}
                  aria-label={color}
                  className={BUTTON_CLASS}
                >
                  <span
                    className="h-5 min-w-px flex-1 rounded"
                    style={{ backgroundColor: color }}
                  />
                </button>
              ))}
            </div>
          </div>
        );
      }}
    />
  );
}

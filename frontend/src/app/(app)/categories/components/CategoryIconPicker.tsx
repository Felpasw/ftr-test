import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

import {
  CATEGORY_ICON_LIBRARY,
  getIconSrc,
  type CategoryIconKey,
} from "../../../../utils/categoryVisuals";

const BUTTON_CLASS =
  "flex size-[42px] items-center justify-center overflow-clip rounded-lg border transition " +
  "data-[selected=true]:border-[#1f6f43] data-[selected=true]:bg-[#f8f9fa] " +
  "data-[selected=false]:border-[#d1d5db] data-[selected=false]:bg-transparent hover:data-[selected=false]:bg-[#f9fafb]";

type CategoryIconPickerProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
};

export function CategoryIconPicker<T extends FieldValues>({
  control,
  name,
  label,
}: CategoryIconPickerProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const current = field.value as CategoryIconKey | undefined;
        return (
          <div className="space-y-2">
            <span className="block text-sm font-medium leading-5 text-[#374151]">
              {label}
            </span>
            <div className="flex flex-wrap gap-2">
              {CATEGORY_ICON_LIBRARY.map((iconKey) => (
                <button
                  key={iconKey}
                  type="button"
                  data-selected={current === iconKey}
                  onClick={() => field.onChange(iconKey)}
                  aria-label={iconKey}
                  className={BUTTON_CLASS}
                >
                  <img
                    src={getIconSrc(iconKey)}
                    alt=""
                    className="size-5"
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

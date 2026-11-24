import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

const EXPENSE_ICON = "/icons/circle-arrow-down-sm.svg";
const INCOME_ACTIVE_ICON = "/icons/circle-arrow-up-sm.svg";
const INCOME_MUTED_ICON = "/icons/circle-arrow-up-muted.svg";

type ToggleState = "expense" | "income" | "inactive";

const BUTTON_CLASS =
  "flex flex-1 items-center justify-center gap-3 rounded-lg border border-transparent px-3 py-[14px] text-base leading-[18px] transition " +
  "data-[state=inactive]:font-normal data-[state=inactive]:text-[#4b5563] " +
  "data-[state=expense]:border-[#dc2626] data-[state=expense]:bg-[#f8f9fa] data-[state=expense]:font-medium data-[state=expense]:text-[#111827] " +
  "data-[state=income]:border-[#1f6f43] data-[state=income]:bg-[#f8f9fa] data-[state=income]:font-medium data-[state=income]:text-[#111827]";

type TransactionTypeToggleProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  expenseLabel: string;
  incomeLabel: string;
};

export function TransactionTypeToggle<T extends FieldValues>({
  control,
  name,
  expenseLabel,
  incomeLabel,
}: TransactionTypeToggleProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const current = field.value as "EXPENSE" | "INCOME" | undefined;
        const expenseState: ToggleState =
          current === "EXPENSE" ? "expense" : "inactive";
        const incomeState: ToggleState =
          current === "INCOME" ? "income" : "inactive";
        const incomeIcon =
          current === "INCOME" ? INCOME_ACTIVE_ICON : INCOME_MUTED_ICON;

        return (
          <div className="flex gap-0 rounded-xl border border-[#e5e7eb] p-2">
            <button
              type="button"
              data-state={expenseState}
              onClick={() => field.onChange("EXPENSE")}
              className={BUTTON_CLASS}
            >
              <img src={EXPENSE_ICON} alt="" className="size-4" />
              {expenseLabel}
            </button>
            <button
              type="button"
              data-state={incomeState}
              onClick={() => field.onChange("INCOME")}
              className={BUTTON_CLASS}
            >
              <img src={incomeIcon} alt="" className="size-4" />
              {incomeLabel}
            </button>
          </div>
        );
      }}
    />
  );
}

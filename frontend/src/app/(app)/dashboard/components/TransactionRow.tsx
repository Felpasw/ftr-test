import type { Transaction } from "../../../../services/interfaces/transaction.interface";
import { formatCurrency, formatDate } from "../../../../utils/format";
import { resolveCategoryVisual } from "../../../../utils/categoryVisuals";

const INCOME_ARROW = "/icons/circle-arrow-up-sm.svg";
const EXPENSE_ARROW = "/icons/circle-arrow-down-sm.svg";

const INCOME_TAG_LABEL = "Receita";

type TransactionRowProps = {
  transaction: Transaction;
};

export function TransactionRow({ transaction }: TransactionRowProps) {
  const visual = resolveCategoryVisual(transaction.category, transaction.type);
  const isIncome = transaction.type === "INCOME";
  const arrowSrc = isIncome ? INCOME_ARROW : EXPENSE_ARROW;
  const amountPrefix = isIncome ? "+ " : "- ";

  const tagLabel = transaction.category?.name ?? INCOME_TAG_LABEL;
  const tagVisual = transaction.category
    ? visual
    : resolveCategoryVisual(null, transaction.type);

  return (
    <div className="flex items-center border-b border-[#e5e7eb] last:border-b-0">
      <div className="flex min-w-0 flex-1 items-center gap-4 px-6 py-5">
        <div
          className="flex size-10 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: visual.bgColor }}
        >
          <img src={visual.iconSrc} alt="" className="size-4" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <p className="truncate text-base font-medium leading-6 text-[#111827]">
            {transaction.title}
          </p>
          <p className="text-sm leading-5 text-[#4b5563]">
            {formatDate(transaction.date)}
          </p>
        </div>
      </div>

      <div className="flex w-[160px] shrink-0 items-center justify-center px-6">
        <span
          className="rounded-full px-3 py-1 text-sm font-medium leading-5"
          style={{
            backgroundColor: tagVisual.bgColor,
            color: tagVisual.textColor,
          }}
        >
          {tagLabel}
        </span>
      </div>

      <div className="flex w-[160px] shrink-0 items-center justify-end gap-2 px-6">
        <span className="whitespace-nowrap text-sm font-semibold leading-5 text-[#111827]">
          {amountPrefix}
          {formatCurrency(transaction.amount)}
        </span>
        <img src={arrowSrc} alt="" className="size-4" />
      </div>
    </div>
  );
}

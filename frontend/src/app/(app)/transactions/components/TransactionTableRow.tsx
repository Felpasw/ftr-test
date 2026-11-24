import type { Transaction } from "../../../../services/interfaces/transaction.interface";
import { formatCurrency, formatDate } from "../../../../utils/format";
import { resolveCategoryVisual } from "../../../../utils/categoryVisuals";

const INCOME_ARROW = "/icons/circle-arrow-up-sm.svg";
const EXPENSE_ARROW = "/icons/circle-arrow-down-sm.svg";
const TRASH_ICON = "/icons/trash.svg";
const EDIT_ICON = "/icons/square-pen.svg";

type TransactionTableRowProps = {
  transaction: Transaction;
  typeIncomeLabel: string;
  typeExpenseLabel: string;
  editAriaLabel: string;
  deleteAriaLabel: string;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
};

export function TransactionTableRow({
  transaction,
  typeIncomeLabel,
  typeExpenseLabel,
  editAriaLabel,
  deleteAriaLabel,
  onEdit,
  onDelete,
}: TransactionTableRowProps) {
  const visual = resolveCategoryVisual(transaction.category, transaction.type);
  const isIncome = transaction.type === "INCOME";
  const arrowSrc = isIncome ? INCOME_ARROW : EXPENSE_ARROW;
  const typeLabel = isIncome ? typeIncomeLabel : typeExpenseLabel;
  const typeColor = isIncome ? "#15803d" : "#b91c1c";
  const amountPrefix = isIncome ? "+ " : "- ";

  return (
    <div className="flex w-full items-center border-b border-[#e5e7eb] last:border-b-0">
      <div className="flex min-w-0 flex-1 items-center gap-4 px-6 py-4">
        <div
          className="flex size-10 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: visual.bgColor }}
        >
          <img src={visual.iconSrc} alt="" className="size-4" />
        </div>
        <span className="truncate text-base font-medium leading-6 text-[#111827]">
          {transaction.title}
        </span>
      </div>

      <div className="flex w-[112px] shrink-0 items-center justify-center px-6">
        <span className="whitespace-nowrap text-sm leading-5 text-[#4b5563]">
          {formatDate(transaction.date)}
        </span>
      </div>

      <div className="flex w-[200px] shrink-0 items-center justify-center px-6">
        {transaction.category ? (
          <span
            className="rounded-full px-3 py-1 text-sm font-medium leading-5"
            style={{
              backgroundColor: visual.bgColor,
              color: visual.textColor,
            }}
          >
            {transaction.category.name}
          </span>
        ) : (
          <span className="text-sm leading-5 text-[#9ca3af]">—</span>
        )}
      </div>

      <div className="flex w-[136px] shrink-0 items-center justify-center gap-2 px-6">
        <img src={arrowSrc} alt="" className="size-4" />
        <span
          className="whitespace-nowrap text-sm font-medium leading-5"
          style={{ color: typeColor }}
        >
          {typeLabel}
        </span>
      </div>

      <div className="flex w-[200px] shrink-0 items-center justify-end px-6">
        <span className="whitespace-nowrap text-sm font-semibold leading-5 text-[#111827]">
          {amountPrefix}
          {formatCurrency(transaction.amount)}
        </span>
      </div>

      <div className="flex w-[120px] shrink-0 items-center justify-end gap-2 px-6">
        <button
          type="button"
          onClick={() => onDelete(transaction.id)}
          aria-label={deleteAriaLabel}
          className="flex size-8 items-center justify-center rounded-lg border border-[#d1d5db] bg-white p-2 hover:bg-[#f9fafb]"
        >
          <img src={TRASH_ICON} alt="" className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => onEdit(transaction)}
          aria-label={editAriaLabel}
          className="flex size-8 items-center justify-center rounded-lg border border-[#d1d5db] bg-white p-2 hover:bg-[#f9fafb]"
        >
          <img src={EDIT_ICON} alt="" className="size-4" />
        </button>
      </div>
    </div>
  );
}

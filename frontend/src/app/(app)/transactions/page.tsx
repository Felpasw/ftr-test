import type { ChangeEvent } from "react";

import { Button, Layout } from "../../../components";

import { TransactionDialog, TransactionTableRow } from "./components";
import {
  TRANSACTIONS_MESSAGES,
  useTransactionsPage,
  type TypeFilter,
} from "./hooks";

const SEARCH_ICON = "/icons/search.svg";
const CHEVRON_DOWN_ICON = "/icons/chevron-down.svg";
const CHEVRON_LEFT_ICON = "/icons/chevron-left.svg";
const CHEVRON_RIGHT_ICON = "/icons/chevron-right-nav.svg";
const PLUS_ICON = "/icons/plus.svg";

const SELECT_WRAPPER_CLASS =
  "flex items-center gap-3 rounded-lg border border-[#d1d5db] bg-white px-[13px] py-[15px]";
const SELECT_INPUT_CLASS =
  "min-w-0 flex-1 appearance-none bg-transparent text-base text-[#111827] focus:outline-none";
const FIELD_LABEL_CLASS =
  "block text-sm font-medium leading-5 text-[#374151]";

type FieldShellProps = {
  label: string;
  children: React.ReactNode;
};

function FieldShell({ label, children }: FieldShellProps) {
  return (
    <div className="flex-1 space-y-2">
      <span className={FIELD_LABEL_CLASS}>{label}</span>
      {children}
    </div>
  );
}

export function TransactionsPage() {
  const {
    transactions,
    totalCount,
    categories,
    isLoading,
    dialog,
    openCreate,
    openEdit,
    closeDialog,
    remove,
    search,
    setSearch,
    typeFilter,
    setTypeFilter,
    categoryFilter,
    setCategoryFilter,
    categoryAll,
  } = useTransactionsPage();

  const editingTransaction =
    dialog?.mode === "edit" ? dialog.transaction : null;

  const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setTypeFilter(event.target.value as TypeFilter);
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(event.target.value);
  };

  const emptyMessage =
    search || typeFilter !== "ALL" || categoryFilter !== categoryAll
      ? TRANSACTIONS_MESSAGES.emptyFiltered
      : TRANSACTIONS_MESSAGES.empty;

  return (
    <Layout>
      <div className="flex flex-col gap-8">
        <header className="flex items-start justify-between">
          <div className="flex flex-col gap-0.5">
            <h1 className="text-2xl font-bold leading-8 text-[#111827]">
              {TRANSACTIONS_MESSAGES.title}
            </h1>
            <p className="text-base leading-6 text-[#4b5563]">
              {TRANSACTIONS_MESSAGES.subtitle}
            </p>
          </div>
          <Button onClick={openCreate}>
            <img src={PLUS_ICON} alt="" className="size-4" />
            {TRANSACTIONS_MESSAGES.newCta}
          </Button>
        </header>

        <section className="flex items-start gap-4 rounded-xl border border-[#e5e7eb] bg-white px-[25px] pb-[25px] pt-[21px]">
          <FieldShell label={TRANSACTIONS_MESSAGES.searchLabel}>
            <div className={SELECT_WRAPPER_CLASS}>
              <img
                src={SEARCH_ICON}
                alt=""
                className="size-4 shrink-0"
              />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={TRANSACTIONS_MESSAGES.searchPlaceholder}
                className="min-w-0 flex-1 bg-transparent text-base text-[#111827] placeholder:text-[#9ca3af] focus:outline-none"
              />
            </div>
          </FieldShell>

          <FieldShell label={TRANSACTIONS_MESSAGES.typeLabel}>
            <div className={SELECT_WRAPPER_CLASS}>
              <select
                value={typeFilter}
                onChange={handleTypeChange}
                className={SELECT_INPUT_CLASS}
              >
                <option value="ALL">{TRANSACTIONS_MESSAGES.typeAll}</option>
                <option value="INCOME">{TRANSACTIONS_MESSAGES.typeIncome}</option>
                <option value="EXPENSE">{TRANSACTIONS_MESSAGES.typeExpense}</option>
              </select>
              <img
                src={CHEVRON_DOWN_ICON}
                alt=""
                className="size-4 shrink-0"
              />
            </div>
          </FieldShell>

          <FieldShell label={TRANSACTIONS_MESSAGES.categoryLabel}>
            <div className={SELECT_WRAPPER_CLASS}>
              <select
                value={categoryFilter}
                onChange={handleCategoryChange}
                className={SELECT_INPUT_CLASS}
              >
                <option value={categoryAll}>
                  {TRANSACTIONS_MESSAGES.categoryAll}
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <img
                src={CHEVRON_DOWN_ICON}
                alt=""
                className="size-4 shrink-0"
              />
            </div>
          </FieldShell>

          <FieldShell label={TRANSACTIONS_MESSAGES.periodLabel}>
            <div className={SELECT_WRAPPER_CLASS}>
              <span className="min-w-0 flex-1 truncate text-base text-[#111827]">
                {TRANSACTIONS_MESSAGES.periodValue}
              </span>
              <img
                src={CHEVRON_DOWN_ICON}
                alt=""
                className="size-4 shrink-0 opacity-40"
              />
            </div>
          </FieldShell>
        </section>

        <section className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white">
          <div className="flex items-center border-b border-[#e5e7eb]">
            <ColumnHead className="flex-1" align="start">
              {TRANSACTIONS_MESSAGES.columnDescription}
            </ColumnHead>
            <ColumnHead className="w-[112px]" align="center">
              {TRANSACTIONS_MESSAGES.columnDate}
            </ColumnHead>
            <ColumnHead className="w-[200px]" align="center">
              {TRANSACTIONS_MESSAGES.columnCategory}
            </ColumnHead>
            <ColumnHead className="w-[136px]" align="center">
              {TRANSACTIONS_MESSAGES.columnType}
            </ColumnHead>
            <ColumnHead className="w-[200px]" align="end">
              {TRANSACTIONS_MESSAGES.columnAmount}
            </ColumnHead>
            <ColumnHead className="w-[120px]" align="end">
              {TRANSACTIONS_MESSAGES.columnActions}
            </ColumnHead>
          </div>

          <div className="flex flex-col">
            {isLoading && transactions.length === 0 ? (
              <div className="px-6 py-10 text-center text-sm text-[#4b5563]">
                {TRANSACTIONS_MESSAGES.loading}
              </div>
            ) : null}

            {!isLoading && transactions.length === 0 ? (
              <div className="px-6 py-10 text-center text-sm text-[#4b5563]">
                {emptyMessage}
              </div>
            ) : null}

            {transactions.map((transaction) => (
              <TransactionTableRow
                key={transaction.id}
                transaction={transaction}
                typeIncomeLabel={TRANSACTIONS_MESSAGES.typeIncome}
                typeExpenseLabel={TRANSACTIONS_MESSAGES.typeExpense}
                editAriaLabel={TRANSACTIONS_MESSAGES.editCta}
                deleteAriaLabel={TRANSACTIONS_MESSAGES.deleteCta}
                onEdit={openEdit}
                onDelete={remove}
              />
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-[#e5e7eb] px-6 py-5">
            <span className="text-sm leading-5 text-[#374151]">
              {TRANSACTIONS_MESSAGES.footerCount(
                transactions.length,
                totalCount,
              )}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled
                className="flex size-8 items-center justify-center rounded-lg border border-[#d1d5db] bg-white opacity-50"
              >
                <img src={CHEVRON_LEFT_ICON} alt="" className="size-4" />
              </button>
              <div className="flex size-8 items-center justify-center rounded-lg bg-[#1f6f43] text-sm font-medium leading-5 text-white">
                1
              </div>
              <button
                type="button"
                disabled
                className="flex size-8 items-center justify-center rounded-lg border border-[#d1d5db] bg-white opacity-50"
              >
                <img src={CHEVRON_RIGHT_ICON} alt="" className="size-4" />
              </button>
            </div>
          </div>
        </section>
      </div>

      <TransactionDialog
        open={dialog !== null}
        editing={editingTransaction}
        categories={categories}
        onClose={closeDialog}
        onSuccess={closeDialog}
      />
    </Layout>
  );
}

type ColumnHeadProps = {
  className: string;
  align: "start" | "center" | "end";
  children: React.ReactNode;
};

const COLUMN_HEAD_CLASS =
  "flex items-center px-6 py-5 " +
  "data-[align=start]:justify-start data-[align=center]:justify-center data-[align=end]:justify-end";

function ColumnHead({ className, align, children }: ColumnHeadProps) {
  return (
    <div data-align={align} className={COLUMN_HEAD_CLASS + " " + className}>
      <span className="text-xs font-medium uppercase leading-4 tracking-[0.6px] text-[#6b7280]">
        {children}
      </span>
    </div>
  );
}

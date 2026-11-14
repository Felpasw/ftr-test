import { Button, Layout } from "../../../components";
import { formatCurrency, formatDate } from "../../../utils/format";
import type { TransactionType } from "../../../services/interfaces/transaction.interface";

import { TransactionDialog } from "./components";
import { TRANSACTIONS_MESSAGES, useTransactionsPage } from "./hooks";

const TYPE_LABEL: Record<TransactionType, string> = {
  INCOME: TRANSACTIONS_MESSAGES.typeIncome,
  EXPENSE: TRANSACTIONS_MESSAGES.typeExpense,
};

const TYPE_BADGE: Record<TransactionType, string> = {
  INCOME: "bg-emerald-100 text-emerald-700",
  EXPENSE: "bg-red-100 text-red-700",
};

export function TransactionsPage() {
  const {
    transactions,
    categories,
    isLoading,
    dialog,
    openCreate,
    openEdit,
    closeDialog,
    remove,
  } = useTransactionsPage();

  const editingTransaction =
    dialog?.mode === "edit" ? dialog.transaction : null;

  return (
    <Layout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {TRANSACTIONS_MESSAGES.title}
          </h1>
          <p className="text-sm text-slate-500">
            {TRANSACTIONS_MESSAGES.subtitle}
          </p>
        </div>
        <Button onClick={openCreate}>{TRANSACTIONS_MESSAGES.newCta}</Button>
      </div>

      <section className="mt-8">
        {isLoading ? (
          <p className="text-slate-500">{TRANSACTIONS_MESSAGES.loading}</p>
        ) : null}

        {!isLoading && transactions.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <p className="text-slate-600">{TRANSACTIONS_MESSAGES.empty}</p>
            <p className="text-sm text-slate-400">
              {TRANSACTIONS_MESSAGES.emptyHint}
            </p>
          </div>
        ) : null}

        {!isLoading && transactions.length > 0 ? (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-medium">
                    {TRANSACTIONS_MESSAGES.columnTitle}
                  </th>
                  <th className="px-4 py-3 font-medium">
                    {TRANSACTIONS_MESSAGES.columnCategory}
                  </th>
                  <th className="px-4 py-3 font-medium">
                    {TRANSACTIONS_MESSAGES.columnDate}
                  </th>
                  <th className="px-4 py-3 font-medium">
                    {TRANSACTIONS_MESSAGES.columnType}
                  </th>
                  <th className="px-4 py-3 text-right font-medium">
                    {TRANSACTIONS_MESSAGES.columnAmount}
                  </th>
                  <th className="px-4 py-3 font-medium" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {transaction.title}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {transaction.category?.name ??
                        TRANSACTIONS_MESSAGES.noCategory}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {formatDate(transaction.date)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${TYPE_BADGE[transaction.type]}`}
                      >
                        {TYPE_LABEL[transaction.type]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-slate-900">
                      {formatCurrency(transaction.amount)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          onClick={() => openEdit(transaction)}
                        >
                          {TRANSACTIONS_MESSAGES.editCta}
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => remove(transaction.id)}
                        >
                          {TRANSACTIONS_MESSAGES.deleteCta}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </section>

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

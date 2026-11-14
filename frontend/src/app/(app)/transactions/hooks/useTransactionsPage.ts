import { useState } from "react";

import { categoriesHooks } from "../../../../hooks/useCategories";
import { transactionsHooks } from "../../../../hooks/useTransactions";
import { transactionService } from "../../../../services/transaction.service";
import type { Transaction } from "../../../../services/interfaces/transaction.interface";

export const TRANSACTIONS_MESSAGES = {
  title: "Transações",
  subtitle: "Registre e acompanhe todas as suas movimentações financeiras.",
  newCta: "Nova transação",
  loading: "Carregando...",
  empty: "Nenhuma transação registrada ainda.",
  emptyHint: 'Clique em "Nova transação" para registrar a primeira.',
  editCta: "Editar",
  deleteCta: "Excluir",
  deleteConfirm: "Remover transação?",
  columnTitle: "Título",
  columnCategory: "Categoria",
  columnDate: "Data",
  columnType: "Tipo",
  columnAmount: "Valor",
  typeIncome: "Receita",
  typeExpense: "Despesa",
  noCategory: "—",
  dialogCreateTitle: "Nova transação",
  dialogEditTitle: "Editar transação",
  dialogTitleLabel: "Título",
  dialogAmountLabel: "Valor",
  dialogDateLabel: "Data",
  dialogTypeLabel: "Tipo",
  dialogCategoryLabel: "Categoria",
  dialogCategoryNone: "Sem categoria",
  dialogCancel: "Cancelar",
  dialogSave: "Salvar",
  dialogSaving: "Salvando...",
} as const;

export type TransactionsDialogState =
  | { mode: "create" }
  | { mode: "edit"; transaction: Transaction }
  | null;

export function useTransactionsPage() {
  const { transactions, isLoading } = transactionsHooks.use();
  const { categories } = categoriesHooks.use();
  const [dialog, setDialog] = useState<TransactionsDialogState>(null);

  const openCreate = () => setDialog({ mode: "create" });
  const openEdit = (transaction: Transaction) =>
    setDialog({ mode: "edit", transaction });
  const closeDialog = () => setDialog(null);

  const remove = async (id: string) => {
    const confirmed = window.confirm(TRANSACTIONS_MESSAGES.deleteConfirm);
    if (!confirmed) return;
    await transactionService.delete(id);
  };

  return {
    transactions,
    categories,
    isLoading,
    dialog,
    openCreate,
    openEdit,
    closeDialog,
    remove,
  };
}

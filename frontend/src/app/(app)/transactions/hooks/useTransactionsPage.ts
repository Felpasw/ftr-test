import { useMemo, useState } from "react";

import { categoriesHooks } from "../../../../hooks/useCategories";
import { transactionsHooks } from "../../../../hooks/useTransactions";
import { transactionService } from "../../../../services/transaction.service";
import type {
  Transaction,
  TransactionType,
} from "../../../../services/interfaces/transaction.interface";

export const TRANSACTIONS_MESSAGES = {
  title: "Transações",
  subtitle: "Gerencie todas as suas transações financeiras",
  newCta: "Nova transação",
  loading: "Carregando...",
  empty: "Nenhuma transação registrada ainda.",
  emptyHint: 'Clique em "Nova transação" para registrar a primeira.',
  emptyFiltered: "Nenhuma transação bate com esses filtros.",

  searchLabel: "Buscar",
  searchPlaceholder: "Buscar por descrição",

  typeLabel: "Tipo",
  typeAll: "Todos",
  typeIncome: "Entrada",
  typeExpense: "Saída",

  categoryLabel: "Categoria",
  categoryAll: "Todas",

  periodLabel: "Período",
  periodValue: "Novembro / 2025",

  columnDescription: "Descrição",
  columnDate: "Data",
  columnCategory: "Categoria",
  columnType: "Tipo",
  columnAmount: "Valor",
  columnActions: "Ações",

  noCategory: "Sem categoria",

  editCta: "Editar",
  deleteCta: "Excluir",
  deleteConfirm: "Remover transação?",

  dialogCreateTitle: "Nova transação",
  dialogEditTitle: "Editar transação",
  dialogSubtitle: "Registre sua despesa ou receita",
  dialogDescriptionLabel: "Descrição",
  dialogDescriptionPlaceholder: "Ex. Almoço no restaurante",
  dialogAmountLabel: "Valor",
  dialogAmountPlaceholder: "0,00",
  dialogDateLabel: "Data",
  dialogCategoryLabel: "Categoria",
  dialogCategoryPlaceholder: "Selecione",
  dialogCategoryNone: "Sem categoria",
  dialogSave: "Salvar",
  dialogSaving: "Salvando...",
  dialogClose: "Fechar",

  dialogTypeIncome: "Receita",
  dialogTypeExpense: "Despesa",

  footerCount: (shown: number, total: number) =>
    `${shown} de ${total} resultado${total === 1 ? "" : "s"}`,
} as const;

export type TransactionsDialogState =
  | { mode: "create" }
  | { mode: "edit"; transaction: Transaction }
  | null;

export type TypeFilter = "ALL" | TransactionType;

const CATEGORY_ALL = "ALL" as const;

export function useTransactionsPage() {
  const { transactions, isLoading } = transactionsHooks.use();
  const { categories } = categoriesHooks.use();

  const [dialog, setDialog] = useState<TransactionsDialogState>(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("ALL");
  const [categoryFilter, setCategoryFilter] = useState<string>(CATEGORY_ALL);

  const filtered = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return transactions.filter((transaction) => {
      if (typeFilter !== "ALL" && transaction.type !== typeFilter) return false;
      if (
        categoryFilter !== CATEGORY_ALL &&
        transaction.category?.id !== categoryFilter
      ) {
        return false;
      }
      if (
        normalizedSearch &&
        !transaction.title.toLowerCase().includes(normalizedSearch)
      ) {
        return false;
      }
      return true;
    });
  }, [transactions, typeFilter, categoryFilter, search]);

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
    transactions: filtered,
    totalCount: transactions.length,
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
    categoryAll: CATEGORY_ALL,
  };
}

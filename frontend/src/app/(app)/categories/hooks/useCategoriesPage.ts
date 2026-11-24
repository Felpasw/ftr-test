import { useQuery } from "@apollo/client";
import { useMemo, useState } from "react";

import {
  CATEGORIES_OVERVIEW_QUERY,
  CATEGORY_STATS_QUERY,
} from "../../../../services/graphql/queries";
import { categoryService } from "../../../../services/category.service";
import type {
  CategoriesOverview,
  Category,
  CategoryStat,
} from "../../../../services/interfaces/category.interface";

export type EditableCategory = Pick<
  Category,
  "id" | "name" | "description" | "icon" | "color"
>;

export const CATEGORIES_MESSAGES = {
  title: "Categorias",
  subtitle: "Organize suas transações por categorias",
  newCta: "Nova categoria",

  summaryTotalLabel: "Total de categorias",
  summaryTransactionsLabel: "Total de transações",
  summaryMostUsedLabel: "Categoria mais utilizada",
  summaryMostUsedEmpty: "—",

  loading: "Carregando...",
  empty: "Nenhuma categoria cadastrada ainda.",
  emptyHint: 'Clique em "Nova categoria" para começar.',

  editCta: "Editar categoria",
  deleteCta: "Excluir categoria",
  deleteConfirm: "Remover categoria?",

  itemsSuffix: "itens",
  itemSuffix: "item",

  dialogCreateTitle: "Nova categoria",
  dialogEditTitle: "Editar categoria",
  dialogSubtitle: "Organize suas transações com categorias",
  dialogTitleLabel: "Título",
  dialogTitlePlaceholder: "Ex. Alimentação",
  dialogDescriptionLabel: "Descrição",
  dialogDescriptionPlaceholder: "Descrição da categoria",
  dialogDescriptionHint: "Opcional",
  dialogIconLabel: "Ícone",
  dialogColorLabel: "Cor",
  dialogSave: "Salvar",
  dialogSaving: "Salvando...",
  dialogClose: "Fechar",
} as const;

export type CategoriesDialogState =
  | { mode: "create" }
  | { mode: "edit"; category: EditableCategory }
  | null;

const EMPTY_OVERVIEW: CategoriesOverview = {
  totalCategories: 0,
  totalTransactions: 0,
  mostUsed: null,
};

export function useCategoriesPage() {
  const statsQuery = useQuery<{ categoryStats: CategoryStat[] }>(
    CATEGORY_STATS_QUERY,
  );
  const overviewQuery = useQuery<{ categoriesOverview: CategoriesOverview }>(
    CATEGORIES_OVERVIEW_QUERY,
  );

  const [dialog, setDialog] = useState<CategoriesDialogState>(null);

  const stats = useMemo(
    () => statsQuery.data?.categoryStats ?? [],
    [statsQuery.data],
  );
  const overview = overviewQuery.data?.categoriesOverview ?? EMPTY_OVERVIEW;

  const openCreate = () => setDialog({ mode: "create" });
  const openEdit = (category: EditableCategory) =>
    setDialog({ mode: "edit", category });
  const closeDialog = () => setDialog(null);

  const remove = async (id: string) => {
    const confirmed = window.confirm(CATEGORIES_MESSAGES.deleteConfirm);
    if (!confirmed) return;
    await categoryService.delete(id);
  };

  return {
    stats,
    overview,
    isLoading: statsQuery.loading || overviewQuery.loading,
    dialog,
    openCreate,
    openEdit,
    closeDialog,
    remove,
  };
}

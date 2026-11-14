import { useState } from "react";

import { categoriesHooks } from "../../../../hooks/useCategories";
import { categoryService } from "../../../../services/category.service";
import type { Category } from "../../../../services/interfaces/category.interface";

export const CATEGORIES_MESSAGES = {
  title: "Categorias",
  subtitle: "Organize suas transações agrupando-as por categoria.",
  newCta: "Nova categoria",
  loading: "Carregando...",
  empty: "Nenhuma categoria cadastrada ainda.",
  emptyHint: 'Clique em "Nova categoria" para começar.',
  editCta: "Editar",
  deleteCta: "Excluir",
  deleteConfirm: "Remover categoria?",
  dialogCreateTitle: "Nova categoria",
  dialogEditTitle: "Editar categoria",
  dialogNameLabel: "Nome",
  dialogColorLabel: "Cor",
  dialogCancel: "Cancelar",
  dialogSave: "Salvar",
  dialogSaving: "Salvando...",
} as const;

export type CategoriesDialogState =
  | { mode: "create" }
  | { mode: "edit"; category: Category }
  | null;

export function useCategoriesPage() {
  const { categories, isLoading } = categoriesHooks.use();
  const [dialog, setDialog] = useState<CategoriesDialogState>(null);

  const openCreate = () => setDialog({ mode: "create" });
  const openEdit = (category: Category) => setDialog({ mode: "edit", category });
  const closeDialog = () => setDialog(null);

  const remove = async (id: string) => {
    const confirmed = window.confirm(CATEGORIES_MESSAGES.deleteConfirm);
    if (!confirmed) return;
    await categoryService.delete(id);
  };

  return {
    categories,
    isLoading,
    dialog,
    openCreate,
    openEdit,
    closeDialog,
    remove,
  };
}

import { Button, Layout } from "../../../components";

import { CategoryDialog } from "./components";
import { CATEGORIES_MESSAGES, useCategoriesPage } from "./hooks";

export function CategoriesPage() {
  const {
    categories,
    isLoading,
    dialog,
    openCreate,
    openEdit,
    closeDialog,
    remove,
  } = useCategoriesPage();

  const editingCategory = dialog?.mode === "edit" ? dialog.category : null;

  return (
    <Layout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {CATEGORIES_MESSAGES.title}
          </h1>
          <p className="text-sm text-slate-500">
            {CATEGORIES_MESSAGES.subtitle}
          </p>
        </div>
        <Button onClick={openCreate}>{CATEGORIES_MESSAGES.newCta}</Button>
      </div>

      <section className="mt-8">
        {isLoading ? (
          <p className="text-slate-500">{CATEGORIES_MESSAGES.loading}</p>
        ) : null}

        {!isLoading && categories.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <p className="text-slate-600">{CATEGORIES_MESSAGES.empty}</p>
            <p className="text-sm text-slate-400">
              {CATEGORIES_MESSAGES.emptyHint}
            </p>
          </div>
        ) : null}

        {!isLoading && categories.length > 0 ? (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <li
                key={category.id}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: category.color ?? "#94a3b8" }}
                  />
                  <span className="font-medium text-slate-900">
                    {category.name}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={() => openEdit(category)}>
                    {CATEGORIES_MESSAGES.editCta}
                  </Button>
                  <Button variant="danger" onClick={() => remove(category.id)}>
                    {CATEGORIES_MESSAGES.deleteCta}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      <CategoryDialog
        open={dialog !== null}
        editing={editingCategory}
        onClose={closeDialog}
        onSuccess={closeDialog}
      />
    </Layout>
  );
}

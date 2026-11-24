import { Button, Layout } from "../../../components";
import { resolveCategoryVisual } from "../../../utils/categoryVisuals";

import { CategoryCard, CategoryDialog } from "./components";
import { CATEGORIES_MESSAGES, useCategoriesPage } from "./hooks";

const PLUS_ICON = "/icons/plus.svg";
const TAG_ICON = "/icons/tag.svg";
const ARROW_UPDOWN_ICON = "/icons/arrow-up-down.svg";

type OverviewCardProps = {
  label: string;
  value: string;
  iconSrc: string;
};

function OverviewCard({ label, value, iconSrc }: OverviewCardProps) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-[#e5e7eb] bg-white p-[25px]">
      <div className="flex size-8 shrink-0 items-center justify-center">
        <img src={iconSrc} alt="" className="size-6" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-2">
        <p className="text-[28px] font-bold leading-8 text-[#111827]">
          {value}
        </p>
        <p className="text-xs font-medium uppercase leading-4 tracking-[0.6px] text-[#6b7280]">
          {label}
        </p>
      </div>
    </div>
  );
}

export function CategoriesPage() {
  const {
    stats,
    overview,
    isLoading,
    dialog,
    openCreate,
    openEdit,
    closeDialog,
    remove,
  } = useCategoriesPage();

  const editingCategory = dialog?.mode === "edit" ? dialog.category : null;

  const mostUsedName =
    overview.mostUsed?.name ?? CATEGORIES_MESSAGES.summaryMostUsedEmpty;
  const mostUsedIcon = overview.mostUsed
    ? resolveCategoryVisual(overview.mostUsed).iconSrc
    : TAG_ICON;

  return (
    <Layout>
      <div className="flex flex-col gap-8">
        <header className="flex items-start justify-between">
          <div className="flex flex-col gap-0.5">
            <h1 className="text-2xl font-bold leading-8 text-[#111827]">
              {CATEGORIES_MESSAGES.title}
            </h1>
            <p className="text-base leading-6 text-[#4b5563]">
              {CATEGORIES_MESSAGES.subtitle}
            </p>
          </div>
          <Button onClick={openCreate}>
            <img src={PLUS_ICON} alt="" className="size-4" />
            {CATEGORIES_MESSAGES.newCta}
          </Button>
        </header>

        <section className="grid grid-cols-3 gap-6">
          <OverviewCard
            iconSrc={TAG_ICON}
            value={String(overview.totalCategories)}
            label={CATEGORIES_MESSAGES.summaryTotalLabel}
          />
          <OverviewCard
            iconSrc={ARROW_UPDOWN_ICON}
            value={String(overview.totalTransactions)}
            label={CATEGORIES_MESSAGES.summaryTransactionsLabel}
          />
          <OverviewCard
            iconSrc={mostUsedIcon}
            value={mostUsedName}
            label={CATEGORIES_MESSAGES.summaryMostUsedLabel}
          />
        </section>

        <section>
          {isLoading && stats.length === 0 ? (
            <p className="text-sm text-[#4b5563]">
              {CATEGORIES_MESSAGES.loading}
            </p>
          ) : null}

          {!isLoading && stats.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#d1d5db] bg-white p-10 text-center">
              <p className="text-base text-[#4b5563]">
                {CATEGORIES_MESSAGES.empty}
              </p>
              <p className="text-sm text-[#9ca3af]">
                {CATEGORIES_MESSAGES.emptyHint}
              </p>
            </div>
          ) : null}

          {!isLoading && stats.length > 0 ? (
            <div className="grid grid-cols-4 gap-4">
              {stats.map((stat) => (
                <CategoryCard
                  key={stat.category.id}
                  stat={stat}
                  itemLabel={CATEGORIES_MESSAGES.itemSuffix}
                  itemsLabel={CATEGORIES_MESSAGES.itemsSuffix}
                  editAriaLabel={CATEGORIES_MESSAGES.editCta}
                  deleteAriaLabel={CATEGORIES_MESSAGES.deleteCta}
                  onEdit={() => openEdit(stat.category)}
                  onDelete={() => remove(stat.category.id)}
                />
              ))}
            </div>
          ) : null}
        </section>
      </div>

      <CategoryDialog
        open={dialog !== null}
        editing={editingCategory}
        onClose={closeDialog}
        onSuccess={closeDialog}
      />
    </Layout>
  );
}

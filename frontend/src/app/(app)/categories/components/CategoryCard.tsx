import type { CategoryStat } from "../../../../services/interfaces/category.interface";
import { resolveCategoryVisual } from "../../../../utils/categoryVisuals";

const TRASH_ICON = "/icons/trash.svg";
const EDIT_ICON = "/icons/square-pen.svg";

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  alimentacao: "Restaurantes, delivery e refeições",
  transporte: "Gasolina, transporte público e viagens",
  mercado: "Compras de supermercado e mantimentos",
  entretenimento: "Cinema, jogos e lazer",
  utilidades: "Energia, água, internet e telefone",
  investimento: "Aplicações e retornos financeiros",
  salario: "Renda mensal e bonificações",
  saude: "Medicamentos, consultas e exames",
};

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

/*
 * Prefere a descrição salva pelo usuário; cai no dicionário por nome
 * normalizado quando a categoria foi criada sem descrição (DB legada).
 */
const resolveDescription = (
  stored: string | null | undefined,
  categoryName: string,
): string => {
  if (stored?.trim()) return stored;
  const key = normalize(categoryName);
  return CATEGORY_DESCRIPTIONS[key] ?? "Transações nessa categoria";
};

type CategoryCardProps = {
  stat: CategoryStat;
  itemLabel: string;
  itemsLabel: string;
  editAriaLabel: string;
  deleteAriaLabel: string;
  onEdit: () => void;
  onDelete: () => void;
};

export function CategoryCard({
  stat,
  itemLabel,
  itemsLabel,
  editAriaLabel,
  deleteAriaLabel,
  onEdit,
  onDelete,
}: CategoryCardProps) {
  const visual = resolveCategoryVisual(stat.category);
  const countSuffix = stat.transactionCount === 1 ? itemLabel : itemsLabel;
  const description = resolveDescription(
    stat.category.description,
    stat.category.name,
  );

  return (
    <article className="flex flex-col gap-5 rounded-xl border border-[#e5e7eb] bg-white p-[25px]">
      <header className="flex items-start justify-between">
        <div
          className="flex size-10 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: visual.bgColor }}
        >
          <img src={visual.iconSrc} alt="" className="size-4" />
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onDelete}
            aria-label={deleteAriaLabel}
            className="flex size-8 items-center justify-center rounded-lg border border-[#d1d5db] bg-white p-2 hover:bg-[#f9fafb]"
          >
            <img src={TRASH_ICON} alt="" className="size-4" />
          </button>
          <button
            type="button"
            onClick={onEdit}
            aria-label={editAriaLabel}
            className="flex size-8 items-center justify-center rounded-lg border border-[#d1d5db] bg-white p-2 hover:bg-[#f9fafb]"
          >
            <img src={EDIT_ICON} alt="" className="size-4" />
          </button>
        </div>
      </header>

      <div className="flex flex-col gap-1">
        <h3 className="text-base font-semibold leading-6 text-[#111827]">
          {stat.category.name}
        </h3>
        <p className="line-clamp-2 h-10 text-sm leading-5 text-[#4b5563]">
          {description}
        </p>
      </div>

      <footer className="flex items-center justify-between">
        <span
          className="rounded-full px-3 py-1 text-sm font-medium leading-5"
          style={{
            backgroundColor: visual.bgColor,
            color: visual.textColor,
          }}
        >
          {stat.category.name}
        </span>
        <span className="text-sm leading-5 text-[#4b5563]">
          {stat.transactionCount} {countSuffix}
        </span>
      </footer>
    </article>
  );
}

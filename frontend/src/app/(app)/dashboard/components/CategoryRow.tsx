import type { CategoryStat } from "../../../../services/interfaces/category.interface";
import { formatCurrency } from "../../../../utils/format";
import { resolveCategoryVisual } from "../../../../utils/categoryVisuals";

type CategoryRowProps = {
  stat: CategoryStat;
  itemLabel: string;
  itemsLabel: string;
};

export function CategoryRow({ stat, itemLabel, itemsLabel }: CategoryRowProps) {
  const visual = resolveCategoryVisual(stat.category);
  const countSuffix = stat.transactionCount === 1 ? itemLabel : itemsLabel;

  return (
    <div className="flex items-center gap-1">
      <span
        className="rounded-full px-3 py-1 text-sm font-medium leading-5"
        style={{
          backgroundColor: visual.bgColor,
          color: visual.textColor,
        }}
      >
        {stat.category.name}
      </span>
      <span className="flex-1 text-right text-sm leading-5 text-[#4b5563]">
        {stat.transactionCount} {countSuffix}
      </span>
      <span className="w-[88px] text-right text-sm font-semibold leading-5 text-[#111827]">
        {formatCurrency(stat.totalAmount)}
      </span>
    </div>
  );
}

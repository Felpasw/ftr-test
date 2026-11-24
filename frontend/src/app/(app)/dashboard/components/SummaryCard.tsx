import { formatCurrency } from "../../../../utils/format";

type SummaryCardProps = {
  iconSrc: string;
  label: string;
  value: number;
};

export function SummaryCard({ iconSrc, label, value }: SummaryCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-[#e5e7eb] bg-white p-[25px]">
      <div className="flex items-center gap-3">
        <img src={iconSrc} alt="" className="size-5" />
        <span className="text-xs font-medium uppercase leading-4 tracking-[0.6px] text-[#6b7280]">
          {label}
        </span>
      </div>
      <p className="text-[28px] font-bold leading-8 text-[#111827]">
        {formatCurrency(value)}
      </p>
    </div>
  );
}

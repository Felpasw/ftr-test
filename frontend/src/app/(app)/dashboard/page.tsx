import { Link } from "react-router-dom";

import { Layout } from "../../../components";

import {
  CategoryRow,
  SummaryCard,
  TransactionRow,
} from "./components";
import { DASHBOARD_MESSAGES, useDashboard } from "./hooks";

const WALLET_ICON = "/icons/wallet.svg";
const CIRCLE_UP_ICON = "/icons/circle-arrow-up.svg";
const CIRCLE_DOWN_ICON = "/icons/circle-arrow-down.svg";
const CHEVRON_RIGHT_ICON = "/icons/chevron-right.svg";
const PLUS_ICON = "/icons/plus.svg";

function SectionHeader({
  title,
  linkLabel,
  linkTo,
}: {
  title: string;
  linkLabel: string;
  linkTo: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-[#e5e7eb] px-6 py-5">
      <span className="text-xs font-medium uppercase leading-4 tracking-[0.6px] text-[#6b7280]">
        {title}
      </span>
      <Link
        to={linkTo}
        className="flex items-center gap-1 text-sm font-medium leading-5 text-[#1f6f43] hover:underline"
      >
        {linkLabel}
        <img src={CHEVRON_RIGHT_ICON} alt="" className="size-5" />
      </Link>
    </div>
  );
}

export function DashboardPage() {
  const { summary, recent, categoryStats, isLoading } = useDashboard();

  return (
    <Layout>
      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          iconSrc={WALLET_ICON}
          label={DASHBOARD_MESSAGES.summaryBalance}
          value={summary.balance}
        />
        <SummaryCard
          iconSrc={CIRCLE_UP_ICON}
          label={DASHBOARD_MESSAGES.summaryIncome}
          value={summary.income}
        />
        <SummaryCard
          iconSrc={CIRCLE_DOWN_ICON}
          label={DASHBOARD_MESSAGES.summaryExpense}
          value={summary.expense}
        />

        <section className="col-span-2 flex flex-col overflow-hidden rounded-xl border border-[#e5e7eb] bg-white">
          <SectionHeader
            title={DASHBOARD_MESSAGES.recentTitle}
            linkLabel={DASHBOARD_MESSAGES.recentSeeAll}
            linkTo="/transactions"
          />

          <div className="flex flex-col">
            {isLoading && recent.length === 0 ? (
              <div className="px-6 py-10 text-center text-sm text-[#4b5563]">
                {DASHBOARD_MESSAGES.loading}
              </div>
            ) : null}

            {!isLoading && recent.length === 0 ? (
              <div className="px-6 py-10 text-center text-sm text-[#4b5563]">
                {DASHBOARD_MESSAGES.recentEmpty}
              </div>
            ) : null}

            {recent.map((transaction) => (
              <TransactionRow key={transaction.id} transaction={transaction} />
            ))}
          </div>

          <Link
            to="/transactions"
            className="flex items-center justify-center gap-1 border-t border-[#e5e7eb] px-6 py-5 text-sm font-medium leading-5 text-[#1f6f43] hover:underline"
          >
            <img src={PLUS_ICON} alt="" className="size-5" />
            {DASHBOARD_MESSAGES.newTransaction}
          </Link>
        </section>

        <section className="col-span-1 flex flex-col self-start overflow-hidden rounded-xl border border-[#e5e7eb] bg-white">
          <SectionHeader
            title={DASHBOARD_MESSAGES.categoriesTitle}
            linkLabel={DASHBOARD_MESSAGES.categoriesManage}
            linkTo="/categories"
          />

          <div className="flex flex-col gap-5 p-6">
            {isLoading && categoryStats.length === 0 ? (
              <p className="text-center text-sm text-[#4b5563]">
                {DASHBOARD_MESSAGES.loading}
              </p>
            ) : null}

            {!isLoading && categoryStats.length === 0 ? (
              <p className="text-center text-sm text-[#4b5563]">
                {DASHBOARD_MESSAGES.categoriesEmpty}
              </p>
            ) : null}

            {categoryStats.map((stat) => (
              <CategoryRow
                key={stat.category.id}
                stat={stat}
                itemLabel={DASHBOARD_MESSAGES.itemSuffix}
                itemsLabel={DASHBOARD_MESSAGES.itemsSuffix}
              />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}

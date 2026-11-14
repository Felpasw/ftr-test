import { Link } from "react-router-dom";

import { Button, Layout } from "../../../components";
import { formatCurrency, formatDate } from "../../../utils/format";
import type { TransactionType } from "../../../services/interfaces/transaction.interface";

import { DASHBOARD_MESSAGES, useDashboard } from "./hooks";

type CardTone = "positive" | "negative" | "neutral";

const CARD_TONE: Record<CardTone, string> = {
  positive: "text-emerald-600",
  negative: "text-red-600",
  neutral: "text-slate-900",
};

const AMOUNT_TONE: Record<TransactionType, string> = {
  INCOME: "text-emerald-600",
  EXPENSE: "text-red-600",
};

const AMOUNT_PREFIX: Record<TransactionType, string> = {
  INCOME: "+",
  EXPENSE: "-",
};

const pickBalanceTone = (balance: number): CardTone => {
  if (balance > 0) return "positive";
  if (balance < 0) return "negative";
  return "neutral";
};

type SummaryCardProps = {
  label: string;
  value: number;
  tone: CardTone;
};

function SummaryCard({ label, value, tone }: SummaryCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className={`mt-2 text-2xl font-semibold ${CARD_TONE[tone]}`}>
        {formatCurrency(value)}
      </p>
    </div>
  );
}

export function DashboardPage() {
  const { summary, recent, isLoading } = useDashboard();

  return (
    <Layout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {DASHBOARD_MESSAGES.title}
          </h1>
          <p className="text-sm text-slate-500">
            {DASHBOARD_MESSAGES.subtitle}
          </p>
        </div>
        <Link to="/transactions">
          <Button>{DASHBOARD_MESSAGES.newTransactionCta}</Button>
        </Link>
      </div>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <SummaryCard
          label={DASHBOARD_MESSAGES.summaryIncome}
          value={summary.income}
          tone="positive"
        />
        <SummaryCard
          label={DASHBOARD_MESSAGES.summaryExpense}
          value={summary.expense}
          tone="negative"
        />
        <SummaryCard
          label={DASHBOARD_MESSAGES.summaryBalance}
          value={summary.balance}
          tone={pickBalanceTone(summary.balance)}
        />
      </section>

      <section className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            {DASHBOARD_MESSAGES.recentTitle}
          </h2>
          <Link
            to="/transactions"
            className="text-sm font-medium text-slate-900 underline"
          >
            {DASHBOARD_MESSAGES.recentSeeAll}
          </Link>
        </div>

        {isLoading ? (
          <p className="text-slate-500">{DASHBOARD_MESSAGES.loading}</p>
        ) : null}

        {!isLoading && recent.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <p className="text-slate-600">{DASHBOARD_MESSAGES.emptyRecent}</p>
          </div>
        ) : null}

        {!isLoading && recent.length > 0 ? (
          <ul className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white shadow-sm">
            {recent.map((transaction) => (
              <li
                key={transaction.id}
                className="flex items-center justify-between px-5 py-4"
              >
                <div>
                  <p className="font-medium text-slate-900">
                    {transaction.title}
                  </p>
                  <p className="text-xs text-slate-500">
                    {transaction.category?.name ??
                      DASHBOARD_MESSAGES.noCategory}{" "}
                    · {formatDate(transaction.date)}
                  </p>
                </div>
                <span
                  className={`font-semibold ${AMOUNT_TONE[transaction.type]}`}
                >
                  {AMOUNT_PREFIX[transaction.type]}
                  {formatCurrency(transaction.amount)}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </section>
    </Layout>
  );
}

import { transactionsHooks } from "../../../../hooks/useTransactions";
import type {
  Transaction,
  TransactionsSummary,
} from "../../../../services/interfaces/transaction.interface";

export const DASHBOARD_MESSAGES = {
  title: "Dashboard",
  subtitle: "Resumo das suas finanças.",
  newTransactionCta: "Nova transação",
  summaryIncome: "Receitas",
  summaryExpense: "Despesas",
  summaryBalance: "Saldo",
  recentTitle: "Últimas transações",
  recentSeeAll: "Ver todas",
  loading: "Carregando...",
  emptyRecent: "Você ainda não registrou nenhuma transação.",
  noCategory: "Sem categoria",
} as const;

const RECENT_LIMIT = 5;

type DashboardViewModel = {
  summary: TransactionsSummary;
  recent: Transaction[];
  isLoading: boolean;
};

export function useDashboard(): DashboardViewModel {
  const { summary, transactions, isLoading } = transactionsHooks.use();

  return {
    summary,
    recent: transactions.slice(0, RECENT_LIMIT),
    isLoading,
  };
}

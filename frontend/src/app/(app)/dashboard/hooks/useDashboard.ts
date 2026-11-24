import { useQuery } from "@apollo/client";

import {
  CATEGORY_STATS_QUERY,
  TRANSACTIONS_QUERY,
  TRANSACTIONS_SUMMARY_QUERY,
} from "../../../../services/graphql/queries";
import type { CategoryStat } from "../../../../services/interfaces/category.interface";
import type {
  Transaction,
  TransactionsSummary,
} from "../../../../services/interfaces/transaction.interface";

export const DASHBOARD_MESSAGES = {
  summaryBalance: "Saldo total",
  summaryIncome: "Receitas do mês",
  summaryExpense: "Despesas do mês",
  recentTitle: "Transações recentes",
  recentSeeAll: "Ver todas",
  categoriesTitle: "Categorias",
  categoriesManage: "Gerenciar",
  categoriesEmpty: "Nenhuma categoria ainda.",
  recentEmpty: "Nenhuma transação registrada ainda.",
  newTransaction: "Nova transação",
  itemsSuffix: "itens",
  itemSuffix: "item",
  loading: "Carregando...",
} as const;

const RECENT_LIMIT = 5;
const CATEGORIES_LIMIT = 5;

const EMPTY_SUMMARY: TransactionsSummary = {
  income: 0,
  expense: 0,
  balance: 0,
};

type DashboardViewModel = {
  summary: TransactionsSummary;
  recent: Transaction[];
  categoryStats: CategoryStat[];
  isLoading: boolean;
};

export function useDashboard(): DashboardViewModel {
  const summaryQuery = useQuery<{ transactionsSummary: TransactionsSummary }>(
    TRANSACTIONS_SUMMARY_QUERY,
  );
  const transactionsQuery = useQuery<{ transactions: Transaction[] }>(
    TRANSACTIONS_QUERY,
  );
  const statsQuery = useQuery<{ categoryStats: CategoryStat[] }>(
    CATEGORY_STATS_QUERY,
  );

  return {
    summary: summaryQuery.data?.transactionsSummary ?? EMPTY_SUMMARY,
    recent: (transactionsQuery.data?.transactions ?? []).slice(0, RECENT_LIMIT),
    categoryStats: (statsQuery.data?.categoryStats ?? []).slice(
      0,
      CATEGORIES_LIMIT,
    ),
    isLoading:
      summaryQuery.loading || transactionsQuery.loading || statsQuery.loading,
  };
}

/* eslint-disable react-hooks/rules-of-hooks --
 * Veja a nota em `useAuth.ts`: classe TS não é componente, `.use()` chama
 * hooks em ordem fixa, Rules of Hooks mantida.
 */
import { useQuery } from "@apollo/client";

import {
  TRANSACTIONS_QUERY,
  TRANSACTIONS_SUMMARY_QUERY,
} from "../services/graphql/queries";
import type {
  Transaction,
  TransactionsSummary,
} from "../services/interfaces/transaction.interface";

import type {
  ITransactionsHooks,
  TransactionsHooksResult,
} from "./interfaces/useTransactions.interface";

const EMPTY_SUMMARY: TransactionsSummary = { income: 0, expense: 0, balance: 0 };

class TransactionsHooks implements ITransactionsHooks {
  use(): TransactionsHooksResult {
    const transactionsQuery = useQuery<{ transactions: Transaction[] }>(
      TRANSACTIONS_QUERY,
    );
    const summaryQuery = useQuery<{ transactionsSummary: TransactionsSummary }>(
      TRANSACTIONS_SUMMARY_QUERY,
    );

    return {
      transactions: transactionsQuery.data?.transactions ?? [],
      summary: summaryQuery.data?.transactionsSummary ?? EMPTY_SUMMARY,
      isLoading: transactionsQuery.loading || summaryQuery.loading,
    };
  }
}

export const transactionsHooks = new TransactionsHooks();

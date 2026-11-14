import type {
  Transaction,
  TransactionsSummary,
} from "../../services/interfaces/transaction.interface";

export type TransactionsHooksResult = {
  transactions: Transaction[];
  summary: TransactionsSummary;
  isLoading: boolean;
};

export interface ITransactionsHooks {
  use(): TransactionsHooksResult;
}

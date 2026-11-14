import { apolloClient } from "./apolloClient";
import {
  CREATE_TRANSACTION_MUTATION,
  DELETE_TRANSACTION_MUTATION,
  UPDATE_TRANSACTION_MUTATION,
} from "./graphql/mutations";
import {
  TRANSACTIONS_QUERY,
  TRANSACTIONS_SUMMARY_QUERY,
} from "./graphql/queries";
import type {
  CreateTransactionInput,
  ITransactionService,
  Transaction,
  UpdateTransactionInput,
} from "./interfaces/transaction.interface";

/*
 * Toda mutação de transação muda tanto a lista quanto o resumo agregado que o
 * dashboard consome — refaz as duas pra manter saldo/receita/despesa em sync.
 */
const REFETCH = [
  { query: TRANSACTIONS_QUERY },
  { query: TRANSACTIONS_SUMMARY_QUERY },
];

class TransactionService implements ITransactionService {
  async create(input: CreateTransactionInput): Promise<Transaction> {
    const { data } = await apolloClient.mutate<{
      createTransaction: Transaction;
    }>({
      mutation: CREATE_TRANSACTION_MUTATION,
      variables: { input },
      refetchQueries: REFETCH,
    });
    if (!data) throw new Error("Resposta vazia do servidor");
    return data.createTransaction;
  }

  async update(id: string, input: UpdateTransactionInput): Promise<Transaction> {
    const { data } = await apolloClient.mutate<{
      updateTransaction: Transaction;
    }>({
      mutation: UPDATE_TRANSACTION_MUTATION,
      variables: { id, input },
      refetchQueries: REFETCH,
    });
    if (!data) throw new Error("Resposta vazia do servidor");
    return data.updateTransaction;
  }

  async delete(id: string): Promise<boolean> {
    const { data } = await apolloClient.mutate<{ deleteTransaction: boolean }>({
      mutation: DELETE_TRANSACTION_MUTATION,
      variables: { id },
      refetchQueries: REFETCH,
    });
    return data?.deleteTransaction ?? false;
  }
}

export const transactionService = new TransactionService();

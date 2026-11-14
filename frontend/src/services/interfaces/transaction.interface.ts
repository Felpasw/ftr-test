import type { Category } from "./category.interface";

export type TransactionType = "INCOME" | "EXPENSE";

export type Transaction = {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  date: string;
  category: Pick<Category, "id" | "name" | "color"> | null;
};

export type TransactionsSummary = {
  income: number;
  expense: number;
  balance: number;
};

export type CreateTransactionInput = {
  title: string;
  amount: number;
  type: TransactionType;
  date: string;
  categoryId?: string | null;
};

export type UpdateTransactionInput = Partial<CreateTransactionInput>;

export interface ITransactionService {
  create(input: CreateTransactionInput): Promise<Transaction>;
  update(id: string, input: UpdateTransactionInput): Promise<Transaction>;
  delete(id: string): Promise<boolean>;
}

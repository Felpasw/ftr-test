export type Category = {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  createdAt: string;
};

export type CategoryStat = {
  category: Pick<Category, "id" | "name" | "description" | "icon" | "color">;
  transactionCount: number;
  totalAmount: number;
};

export type CategoriesOverview = {
  totalCategories: number;
  totalTransactions: number;
  mostUsed: Pick<Category, "id" | "name" | "icon" | "color"> | null;
};

export type CreateCategoryInput = {
  name: string;
  description?: string | null;
  icon?: string | null;
  color?: string | null;
};

export type UpdateCategoryInput = {
  name?: string;
  description?: string | null;
  icon?: string | null;
  color?: string | null;
};

export interface ICategoryService {
  create(input: CreateCategoryInput): Promise<Category>;
  update(id: string, input: UpdateCategoryInput): Promise<Category>;
  delete(id: string): Promise<boolean>;
}

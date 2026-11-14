import type { Category } from "../../services/interfaces/category.interface";

export type CategoriesHooksResult = {
  categories: Category[];
  isLoading: boolean;
};

export interface ICategoriesHooks {
  use(): CategoriesHooksResult;
}

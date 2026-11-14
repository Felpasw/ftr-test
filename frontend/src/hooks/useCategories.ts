/* eslint-disable react-hooks/rules-of-hooks --
 * Veja a nota em `useAuth.ts`: classe TS não é componente, `.use()` chama
 * hooks em ordem fixa, Rules of Hooks mantida.
 */
import { useQuery } from "@apollo/client";

import { CATEGORIES_QUERY } from "../services/graphql/queries";
import type { Category } from "../services/interfaces/category.interface";

import type {
  CategoriesHooksResult,
  ICategoriesHooks,
} from "./interfaces/useCategories.interface";

class CategoriesHooks implements ICategoriesHooks {
  use(): CategoriesHooksResult {
    const { data, loading } = useQuery<{ categories: Category[] }>(
      CATEGORIES_QUERY,
    );

    return {
      categories: data?.categories ?? [],
      isLoading: loading,
    };
  }
}

export const categoriesHooks = new CategoriesHooks();

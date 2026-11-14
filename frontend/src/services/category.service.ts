import { apolloClient } from "./apolloClient";
import {
  CREATE_CATEGORY_MUTATION,
  DELETE_CATEGORY_MUTATION,
  UPDATE_CATEGORY_MUTATION,
} from "./graphql/mutations";
import { CATEGORIES_QUERY } from "./graphql/queries";
import type {
  Category,
  CreateCategoryInput,
  ICategoryService,
  UpdateCategoryInput,
} from "./interfaces/category.interface";

/*
 * Mutations invalidam a lista de categorias. Em vez de deixar cada hook de
 * tela gerenciar `refetchQueries`, concentra aqui porque é parte do contrato:
 * criar/editar/deletar categoria SEMPRE refaz `categories`.
 */
const REFETCH = [{ query: CATEGORIES_QUERY }];

class CategoryService implements ICategoryService {
  async create(input: CreateCategoryInput): Promise<Category> {
    const { data } = await apolloClient.mutate<{ createCategory: Category }>({
      mutation: CREATE_CATEGORY_MUTATION,
      variables: { input },
      refetchQueries: REFETCH,
    });
    if (!data) throw new Error("Resposta vazia do servidor");
    return data.createCategory;
  }

  async update(id: string, input: UpdateCategoryInput): Promise<Category> {
    const { data } = await apolloClient.mutate<{ updateCategory: Category }>({
      mutation: UPDATE_CATEGORY_MUTATION,
      variables: { id, input },
      refetchQueries: REFETCH,
    });
    if (!data) throw new Error("Resposta vazia do servidor");
    return data.updateCategory;
  }

  async delete(id: string): Promise<boolean> {
    const { data } = await apolloClient.mutate<{ deleteCategory: boolean }>({
      mutation: DELETE_CATEGORY_MUTATION,
      variables: { id },
      refetchQueries: REFETCH,
    });
    return data?.deleteCategory ?? false;
  }
}

export const categoryService = new CategoryService();

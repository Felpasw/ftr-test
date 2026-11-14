export type Category = {
  id: string;
  name: string;
  color: string | null;
  createdAt: string;
};

export type CreateCategoryInput = {
  name: string;
  color?: string | null;
};

export type UpdateCategoryInput = {
  name?: string;
  color?: string | null;
};

export interface ICategoryService {
  create(input: CreateCategoryInput): Promise<Category>;
  update(id: string, input: UpdateCategoryInput): Promise<Category>;
  delete(id: string): Promise<boolean>;
}

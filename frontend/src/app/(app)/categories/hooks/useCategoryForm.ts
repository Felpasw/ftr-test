import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { categoryService } from "../../../../services/category.service";
import type { Category } from "../../../../services/interfaces/category.interface";

const schema = z.object({
  name: z.string().min(1, "Informe um nome"),
  color: z.string().optional(),
});

export type CategoryFormValues = z.infer<typeof schema>;

type UseCategoryFormArgs = {
  editing: Category | null;
  onSuccess: () => void;
};

const buildDefaults = (editing: Category | null): CategoryFormValues => {
  if (!editing) return { name: "", color: "" };
  return { name: editing.name, color: editing.color ?? "" };
};

export function useCategoryForm({ editing, onSuccess }: UseCategoryFormArgs) {
  const form = useForm<CategoryFormValues>({
    defaultValues: buildDefaults(editing),
    resolver: zodResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  /*
   * Sem o reset, abrir o diálogo em modo "editar" após ter aberto em "criar"
   * mantém os campos vazios. Como o form é montado uma vez e só o alvo muda,
   * o efeito sincroniza defaults ao trocar `editing`.
   */
  useEffect(() => {
    form.reset(buildDefaults(editing));
  }, [editing, form]);

  const onSubmit = form.handleSubmit(async (values) => {
    const input = {
      name: values.name,
      color: values.color?.trim() || null,
    };
    if (editing) {
      await categoryService.update(editing.id, input);
    } else {
      await categoryService.create(input);
    }
    onSuccess();
  });

  return {
    control: form.control,
    onSubmit,
    isSaving: form.formState.isSubmitting,
  };
}

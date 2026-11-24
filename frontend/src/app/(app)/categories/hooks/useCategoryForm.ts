import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { categoryService } from "../../../../services/category.service";
import {
  CATEGORY_COLOR_OPTIONS,
  CATEGORY_ICON_LIBRARY,
  type CategoryColor,
  type CategoryIconKey,
} from "../../../../utils/categoryVisuals";

import type { EditableCategory } from "./useCategoriesPage";

const iconValues = CATEGORY_ICON_LIBRARY as ReadonlyArray<CategoryIconKey>;
const colorValues = CATEGORY_COLOR_OPTIONS as ReadonlyArray<CategoryColor>;

const DEFAULT_ICON: CategoryIconKey = "briefcase";
const DEFAULT_COLOR: CategoryColor = "#16a34a";

const schema = z.object({
  name: z.string().min(1, "Informe um título"),
  description: z.string().optional(),
  icon: z.enum(iconValues as unknown as [CategoryIconKey, ...CategoryIconKey[]]),
  color: z.enum(colorValues as unknown as [CategoryColor, ...CategoryColor[]]),
});

export type CategoryFormValues = z.infer<typeof schema>;

type UseCategoryFormArgs = {
  editing: EditableCategory | null;
  onSuccess: () => void;
};

const isIcon = (value: string | null | undefined): value is CategoryIconKey =>
  value != null && (iconValues as ReadonlyArray<string>).includes(value);

const isColor = (value: string | null | undefined): value is CategoryColor =>
  value != null && (colorValues as ReadonlyArray<string>).includes(value);

const buildDefaults = (
  editing: EditableCategory | null,
): CategoryFormValues => {
  if (!editing) {
    return {
      name: "",
      description: "",
      icon: DEFAULT_ICON,
      color: DEFAULT_COLOR,
    };
  }
  return {
    name: editing.name,
    description: editing.description ?? "",
    icon: isIcon(editing.icon) ? editing.icon : DEFAULT_ICON,
    color: isColor(editing.color) ? editing.color : DEFAULT_COLOR,
  };
};

export function useCategoryForm({ editing, onSuccess }: UseCategoryFormArgs) {
  const form = useForm<CategoryFormValues>({
    defaultValues: buildDefaults(editing),
    resolver: zodResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    form.reset(buildDefaults(editing));
  }, [editing, form]);

  const onSubmit = form.handleSubmit(async (values) => {
    const input = {
      name: values.name,
      description: values.description?.trim() || null,
      icon: values.icon,
      color: values.color,
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

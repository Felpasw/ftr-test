import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { transactionService } from "../../../../services/transaction.service";
import type { Transaction } from "../../../../services/interfaces/transaction.interface";
import { toInputDate } from "../../../../utils/format";

const schema = z.object({
  title: z.string().min(1, "Informe um título"),
  amount: z.coerce.number().positive("Valor deve ser positivo"),
  type: z.enum(["INCOME", "EXPENSE"]),
  date: z.string().min(1, "Informe a data"),
  categoryId: z.string().optional(),
});

export type TransactionFormValues = z.infer<typeof schema>;

type UseTransactionFormArgs = {
  editing: Transaction | null;
  onSuccess: () => void;
};

const buildDefaults = (editing: Transaction | null): TransactionFormValues => {
  if (!editing) {
    return {
      title: "",
      amount: 0,
      type: "EXPENSE",
      date: toInputDate(new Date()),
      categoryId: "",
    };
  }
  return {
    title: editing.title,
    amount: editing.amount,
    type: editing.type,
    date: toInputDate(editing.date),
    categoryId: editing.category?.id ?? "",
  };
};

export function useTransactionForm({
  editing,
  onSuccess,
}: UseTransactionFormArgs) {
  const form = useForm<TransactionFormValues>({
    defaultValues: buildDefaults(editing),
    resolver: zodResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    form.reset(buildDefaults(editing));
  }, [editing, form]);

  const onSubmit = form.handleSubmit(async (values) => {
    /*
     * `T12:00:00` normaliza no meio do dia pra evitar que fuso horário
     * empurre o registro pro dia anterior ao converter pra UTC.
     */
    const input = {
      title: values.title,
      amount: values.amount,
      type: values.type,
      date: new Date(`${values.date}T12:00:00`).toISOString(),
      categoryId: values.categoryId || null,
    };
    if (editing) {
      await transactionService.update(editing.id, input);
    } else {
      await transactionService.create(input);
    }
    onSuccess();
  });

  return {
    control: form.control,
    onSubmit,
    isSaving: form.formState.isSubmitting,
  };
}

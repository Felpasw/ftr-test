import {
  Button,
  ControlledInput,
  ControlledSelect,
  Modal,
} from "../../../../components";
import type { Category } from "../../../../services/interfaces/category.interface";
import type { Transaction } from "../../../../services/interfaces/transaction.interface";
import { TRANSACTIONS_MESSAGES, useTransactionForm } from "../hooks";

type TransactionDialogProps = {
  open: boolean;
  editing: Transaction | null;
  categories: ReadonlyArray<Category>;
  onClose: () => void;
  onSuccess: () => void;
};

export function TransactionDialog({
  open,
  editing,
  categories,
  onClose,
  onSuccess,
}: TransactionDialogProps) {
  const { control, onSubmit, isSaving } = useTransactionForm({
    editing,
    onSuccess,
  });

  const title = editing
    ? TRANSACTIONS_MESSAGES.dialogEditTitle
    : TRANSACTIONS_MESSAGES.dialogCreateTitle;

  const saveLabel = isSaving
    ? TRANSACTIONS_MESSAGES.dialogSaving
    : TRANSACTIONS_MESSAGES.dialogSave;

  return (
    <Modal open={open} title={title} onClose={onClose}>
      <form onSubmit={onSubmit} className="space-y-4">
        <ControlledInput
          control={control}
          name="title"
          label={TRANSACTIONS_MESSAGES.dialogTitleLabel}
        />
        <div className="grid grid-cols-2 gap-3">
          <ControlledInput
            control={control}
            name="amount"
            type="number"
            step="0.01"
            label={TRANSACTIONS_MESSAGES.dialogAmountLabel}
          />
          <ControlledInput
            control={control}
            name="date"
            type="date"
            label={TRANSACTIONS_MESSAGES.dialogDateLabel}
          />
        </div>

        <ControlledSelect
          control={control}
          name="type"
          label={TRANSACTIONS_MESSAGES.dialogTypeLabel}
        >
          <option value="EXPENSE">{TRANSACTIONS_MESSAGES.typeExpense}</option>
          <option value="INCOME">{TRANSACTIONS_MESSAGES.typeIncome}</option>
        </ControlledSelect>

        <ControlledSelect
          control={control}
          name="categoryId"
          label={TRANSACTIONS_MESSAGES.dialogCategoryLabel}
        >
          <option value="">{TRANSACTIONS_MESSAGES.dialogCategoryNone}</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </ControlledSelect>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            {TRANSACTIONS_MESSAGES.dialogCancel}
          </Button>
          <Button type="submit" loading={isSaving}>
            {saveLabel}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

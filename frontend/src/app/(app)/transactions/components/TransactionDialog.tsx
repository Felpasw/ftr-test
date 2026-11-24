import {
  Button,
  ControlledInput,
  ControlledSelect,
  Modal,
} from "../../../../components";
import type { Category } from "../../../../services/interfaces/category.interface";
import type { Transaction } from "../../../../services/interfaces/transaction.interface";
import { TRANSACTIONS_MESSAGES, useTransactionForm } from "../hooks";
import { TransactionTypeToggle } from "./TransactionTypeToggle";

const CURRENCY_ICON = "/icons/currency-brl.svg";

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
    <Modal
      open={open}
      title={title}
      subtitle={TRANSACTIONS_MESSAGES.dialogSubtitle}
      closeLabel={TRANSACTIONS_MESSAGES.dialogClose}
      onClose={onClose}
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        <TransactionTypeToggle
          control={control}
          name="type"
          expenseLabel={TRANSACTIONS_MESSAGES.dialogTypeExpense}
          incomeLabel={TRANSACTIONS_MESSAGES.dialogTypeIncome}
        />

        <div className="flex flex-col gap-4">
          <ControlledInput
            control={control}
            name="title"
            label={TRANSACTIONS_MESSAGES.dialogDescriptionLabel}
            placeholder={TRANSACTIONS_MESSAGES.dialogDescriptionPlaceholder}
          />

          <div className="grid grid-cols-2 gap-4">
            <ControlledInput
              control={control}
              name="date"
              type="date"
              label={TRANSACTIONS_MESSAGES.dialogDateLabel}
            />
            <ControlledInput
              control={control}
              name="amount"
              type="number"
              step="0.01"
              label={TRANSACTIONS_MESSAGES.dialogAmountLabel}
              placeholder={TRANSACTIONS_MESSAGES.dialogAmountPlaceholder}
              leading={
                <img src={CURRENCY_ICON} alt="" className="size-4" />
              }
            />
          </div>

          <ControlledSelect
            control={control}
            name="categoryId"
            label={TRANSACTIONS_MESSAGES.dialogCategoryLabel}
          >
            <option value="">
              {TRANSACTIONS_MESSAGES.dialogCategoryPlaceholder}
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </ControlledSelect>
        </div>

        <Button type="submit" loading={isSaving} fullWidth>
          {saveLabel}
        </Button>
      </form>
    </Modal>
  );
}

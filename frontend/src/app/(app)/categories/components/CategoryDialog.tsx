import { Button, ControlledInput, Modal } from "../../../../components";
import type { Category } from "../../../../services/interfaces/category.interface";
import { CATEGORIES_MESSAGES, useCategoryForm } from "../hooks";

type CategoryDialogProps = {
  open: boolean;
  editing: Category | null;
  onClose: () => void;
  onSuccess: () => void;
};

export function CategoryDialog({
  open,
  editing,
  onClose,
  onSuccess,
}: CategoryDialogProps) {
  const { control, onSubmit, isSaving } = useCategoryForm({
    editing,
    onSuccess,
  });

  const title = editing
    ? CATEGORIES_MESSAGES.dialogEditTitle
    : CATEGORIES_MESSAGES.dialogCreateTitle;

  const saveLabel = isSaving
    ? CATEGORIES_MESSAGES.dialogSaving
    : CATEGORIES_MESSAGES.dialogSave;

  return (
    <Modal open={open} title={title} onClose={onClose}>
      <form onSubmit={onSubmit} className="space-y-4">
        <ControlledInput
          control={control}
          name="name"
          label={CATEGORIES_MESSAGES.dialogNameLabel}
        />
        <ControlledInput
          control={control}
          name="color"
          type="color"
          label={CATEGORIES_MESSAGES.dialogColorLabel}
        />

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            {CATEGORIES_MESSAGES.dialogCancel}
          </Button>
          <Button type="submit" loading={isSaving}>
            {saveLabel}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

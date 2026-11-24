import { Button, ControlledInput, Modal } from "../../../../components";

import {
  CATEGORIES_MESSAGES,
  useCategoryForm,
  type EditableCategory,
} from "../hooks";
import { CategoryColorPicker } from "./CategoryColorPicker";
import { CategoryIconPicker } from "./CategoryIconPicker";

type CategoryDialogProps = {
  open: boolean;
  editing: EditableCategory | null;
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
    <Modal
      open={open}
      title={title}
      subtitle={CATEGORIES_MESSAGES.dialogSubtitle}
      closeLabel={CATEGORIES_MESSAGES.dialogClose}
      onClose={onClose}
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <ControlledInput
            control={control}
            name="name"
            label={CATEGORIES_MESSAGES.dialogTitleLabel}
            placeholder={CATEGORIES_MESSAGES.dialogTitlePlaceholder}
          />
          <ControlledInput
            control={control}
            name="description"
            label={CATEGORIES_MESSAGES.dialogDescriptionLabel}
            placeholder={CATEGORIES_MESSAGES.dialogDescriptionPlaceholder}
            hint={CATEGORIES_MESSAGES.dialogDescriptionHint}
          />

          <CategoryIconPicker
            control={control}
            name="icon"
            label={CATEGORIES_MESSAGES.dialogIconLabel}
          />

          <CategoryColorPicker
            control={control}
            name="color"
            label={CATEGORIES_MESSAGES.dialogColorLabel}
          />
        </div>

        <Button type="submit" loading={isSaving} fullWidth>
          {saveLabel}
        </Button>
      </form>
    </Modal>
  );
}

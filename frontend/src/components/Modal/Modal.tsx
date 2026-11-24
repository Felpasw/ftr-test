import { useEffect, type ReactNode } from "react";

const X_ICON = "/icons/x.svg";

type ModalProps = {
  open: boolean;
  title: string;
  subtitle?: string;
  closeLabel?: string;
  onClose: () => void;
  children: ReactNode;
};

export function Modal({
  open,
  title,
  subtitle,
  closeLabel = "Fechar",
  onClose,
  children,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4"
      onClick={onClose}
    >
      <div
        className="flex w-[448px] max-w-full flex-col gap-6 rounded-xl border border-[#e5e7eb] bg-white p-[25px]"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex items-start gap-4">
          <div className="flex min-w-0 flex-1 flex-col items-center gap-0.5 text-center">
            <h2 className="w-full text-base font-semibold leading-6 text-[#111827]">
              {title}
            </h2>
            {subtitle ? (
              <p className="w-full truncate text-sm leading-5 text-[#4b5563]">
                {subtitle}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-[#d1d5db] bg-white p-2 hover:bg-[#f9fafb]"
          >
            <img src={X_ICON} alt="" className="size-4" />
          </button>
        </header>

        {children}
      </div>
    </div>
  );
}

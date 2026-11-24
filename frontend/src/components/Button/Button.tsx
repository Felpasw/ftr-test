import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "danger" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  loading?: boolean;
  fullWidth?: boolean;
};

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium leading-5 transition disabled:cursor-not-allowed " +
  "data-[variant=primary]:bg-[#1f6f43] data-[variant=primary]:text-white hover:data-[variant=primary]:bg-[#1a5d39] disabled:data-[variant=primary]:bg-[#9ca3af] " +
  "data-[variant=secondary]:border data-[variant=secondary]:border-[#d1d5db] data-[variant=secondary]:bg-white data-[variant=secondary]:text-[#374151] hover:data-[variant=secondary]:bg-[#f8f9fa] disabled:data-[variant=secondary]:text-[#9ca3af] " +
  "data-[variant=danger]:bg-[#dc2626] data-[variant=danger]:text-white hover:data-[variant=danger]:bg-[#b91c1c] disabled:data-[variant=danger]:bg-[#fca5a5] " +
  "data-[variant=ghost]:bg-transparent data-[variant=ghost]:text-[#374151] hover:data-[variant=ghost]:bg-[#f3f4f6] disabled:data-[variant=ghost]:text-[#9ca3af] " +
  "data-[full-width=true]:w-full";

export function Button({
  variant = "primary",
  loading = false,
  fullWidth = false,
  className = "",
  disabled,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      data-variant={variant}
      data-full-width={fullWidth}
      disabled={disabled || loading}
      className={BASE_CLASSES + " " + className}
    >
      {children}
    </button>
  );
}

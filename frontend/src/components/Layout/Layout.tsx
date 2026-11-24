import { NavLink, useNavigate } from "react-router-dom";
import type { ReactNode } from "react";

import { authHooks } from "../../hooks/useAuth";

type LayoutProps = {
  children: ReactNode;
};

type NavItem = { to: string; label: string; end?: boolean };

const NAV_ITEMS: ReadonlyArray<NavItem> = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/transactions", label: "Transações" },
  { to: "/categories", label: "Categorias" },
];

const LOGO_SRC = "/icons/logo.svg";

const NAV_LINK_CLASS =
  "text-sm leading-5 transition " +
  "data-[active=true]:font-semibold data-[active=true]:text-[#1f6f43] " +
  "data-[active=false]:font-normal data-[active=false]:text-[#4b5563] hover:data-[active=false]:text-[#111827]";

const getInitials = (name: string | undefined): string => {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return `${first}${last}`.toUpperCase();
};

export function Layout({ children }: LayoutProps) {
  const { user, signout } = authHooks.use();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signout();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fa]">
      <header className="w-full border-b border-[#e5e7eb] bg-white pb-[17px] pt-[16px]">
        <div className="relative mx-auto flex max-w-[1280px] items-center justify-between px-12">
          <img src={LOGO_SRC} alt="Financy" className="h-6 w-auto" />

          <nav className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-5">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end}>
                {({ isActive }) => (
                  <span data-active={isActive} className={NAV_LINK_CLASS}>
                    {item.label}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            onClick={handleSignOut}
            title={user?.email ?? "Sair"}
            aria-label="Sair"
            className="flex size-9 items-center justify-center overflow-hidden rounded-full bg-[#d1d5db] text-sm font-medium leading-5 text-[#111827] transition hover:opacity-90"
          >
            {getInitials(user?.name)}
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-x-hidden">
        <div className="mx-auto w-full max-w-[1280px] p-12">{children}</div>
      </main>
    </div>
  );
}

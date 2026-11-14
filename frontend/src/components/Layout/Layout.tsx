import { NavLink, useNavigate } from "react-router-dom";
import type { ReactNode } from "react";

import { authHooks } from "../../hooks/useAuth";
import { Button } from "../Button";

type LayoutProps = {
  children: ReactNode;
};

type NavItem = { to: string; label: string; end?: boolean };

const NAV_ITEMS: ReadonlyArray<NavItem> = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/transactions", label: "Transações" },
  { to: "/categories", label: "Categorias" },
];

const linkClass = ({ isActive }: { isActive: boolean }) => {
  const base = "block rounded-md px-3 py-2 text-sm font-medium transition";
  if (isActive) return `${base} bg-slate-900 text-white`;
  return `${base} text-slate-700 hover:bg-slate-200`;
};

export function Layout({ children }: LayoutProps) {
  const { user, signout, signoutLoading } = authHooks.use();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signout();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="flex w-64 flex-col justify-between border-r border-slate-200 bg-white p-6">
        <div className="space-y-8">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Finanças</h1>
            <p className="text-xs text-slate-500">Seu dinheiro, organizado</p>
          </div>

          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={linkClass}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="space-y-3 border-t border-slate-200 pt-4">
          <div>
            <p className="text-sm font-medium text-slate-900">{user?.name}</p>
            <p className="text-xs text-slate-500">{user?.email}</p>
          </div>
          <Button
            variant="secondary"
            fullWidth
            loading={signoutLoading}
            onClick={handleSignOut}
          >
            Sair
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden p-8">{children}</main>
    </div>
  );
}

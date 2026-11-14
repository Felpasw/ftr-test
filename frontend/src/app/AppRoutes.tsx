import { Navigate, Route, Routes } from "react-router-dom";

import { authHooks } from "../hooks/useAuth";

import { CategoriesPage } from "./(app)/categories/page";
import { DashboardPage } from "./(app)/dashboard/page";
import { TransactionsPage } from "./(app)/transactions/page";
import { SigninPage } from "./(auth)/signin/page";
import { SignupPage } from "./(auth)/signup/page";

/*
 * Durante o boot o `me` ainda está carregando — renderizar o shell mudo evita
 * o flash do login enquanto a sessão persistida é revalidada.
 */
function BootShell() {
  return (
    <div className="flex min-h-screen items-center justify-center text-slate-500">
      Carregando...
    </div>
  );
}

function UnauthenticatedRoutes() {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="*" element={<SigninPage />} />
    </Routes>
  );
}

function AuthenticatedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/transactions" element={<TransactionsPage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export function AppRoutes() {
  const { isAuthenticated, isLoading } = authHooks.use();

  if (isLoading) return <BootShell />;
  if (!isAuthenticated) return <UnauthenticatedRoutes />;
  return <AuthenticatedRoutes />;
}

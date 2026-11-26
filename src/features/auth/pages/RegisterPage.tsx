import { Navigate, useParams } from "react-router-dom";

import RegisterHeader from "../components/RegisterHeader";
import RegisterForm from "../components/RegisterForm";
import RegisterHero from "../components/RegisterHero";
import RegisterBenefits from "../components/RegisterBenefits";
import type { RegisterRole } from "../types/auth.types";

const VALID_ROLES: RegisterRole[] = ["customer", "shop"];

const isRegisterRole = (value?: string): value is RegisterRole => {
  return Boolean(value && VALID_ROLES.includes(value as RegisterRole));
};

const RegisterPage = () => {
  const { role } = useParams<{ role: string }>();

  if (!isRegisterRole(role)) {
    return <Navigate to="/account/selection" replace />;
  }

  return (
    <main className="relative mx-auto flex min-h-0 w-full max-w-[1500px] flex-1 items-center justify-center px-4 py-3 sm:px-8 lg:px-10 xl:px-12">
      <div className="grid w-full grid-cols-1 items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:gap-10">
        {/* Left - Hero and Benefits (Desktop Only) */}
        <section className="hidden w-full max-w-[680px] flex-col justify-center gap-1 lg:flex">
          <RegisterHero role={role} />
          <RegisterBenefits role={role} />
        </section>

        {/* Right - Registration Form */}
        <section className="flex w-full justify-center lg:justify-end">
          <div className="w-full max-w-[560px] rounded-[26px] border border-purple-200/80 bg-white/90 p-4 shadow-[0_20px_60px_rgba(124,58,237,0.10)] dark:border-slate-700 dark:bg-slate-900/90 sm:p-5 lg:p-6">
            <RegisterHeader role={role} />
            <RegisterForm role={role} />
          </div>
        </section>
      </div>
    </main>
  );
};

export default RegisterPage;

import { Navigate } from "react-router-dom";

import LoginHeader from "../components/LoginHeader";
import LoginForm from "../components/LoginForm";
import LoginHero from "../components/LoginHero";
import LoginBenefits from "../components/LoginBenefits";
import { useAuthSession } from "../api/authQueries";
import { getDashboardRoute } from "../utils/getDashboardRoute";

const LoginPage = () => {
  const { user } = useAuthSession();

  if (user) {
    return <Navigate to={getDashboardRoute(user)} replace />;
  }

  return (
    <main className="flex min-h-0 w-full flex-1 items-center justify-center overflow-x-clip px-3 py-2 sm:px-6 lg:px-8">
      <div className="grid w-full max-w-[1125px] grid-cols-1 overflow-hidden rounded-[30px] border border-purple-200/80 bg-white/90 shadow-[0_20px_60px_rgba(124,58,237,0.12)] dark:border-slate-700 dark:bg-slate-900/90 lg:grid-cols-2">
        <section className="flex w-full items-center justify-center px-5 py-4 sm:px-8 sm:py-5 lg:px-10 lg:py-5 xl:px-12">
          <div className="w-full max-w-[480px]">
            <LoginHeader />
            <LoginForm />
          </div>
        </section>

        <section className="relative hidden items-center justify-center border-l border-purple-100/80 px-7 py-5 dark:border-slate-700 lg:flex xl:px-9">
          <div className="w-full max-w-[480px]">
            <LoginHero />
            <LoginBenefits />
          </div>
        </section>
      </div>
    </main>
  );
};

export default LoginPage;

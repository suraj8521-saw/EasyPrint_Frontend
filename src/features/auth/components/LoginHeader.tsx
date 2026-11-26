import { LockKeyhole } from "lucide-react";

const LoginHeader = () => {
  return (
    <div className="mb-6 text-center">
      {/* Badge */}
      <div className="mb-3 flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-100/70 px-4 py-2 text-sm font-bold text-purple-800 dark:border-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
          <LockKeyhole size={19} />
          Login to EasyPrint
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
        Welcome{" "}
        <span className="text-purple-700 dark:text-purple-400">
          Back!
        </span>
      </h1>

      {/* Description */}
      <p className="mx-auto mt-2 max-w-sm text-base leading-6 text-slate-600 dark:text-slate-400">
        Sign in to your account and continue printing with EasyPrint.
      </p>
    </div>
  );
};

export default LoginHeader;
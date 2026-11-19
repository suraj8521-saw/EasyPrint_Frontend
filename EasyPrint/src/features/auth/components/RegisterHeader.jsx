
const RegisterHeader = ({ role }) => {
  const isShopkeeper = role === "shop" || role === "shopkeeper";

  return (
    <div className="mb-4">

      {/* Registration Badge */}
      <div className="mb-3 flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-100/70 px-5 py-2 text-sm font-bold text-purple-800 shadow-sm dark:border-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
          <span>{isShopkeeper ? "🏪" : "👤"}</span>

          {isShopkeeper
            ? "Shopkeeper Registration"
            : "Customer Registration"}
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">
        Create Your
        <br />
        <span className="text-purple-700 dark:text-purple-400">
          {isShopkeeper ? "Shopkeeper" : "Customer"}
        </span>{" "}
        Account
      </h1>

      {/* Description */}
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400">
        {isShopkeeper
          ? "Register your print shop on EasyPrint and start receiving print orders online."
          : "Create your EasyPrint account and start uploading, editing and printing documents easily."}
      </p>

    </div>
  );
};

export default RegisterHeader;

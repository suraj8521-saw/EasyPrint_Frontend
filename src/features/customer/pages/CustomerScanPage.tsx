import { useNavigate } from "react-router-dom";
import { ArrowLeft, QrCode } from "lucide-react";
import QrScannerBox from "../components/QrScannerBox";

const CustomerScanPage = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-xl px-4 py-6 sm:px-6">
      <button
        type="button"
        onClick={() => navigate("/customer/dashboard")}
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 transition hover:text-purple-700 dark:text-slate-300 dark:hover:text-purple-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </button>

      <div className="rounded-3xl border border-purple-200/80 bg-white/95 p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
            <QrCode className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Scan Shop QR Code
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Point your camera at the EasyPrint QR stand or enter the shop ID
            </p>
          </div>
        </div>

       <QrScannerBox
          onShopDetected={(shopCode) =>
            navigate(`/scan/${encodeURIComponent(shopCode)}`)
          }
        />
      </div>
    </div>
  );
};

export default CustomerScanPage;
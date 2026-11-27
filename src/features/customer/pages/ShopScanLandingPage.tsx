import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  AlertTriangle,
  ArrowLeft,
  BadgeCheck,
  LogIn,
  MapPin,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

import { useAuthSession } from "../../auth/api/authQueries";
import { customerService } from "../services/customerService";
import ShopConfirmationModal from "../components/ShopConfirmationModal";
import PrintCartWorkspace from "../components/PrintCartWorkspace";
import type { PublicShopProfile, SessionMode } from "../types/customer.types";

const ShopScanLandingPage = () => {
  const { shopCode = "" } = useParams<{ shopCode: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, isAuthenticated, isCheckingAuth } = useAuthSession();

  const [loadedForCode, setLoadedForCode] = useState<string | null>(null);
  const [shop, setShop] = useState<PublicShopProfile | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedForCode, setConfirmedForCode] = useState<string | null>(null);

  const normalizedShopCode = shopCode.trim().toUpperCase();
  const isLoadingShop =
    Boolean(normalizedShopCode) && loadedForCode !== normalizedShopCode;
  const isConfirmed =
    Boolean(normalizedShopCode) && confirmedForCode === normalizedShopCode;
  const sessionMode: SessionMode =
    isAuthenticated && user ? "AUTHENTICATED" : "GUEST";

  useEffect(() => {
    if (!normalizedShopCode) return;

    let isMounted = true;

    customerService
      .verifyShop(normalizedShopCode)
      .then((profile) => {
        if (!isMounted) return;
        setShop(profile);
        setErrorMessage(null);
        setLoadedForCode(normalizedShopCode);
      })
      .catch((err: unknown) => {
        if (!isMounted) return;
        const backendMsg = axios.isAxiosError(err)
          ? (err.response?.data as { message?: string })?.message ||
            "This QR code is invalid or the shop is currently unavailable."
          : "Unable to verify shop right now. Please try again.";
        setShop(null);
        setErrorMessage(backendMsg);
        setLoadedForCode(normalizedShopCode);
      });

    return () => {
      isMounted = false;
    };
  }, [normalizedShopCode]);

  const handleConfirmContinue = () => {
    setConfirmedForCode(normalizedShopCode);
  };

  const handleLoginRedirect = () => {
    navigate("/auth/login", {
      state: { from: location },
    });
  };

  const handleCancelScan = () => {
    if (isAuthenticated && user?.role === "CUSTOMER") {
      navigate("/customer/scan", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };

  if (!normalizedShopCode) {
    return (
      <div className="mx-auto flex min-h-[75vh] max-w-md flex-col items-center justify-center px-4 text-center">
        <div className="rounded-3xl border border-red-200/80 bg-white p-8 shadow-xl dark:border-red-900/50 dark:bg-slate-900">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-950/60 dark:text-red-400">
            <AlertTriangle className="h-7 w-7" />
          </div>
          <h1 className="mt-4 text-xl font-extrabold text-slate-900 dark:text-white">
            Invalid QR Link
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Missing Shop Code in the scanned QR link.
          </p>
          <button
            type="button"
            onClick={handleCancelScan}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-purple-700 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-purple-800"
          >
            <ArrowLeft className="h-4 w-4" />
            {isAuthenticated ? "Back to Scanner" : "Go to Home"}
          </button>
        </div>
      </div>
    );
  }

  if (isLoadingShop || isCheckingAuth) {
    return (
      <div className="flex min-h-[75vh] flex-col items-center justify-center gap-3 px-4">
        <div className="h-11 w-11 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
          Verifying EasyPrint Shop QR...
        </p>
      </div>
    );
  }

  if (errorMessage || !shop) {
    return (
      <div className="mx-auto flex min-h-[75vh] max-w-md flex-col items-center justify-center px-4 text-center">
        <div className="rounded-3xl border border-red-200/80 bg-white p-8 shadow-xl dark:border-red-900/50 dark:bg-slate-900">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-950/60 dark:text-red-400">
            <AlertTriangle className="h-7 w-7" />
          </div>
          <h1 className="mt-4 text-xl font-extrabold text-slate-900 dark:text-white">
            Shop Unavailable
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            {errorMessage || "Could not verify this shop QR code."}
          </p>
          <button
            type="button"
            onClick={handleCancelScan}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-purple-700 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-purple-800"
          >
            <ArrowLeft className="h-4 w-4" />
            {isAuthenticated ? "Back to Scanner" : "Go to Home"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      {!isConfirmed && (
        <ShopConfirmationModal
          shop={shop}
          isAuthenticated={isAuthenticated}
          userName={user?.name}
          onConfirmContinue={handleConfirmContinue}
          onLoginRedirect={handleLoginRedirect}
          onCancel={handleCancelScan}
        />
      )}

      <div className="rounded-3xl border border-purple-200/80 bg-white/95 p-5 shadow-lg dark:border-slate-800 dark:bg-slate-900/95 sm:p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300">
                <BadgeCheck className="h-3.5 w-3.5" />
                Verified Shop
              </span>
              <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {shop.shopCode}
              </span>
              <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-semibold text-purple-800 dark:bg-purple-950/70 dark:text-purple-300">
                {sessionMode === "AUTHENTICATED"
                  ? `Signed in: ${user?.name || "Customer"}`
                  : "Guest Mode"}
              </span>
            </div>

            <h1 className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
              {shop.shopName}
            </h1>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
              <MapPin className="h-4 w-4 shrink-0 text-purple-600" />
              {shop.landmark ? `${shop.landmark} • ` : ""}
              {shop.fullAddress}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {!isAuthenticated && (
              <button
                type="button"
                onClick={handleLoginRedirect}
                className="inline-flex items-center gap-1.5 rounded-xl border border-purple-200 bg-purple-50 px-3.5 py-2 text-xs font-bold text-purple-800 transition hover:bg-purple-100 dark:border-slate-700 dark:bg-slate-800 dark:text-purple-300"
              >
                <LogIn className="h-3.5 w-3.5" />
                Login
              </button>
            )}
            <button
              type="button"
              onClick={() => setConfirmedForCode(null)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Shop Info
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-purple-200/80 bg-white/95 p-5 shadow-lg dark:border-slate-800 dark:bg-slate-900/95 sm:p-6">
        {!shop.acceptingOrders && (
          <div className="mb-5 flex items-start gap-2.5 rounded-2xl border border-amber-200 bg-amber-50 p-3.5 text-xs font-medium text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-200">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            <span>
              This shop has temporarily paused new print orders. You can still
              prepare and edit your files locally, and submit once the shop
              reopens.
            </span>
          </div>
        )}

        <PrintCartWorkspace
          shop={shop}
          sessionMode={sessionMode}
          userEmail={user?.email}
        />

        <div className="mt-6 flex items-center justify-center gap-2 border-t border-slate-200/70 pt-4 text-xs font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>
            Edits are processed locally on your device and uploaded securely
            only when you click Continue.
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShopScanLandingPage;
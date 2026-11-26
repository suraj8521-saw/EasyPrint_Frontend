
import type {
  RazorpayHandlerSuccessResponse,
} from "../types/activation.types";

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;

  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };

  notes?: Record<string, string>;

  theme?: {
    color?: string;
  };

  handler: (
    response: RazorpayHandlerSuccessResponse
  ) => void;

  modal?: {
    ondismiss?: () => void;
    escape?: boolean;
    confirm_close?: boolean;
  };
}

interface RazorpayInstance {
  open: () => void;
  close: () => void;
  on: (
    event: string,
    callback: (err: unknown) => void
  ) => void;
}

declare global {
  interface Window {
    Razorpay?: new (
      options: RazorpayOptions
    ) => RazorpayInstance;
  }
}

const RAZORPAY_SDK_URL =
  "https://checkout.razorpay.com/v1/checkout.js";

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }

    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const existingScript = document.querySelector(
      `script[src="${RAZORPAY_SDK_URL}"]`
    ) as HTMLScriptElement | null;

    if (existingScript) {
      if (existingScript.dataset.loaded === "true") {
        resolve(Boolean(window.Razorpay));
        return;
      }

      existingScript.addEventListener(
        "load",
        () => resolve(Boolean(window.Razorpay)),
        { once: true }
      );

      existingScript.addEventListener(
        "error",
        () => resolve(false),
        { once: true }
      );

      return;
    }

    const script = document.createElement("script");

    script.src = RAZORPAY_SDK_URL;
    script.async = true;

    script.onload = () => {
      script.dataset.loaded = "true";
      resolve(Boolean(window.Razorpay));
    };

    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};

export interface OpenRazorpayCheckoutParams {
  orderId: string;
  amountInRupees: number;
  currency?: string;
  planName: string;
  shopCode?: string;
  userName?: string;
  userEmail?: string;

  onSuccess: (
    response: RazorpayHandlerSuccessResponse
  ) => void;

  onDismiss?: () => void;

  onPaymentFailed?: (
    errorDescription: string
  ) => void;
}

export const openRazorpayCheckout = async ({
  orderId,
  amountInRupees,
  currency = "INR",
  planName,
  shopCode,
  userName,
  userEmail,
  onSuccess,
  onDismiss,
  onPaymentFailed,
}: OpenRazorpayCheckoutParams): Promise<void> => {
  const isLoaded = await loadRazorpayScript();

  if (!isLoaded || !window.Razorpay) {
    throw new Error(
      "Razorpay payment gateway failed to load. Please check your internet connection."
    );
  }

  const razorpayKey =
    import.meta.env.VITE_RAZORPAY_KEY_ID || "";

  if (!razorpayKey) {
    throw new Error(
      "Razorpay Key ID is missing. Please configure VITE_RAZORPAY_KEY_ID."
    );
  }

  let settled = false;

  const options: RazorpayOptions = {
    key: razorpayKey,

    amount: Math.round(
      Number(amountInRupees) * 100
    ),

    currency,

    name: "EasyPrint",

    description: `${planName} Activation${
      shopCode ? ` (${shopCode})` : ""
    }`,

    order_id: orderId,

    prefill: {
      name: userName || undefined,
      email: userEmail || undefined,
    },

    notes: shopCode ? { shopCode } : undefined,

    theme: {
      color: "#7c3aed",
    },

    handler: (response) => {
      if (settled) return;

      settled = true;
      onSuccess(response);
    },

    modal: {
      escape: true,
      confirm_close: false,

      ondismiss: () => {
        if (settled) return;

        settled = true;
        onDismiss?.();
      },
    },
  };

  const rzp = new window.Razorpay(options);

  rzp.on("payment.failed", (failureEvent: unknown) => {
    if (settled) return;

    settled = true;

    const description =
      (
        failureEvent as {
          error?: {
            description?: string;
          };
        }
      )?.error?.description ||
      "Payment was unsuccessful. Please try again.";

    rzp.close();

    onPaymentFailed?.(description);
  });

  try {
    rzp.open();
  } catch (error) {
    if (settled) return;

    settled = true;

    onPaymentFailed?.(
      error instanceof Error
        ? error.message
        : "Unable to open Razorpay checkout."
    );
  }
};

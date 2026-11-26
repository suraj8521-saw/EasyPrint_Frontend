
import type {
  NormalizedActivationPlan,
  RawActivationPlan,
} from "../types/activation.types";

export function formatTitleCase(text: string): string {
  return String(text || "")
    .split(" ")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1).toLowerCase()
    )
    .join(" ");
}

export function normalizeActivationPlan(
  rawPlan: RawActivationPlan,
  index: number
): NormalizedActivationPlan {
  const rawName =
    rawPlan.planName ||
    rawPlan.name ||
    rawPlan.title ||
    `Plan ${index + 1}`;

  const name = formatTitleCase(rawName);

  const category = String(
    rawPlan.targetCategory || ""
  ).toUpperCase();

  const isLifetime =
    category === "ONE_TIME_ACTIVATION" ||
    rawName.toLowerCase().includes("life");

  const isYearly =
    category === "SUBSCRIPTION_YEARLY" ||
    rawName.toLowerCase().includes("year");

  const durationDays = Number(
    rawPlan.durationDays || rawPlan.validityDays || 0
  );

  const validityLabel = isLifetime
    ? "One-Time Activation"
    : durationDays
      ? `Valid for ${durationDays} Days`
      : "Valid for 365 Days";

  const summaryValidity = isLifetime
    ? "Lifetime Access"
    : durationDays === 30
      ? "30 Days (1 Month)"
      : durationDays === 365
        ? "365 Days (1 Year)"
        : `${durationDays} Days`;

  const defaultFeatures = isLifetime
    ? [
        "All premium features",
        "No renewal required",
        "Lifetime access",
      ]
    : isYearly
      ? [
          "All core features",
          "Priority support",
          "Best value yearly plan",
        ]
      : [
          "All core features",
          "Manage orders",
          "Set your pricing",
        ];

  return {
    id: String(rawPlan.id ?? rawPlan._id ?? index + 1),

    name,

    targetCategory: category || "ONE_TIME_ACTIVATION",

    durationDays,

    validityLabel,

    summaryValidity,

    price: Number(
      rawPlan.basePrice ??
      rawPlan.price ??
      rawPlan.amount ??
      0
    ),

    iconType: isLifetime ? "crown" : "calendar",

    isBestValue: isYearly,

    badgeText: isYearly ? "Best Value" : "",

    features:
      Array.isArray(rawPlan.features) &&
      rawPlan.features.length > 0
        ? rawPlan.features
        : defaultFeatures,
  };
}

export function extractPlansList(
  responseData: unknown
): NormalizedActivationPlan[] {
  const rawList = Array.isArray(responseData)
    ? (responseData as RawActivationPlan[])
    : Array.isArray(
          (responseData as {
            data?: RawActivationPlan[];
          })?.data
        )
      ? (responseData as {
          data: RawActivationPlan[];
        }).data
      : null;

  if (!rawList || rawList.length === 0) {
    throw new Error("No active activation plans found.");
  }

  return rawList
    .filter((plan) => plan.isActive !== false)
    .map((plan, index) =>
      normalizeActivationPlan(plan, index)
    )
    .sort((a, b) => a.durationDays - b.durationDays);
}

const RESERVED_SEGMENTS = new Set([
  "REGISTER",
  "LOGIN",
  "DASHBOARD",
  "ORDERS",
  "SETTINGS",
  "PROFILE",
  "PRICING",
  "SERVICES",
  "EARNINGS",
  "ACTIVATION",
  "LOCKED-DASHBOARD",
]);

export const extractShopCodeFromScan = (rawInput: string): string | null => {
  const trimmed = rawInput.trim();
  if (!trimmed) return null;

  try {
    const url = new URL(trimmed);
    const segments = url.pathname.split("/").filter(Boolean);
    const prefixIndex = segments.findIndex((seg) => {
      const lower = seg.toLowerCase();
      return lower === "scan" || lower === "shop";
    });

    if (prefixIndex !== -1 && segments[prefixIndex + 1]) {
      const candidate = segments[prefixIndex + 1].trim().toUpperCase();
      return RESERVED_SEGMENTS.has(candidate) ? null : candidate;
    }
  } catch {
    // Not a full URL; treat as direct shop code if valid format
  }

  const cleaned = trimmed.replace(/^\/+|\/+$/g, "").toUpperCase();
  if (RESERVED_SEGMENTS.has(cleaned)) return null;

  if (/^[A-Z0-9-]{4,20}$/.test(cleaned)) {
    return cleaned;
  }

  return null;
};
import type {
  BindingType,
  PaperSize,
  PrintColorMode,
  PrintSide,
  PublicShopProfile,
  StagedCartItem,
} from "../types/customer.types";

export const ALL_COLOR_MODES: { value: PrintColorMode; label: string }[] = [
  { value: "B_AND_W", label: "Black & White" },
  { value: "COLOR", label: "Full Color" },
];

export const ALL_PAPER_SIZES: { value: PaperSize; label: string }[] = [
  { value: "A4", label: "A4 (Standard)" },
  { value: "A3", label: "A3 (Large)" },
  { value: "A5", label: "A5 (Compact)" },
  { value: "LEGAL", label: "Legal" },
];

export const ALL_PRINT_SIDES: { value: PrintSide; label: string }[] = [
  { value: "SINGLE_SIDED", label: "Single-Sided" },
  { value: "DOUBLE_SIDED", label: "Double-Sided" },
];

export const ALL_BINDING_TYPES: { value: BindingType; label: string }[] = [
  { value: "NONE", label: "No Binding (Loose)" },
  { value: "STAPLED", label: "Stapled" },
  { value: "SPIRAL", label: "Spiral Binding" },
  { value: "SOFTBOUND", label: "Softbound" },
  { value: "HARDBOUND", label: "Hardbound" },
];

export const getDefaultPrintOptions = (shop: PublicShopProfile) => {
  const colorMode: PrintColorMode =
    shop.colorPrices?.B_AND_W !== undefined
      ? "B_AND_W"
      : (Object.keys(shop.colorPrices || {})[0] as PrintColorMode) || "B_AND_W";

  const paperSize: PaperSize =
    shop.sizeMultipliers?.A4 !== undefined
      ? "A4"
      : (Object.keys(shop.sizeMultipliers || {})[0] as PaperSize) || "A4";

  const printSide: PrintSide =
    shop.sideMultipliers?.SINGLE_SIDED !== undefined
      ? "SINGLE_SIDED"
      : (Object.keys(shop.sideMultipliers || {})[0] as PrintSide) || "SINGLE_SIDED";

  const bindingType: BindingType =
    shop.bindingPrices?.NONE !== undefined
      ? "NONE"
      : (Object.keys(shop.bindingPrices || {})[0] as BindingType) || "NONE";

  return { colorMode, paperSize, printSide, bindingType };
};

export const estimateItemCost = (
  item: Pick<
    StagedCartItem,
    "pageCount" | "copies" | "colorMode" | "paperSize" | "printSide" | "bindingType"
  >,
  shop: PublicShopProfile
): number => {
  const basePrice = Number(shop.colorPrices?.[item.colorMode] ?? 0);
  const sizeMult = Number(shop.sizeMultipliers?.[item.paperSize] ?? 1);
  const sideMult = Number(shop.sideMultipliers?.[item.printSide] ?? 1);
  const bindingCost = Number(shop.bindingPrices?.[item.bindingType] ?? 0);

  if (basePrice <= 0) return 0;

  const pageCost = basePrice * sizeMult * sideMult;
  const totalPages = item.pageCount * item.copies;
  const totalBinding = bindingCost * item.copies;

  return Math.round((pageCost * totalPages + totalBinding) * 100) / 100;
};
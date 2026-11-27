export type SessionMode = "GUEST" | "AUTHENTICATED";

export type PrintColorMode = "B_AND_W" | "COLOR";
export type PaperSize = "A4" | "A3" | "A5" | "LEGAL";
export type PrintSide = "SINGLE_SIDED" | "DOUBLE_SIDED";
export type BindingType =
  | "NONE"
  | "STAPLED"
  | "SPIRAL"
  | "SOFTBOUND"
  | "HARDBOUND";

export interface PublicShopProfile {
  shopCode: string;
  shopName: string;
  acceptingOrders: boolean;
  fullAddress: string;
  landmark: string | null;
  colorPrices: Partial<Record<PrintColorMode, number>>;
  sizeMultipliers: Partial<Record<PaperSize, number>>;
  sideMultipliers: Partial<Record<PrintSide, number>>;
  bindingPrices: Partial<Record<BindingType, number>>;
}

export interface StagedCartItem {
  id: string;
  sourceType: "PDF" | "PHOTO_LAYOUT";
  fileName: string;
  originalPdfBytes?: ArrayBuffer; // Kept for re-editing PDFs locally
  finalPdfBlob: Blob;
  pageCount: number;
  fileSizeBytes: number;
  colorMode: PrintColorMode;
  paperSize: PaperSize;
  printSide: PrintSide;
  bindingType: BindingType;
  copies: number;
  isEdited: boolean;
}

export interface CloudinarySignatureResponse {
  uploadSessionToken: string;
  folder: string;
  sessionExpiresAt: string;
  signature: string;
  timestamp: number;
  apiKey: string;
  cloudName: string;
}

export interface CartItemRequestPayload {
  publicId: string;
  fileName: string;
  colorMode: PrintColorMode;
  paperSize: PaperSize;
  printSide: PrintSide;
  bindingType: BindingType;
  copies: number;
}

export interface CreateDraftOrderPayload {
  shopCode: string;
  customerEmail?: string;
  uploadSessionToken: string;
  orderCategory?: "PRINTING";
  items: CartItemRequestPayload[];
}

export interface DraftJobSummary {
  jobId: string;
  fileName: string;
  verifiedPages: number;
  copies: number;
  colorMode: PrintColorMode;
  paperSize: PaperSize;
  printSide: PrintSide;
  bindingType: BindingType;
  jobCost: number;
}

export interface DraftOrderResponse {
  orderId: string;
  orderCode: string;
  shopCode: string;
  status: string;
  subTotal: number;
  totalAmount: number;
  currency: string;
  items: DraftJobSummary[];
}
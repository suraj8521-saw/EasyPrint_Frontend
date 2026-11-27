import { axiosInstance } from "../../../services";
import {
  createDraftOrderApi,
  generateCloudinaryUploadSignature,
  getOrCreateDeviceId,
  uploadPdfBlobToCloudinary,
} from "../api/customerCheckoutApi";
import { fetchPublicShopProfile } from "../api/customerDiscoveryApi";
import type {
  CartItemRequestPayload,
  CreateDraftOrderPayload,
  DraftOrderResponse,
  PublicShopProfile,
  StagedCartItem,
} from "../types/customer.types";

export interface TrackOrderParams {
  orderCode: string;
  accessKey: string;
}

export interface TrackedOrderStatus {
  orderCode: string;
  shopName: string;
  status: string;
  totalAmount: number;
  createdAt?: string;
}

export const customerService = {
  /**
   * 1. Verify shop details by QR / Shop Code
   */
  verifyShop(shopCode: string): Promise<PublicShopProfile> {
    return fetchPublicShopProfile(shopCode);
  },

  /**
   * 2. Upload staged PDFs / Photo sheets sequentially and generate verified draft bill
   */
  async submitPrintBatch(params: {
    shopCode: string;
    items: StagedCartItem[];
    customerEmail?: string;
    existingSessionToken?: string | null;
    onProgress?: (message: string) => void;
  }): Promise<{ draft: DraftOrderResponse; uploadSessionToken: string }> {
    const {
      shopCode,
      items,
      customerEmail,
      existingSessionToken,
      onProgress,
    } = params;

    let currentSessionToken = existingSessionToken ?? null;
    const uploadedItems: CartItemRequestPayload[] = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      onProgress?.(
        `Uploading document ${i + 1} of ${items.length}: ${item.fileName}...`
      );

      const sig = await generateCloudinaryUploadSignature(currentSessionToken);
      currentSessionToken = sig.uploadSessionToken;

      const publicId = await uploadPdfBlobToCloudinary(
        item.finalPdfBlob,
        item.fileName,
        sig
      );

      uploadedItems.push({
        publicId,
        fileName: item.fileName,
        colorMode: item.colorMode,
        paperSize: item.paperSize,
        printSide: item.printSide,
        bindingType: item.bindingType,
        copies: item.copies,
      });
    }

    if (!currentSessionToken) {
      throw new Error("Missing upload session token.");
    }

    onProgress?.("Verifying documents & calculating exact bill...");

    const payload: CreateDraftOrderPayload = {
      shopCode,
      customerEmail,
      uploadSessionToken: currentSessionToken,
      orderCategory: "PRINTING",
      items: uploadedItems,
    };

    const draft = await createDraftOrderApi(payload);
    return { draft, uploadSessionToken: currentSessionToken };
  },

  /**
   * 3. Track an order using Order ID + 6-character Private Key (Guest & Customer)
   */
  async trackOrderByKey({
    orderCode,
    accessKey,
  }: TrackOrderParams): Promise<TrackedOrderStatus> {
    const cleanCode = orderCode.trim().toUpperCase();
    const cleanKey = accessKey.trim().toUpperCase();

    const response = await axiosInstance.get<{
      success: boolean;
      message?: string;
      data: TrackedOrderStatus;
    }>(`/public/orders/track/${encodeURIComponent(cleanCode)}`, {
      params: { accessKey: cleanKey },
      headers: { "X-Device-Id": getOrCreateDeviceId() },
    });

    if (!response.data?.success || !response.data?.data) {
      throw new Error(
        response.data?.message || "Unable to fetch order status."
      );
    }

    return response.data.data;
  },
};
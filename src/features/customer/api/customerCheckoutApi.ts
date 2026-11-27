import axios from "axios";
import axiosInstance from "../../../services/axiosInstance";
import type {
  CloudinarySignatureResponse,
  CreateDraftOrderPayload,
  DraftOrderResponse,
} from "../types/customer.types";

const DEVICE_ID_STORAGE_KEY = "easyprint_device_id";

export const getOrCreateDeviceId = (): string => {
  try {
    let deviceId = localStorage.getItem(DEVICE_ID_STORAGE_KEY);
    if (!deviceId) {
      deviceId =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `ep-dev-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      localStorage.setItem(DEVICE_ID_STORAGE_KEY, deviceId);
    }
    return deviceId;
  } catch {
    return "ep-fallback-device";
  }
};

export const generateCloudinaryUploadSignature = async (
  existingSessionToken?: string | null
): Promise<CloudinarySignatureResponse> => {
  const headers: Record<string, string> = {
    "X-Device-Id": getOrCreateDeviceId(),
  };

  if (existingSessionToken) {
    headers["X-Upload-Session"] = existingSessionToken;
  }

  const response = await axiosInstance.get<{
    success: boolean;
    message: string;
    data: CloudinarySignatureResponse;
  }>("/customer/documents/generate-signature", { headers });

  if (!response.data?.success || !response.data?.data) {
    throw new Error(
      response.data?.message || "Failed to generate upload signature."
    );
  }

  return response.data.data;
};

export const uploadPdfBlobToCloudinary = async (
  pdfBlob: Blob,
  fileName: string,
  sigData: CloudinarySignatureResponse
): Promise<string> => {
  const formData = new FormData();
  const safeFileName = fileName.toLowerCase().endsWith(".pdf")
    ? fileName
    : `${fileName}.pdf`;

  formData.append("file", pdfBlob, safeFileName);
  formData.append("api_key", sigData.apiKey);
  formData.append("timestamp", String(sigData.timestamp));
  formData.append("signature", sigData.signature);
  formData.append("folder", sigData.folder);
  formData.append("upload_preset", "easyprint_secure_raw");

  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${sigData.cloudName}/raw/upload`;

  const response = await axios.post<{ public_id: string }>(
    cloudinaryUrl,
    formData
  );

  if (!response.data?.public_id) {
    throw new Error(`Cloudinary did not return a publicId for ${safeFileName}.`);
  }

  return response.data.public_id;
};

export const createDraftOrderApi = async (
  payload: CreateDraftOrderPayload
): Promise<DraftOrderResponse> => {
  const response = await axiosInstance.post<{
    success: boolean;
    message: string;
    data: DraftOrderResponse;
  }>("/customer/checkout/draft", payload);

  if (!response.data?.success || !response.data?.data) {
    throw new Error(
      response.data?.message || "Failed to create draft order summary."
    );
  }

  return response.data.data;
};
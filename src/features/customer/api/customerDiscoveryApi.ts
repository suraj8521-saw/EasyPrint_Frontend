import { axiosInstance } from "../../../services";
import type { PublicShopProfile } from "../types/customer.types";

export const fetchPublicShopProfile = async (
  shopCode: string
): Promise<PublicShopProfile> => {
  const normalizedCode = shopCode.trim().toUpperCase();
  const response = await axiosInstance.get<PublicShopProfile>(
    `/public/discovery/profile/${encodeURIComponent(normalizedCode)}`
  );
  return response.data;
};
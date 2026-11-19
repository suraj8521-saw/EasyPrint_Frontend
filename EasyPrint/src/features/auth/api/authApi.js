
import axiosInstance from "../../../services/axios";

// Shopkeeper Registration
export const registerShop = async (userData) => {
  const response = await axiosInstance.post(
    "/shops/register",
    userData
  );

  return response.data;
};

// Login
export const loginUser = async (userData) => {
  const response = await axiosInstance.post(
    "/auth/login",
    userData
  );

  return response.data;
};

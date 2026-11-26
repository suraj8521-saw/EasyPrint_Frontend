import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import axiosInstance from "./axiosInstance";
import { queryClient } from "../app/queryClient";
import { AUTH_QUERY_KEYS } from "../features/auth/api/authQueries";

interface RetryRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const AUTH_ENDPOINTS = ["/auth/login", "/auth/refresh"];

let interceptorId: number | null = null;

export const setupInterceptors = (): void => {
  if (interceptorId !== null) {
    axiosInstance.interceptors.response.eject(interceptorId);
  }

  let isRefreshing = false;
  let failedQueue: Array<{
    resolve: (value?: unknown) => void;
    reject: (reason?: unknown) => void;
  }> = [];

  const processQueue = (error: unknown = null) => {
    failedQueue.forEach((prom) => {
      if (error !== null) {
        prom.reject(error);
      } else {
        prom.resolve();
      }
    });
    failedQueue = [];
  };

  interceptorId = axiosInstance.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => response,

    async (error: AxiosError) => {
      const originalRequest = error.config as RetryRequestConfig | undefined;

      if (!originalRequest) {
        return Promise.reject(error);
      }

      const isAuthEndpoint = AUTH_ENDPOINTS.some((path) =>
        originalRequest.url?.includes(path)
      );

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        !isAuthEndpoint
      ) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then(() => {
            originalRequest._retry = true;
            return axiosInstance(originalRequest);
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          await axiosInstance.post("/auth/refresh");
          processQueue(null);
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError);
          // Clear TanStack Query auth & profile server state when refresh fails
          queryClient.setQueryData(AUTH_QUERY_KEYS.currentUser, {
            success: false,
            message: "Session expired",
            data: undefined,
          });
          queryClient.removeQueries({ queryKey: AUTH_QUERY_KEYS.shopProfile });
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
};

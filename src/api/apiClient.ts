import { API_URLS } from "@/api/endpoints";
import { AuthService } from "@/services/auth/auth-service";
import { TokenService } from "@/services/auth/token-service";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: API_URLS.BASE,
});

// interceptor de ida donde le agrega el token a cada request
apiClient.interceptors.request.use(async (config) => {
  const token = await TokenService.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// "interceptor" de vuelta donde maneja los errores 401 y renueva el token automáticamente si corresponde
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // si el error es 401 evito el bucle
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newAccessToken = await AuthService.refreshToken();

      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      }
    }

    return Promise.reject(error);
  },
);

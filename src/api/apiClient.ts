import axios from "axios";
import * as SecureStore from "expo-secure-store";

// ip de servidor y puerto de API Gateway, configurar tu ip en un .env global
const API_URL = process.env.API_URL;

export const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use(async (config) => {
  try {
    const token = await SecureStore.getItemAsync("accessToken");
    console.log("Interceptor ejecutado");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error) {
    console.error("Full diagnostic logs:", error);
    return config;
  }
});

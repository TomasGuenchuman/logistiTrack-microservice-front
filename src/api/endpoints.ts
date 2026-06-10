export const API_URLS = {
  // API Gateway
  // consiste en la ip del servidor y el puerto de API Gateway, configurarlo en un .env global
  BASE: process.env.EXPO_PUBLIC_API_URL_BASE,

  AUTH: {
    LOGIN: "/auth/login",
    REFRESH: "/auth/refresh",
    LOGOUT: "/auth/logout",
  },
};

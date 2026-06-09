export const API_URLS = {
  // Acá centralizamos la IP de tu API Gateway. A futuro, esto leerá un archivo .env
  BASE: 'http://192.168.1.21:3000',
  
  AUTH: {
    LOGIN: '/auth/login',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
  }
};
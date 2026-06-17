import axios from 'axios';
import { API_URLS } from '../api/endpoints';
import { TokenService } from './token-service';

export const AuthService = {
  //Intenta renovar el token y devuelve el nuevo access_token si tiene éxito.
  async refreshToken(): Promise<string | null> {
    try {
      const refreshToken = await TokenService.getRefreshToken();
      
      if (!refreshToken) {
        return null; // No hay llave para renovar
      }

      // Usamos axios puro (sin interceptores) para ir al backend y evitar bucles infinitos
      const response = await axios.post(`${API_URLS.BASE}${API_URLS.AUTH.REFRESH}`, {
        refresh_token: refreshToken
      });

      const newAccessToken = response.data.access_token;
      const newRefreshToken = response.data.refresh_token;

      // Actualizamos el storage con los nuevos tokens
      await TokenService.saveTokens(newAccessToken, newRefreshToken);
      
      return newAccessToken;

    } catch (error) {
      console.error('Error en la negociación de llaves:', error);
      // Si la renovación falla (ej: el refresh_token expiró), limpiamos el storage
      await TokenService.clearTokens();
      return null;
    }
  }
};
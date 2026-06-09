import * as SecureStore from 'expo-secure-store';

export const TokenService = {
  // guarda el los tokens encriptados en el hardaware del dipositivo
  async saveTokens(accessToken: string, refreshToken: string): Promise<void> {
    try {
      await SecureStore.setItemAsync('accessToken', accessToken);
      await SecureStore.setItemAsync('refreshToken', refreshToken);
    } catch (error) {
      console.error('Error al guardar los tokens en la bóveda:', error);
      throw error;
    }
  },

  // recupera el access token
  async getAccessToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync('accessToken');
    } catch (error) {
      console.error('Error al obtener el Access Token:', error);
      return null;
    }
  },

  // recupera el refresh token
  async getRefreshToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync('refreshToken');
    } catch (error) {
      console.error('Error al obtener el Refresh Token:', error);
      return null;
    }
  },

  // limpia el storage de los tokens
  async clearTokens(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync('accessToken');
      await SecureStore.deleteItemAsync('refreshToken');
    } catch (error) {
      console.error('Error al limpiar la bóveda:', error);
    }
  }
};
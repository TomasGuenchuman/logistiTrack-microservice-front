import { secureTokenStorage } from "@/services/secure-token-storage";
import { webTokenStorage } from "@/services/web-token-storage";
import { Platform } from "react-native";

// acá se define el tipo de storage que se usará según el dispositivo que accede
// en web se utiliza localStorage y en mobile se utiliza expo-secure-store
const storage = Platform.OS === "web" ? webTokenStorage : secureTokenStorage;

export const TokenService = {
  // guarda los tokens encriptados en el hardware si el acceso es mobile o en localStorage si el acceso es web
  async saveTokens(accessToken: string, refreshToken: string): Promise<void> {
    try {
      await storage.save("accessToken", accessToken);

      await storage.save("refreshToken", refreshToken);
    } catch (error) {
      console.error("Error al guardar los tokens en la bóveda:", error);
      throw error;
    }
  },

  // recupera el access token
  async getAccessToken(): Promise<string | null> {
    try {
      return await storage.get("accessToken");
    } catch (error) {
      console.error("Error al obtener el Access Token:", error);
      return null;
    }
  },

  // recupera el refresh token
  async getRefreshToken(): Promise<string | null> {
    try {
      return await storage.get("refreshToken");
    } catch (error) {
      console.error("Error al obtener el Refresh Token:", error);
      return null;
    }
  },

  async clearTokens(): Promise<void> {
    try {
      await storage.remove("accessToken");

      await storage.remove("refreshToken");
    } catch (error) {
      console.error("Error al limpiar la bóveda:", error);
    }
  },
};

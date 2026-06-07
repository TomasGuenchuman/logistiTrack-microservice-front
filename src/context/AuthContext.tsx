import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { TokenService } from "../services/token-service";

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuthStatus() {
      const token = await TokenService.getAccessToken();
      if (token) {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    }
    checkAuthStatus();
  }, []);

  async function login(accessToken: string, refreshToken: string) {
    await TokenService.saveTokens(accessToken, refreshToken);
    setIsAuthenticated(true);
  }

  async function logout() {
    await TokenService.clearTokens();
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }

  return context;
}

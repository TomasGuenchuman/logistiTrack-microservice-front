import { TokenService } from "@/services/token-service";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type AuthUser = {
  id: string;
  email: string;
};

// Contexto de autenticación para manejar el estado de login/logout en la app
type AuthContextType = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    accessToken: string,
    refreshToken: string,
    user: AuthUser,
  ) => Promise<void>;
  logout: () => Promise<void>;
};

// Creamos el contexto con un valor inicial nulo, que luego será proporcionado por el AuthProvider
const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

// Componente proveedor del contexto de autenticación, que envuelve a toda la app
// para proporcionar el estado de autenticación a cualquier componente que lo necesite
export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<AuthUser | null>(null);

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

  async function login(
    accessToken: string,
    refreshToken: string,
    user: AuthUser,
  ) {
    await TokenService.saveTokens(accessToken, refreshToken);
    setUser(user);
    setIsAuthenticated(true);
  }

  async function logout() {
    await TokenService.clearTokens();
    setIsAuthenticated(false);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  console.log("Holaa");

  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }

  return context;
}

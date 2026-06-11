import { jwtDecode } from "jwt-decode";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { TokenService } from "../services/token-service";


//DEFINIMOS LA ESTRUCTURA DEL CONTENIDO DEL JWT DE NESTJS
type JwtPayload = {
  sub?: string; // Estándar de NestJS para el ID del usuario
  id?: string;  // Por si tu auth-service inyectó el ID con el nombre directo de la entidad
  email?: string;
};

// Contexto de autenticación para manejar el estado de login/logout en la app
type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  courierId: string | null; // ID del courier extraída del JWT, o null si no está autenticado
  login: (accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => Promise<void>;
};

// Creamos el contexto con un valor inicial nulo, que luego será proporcionado por el AuthProvider
const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

// Componente proveedor del contexto de autenticación, que envuelve a toda la app para proporcionar el estado de autenticación a cualquier componente que lo necesite
export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [courierId, setCourierId] = useState<string | null>(null); // Estado para almacenar el ID del courier extraído del JWT

  // FUNCIÓN AUXILIAR PARA EXTRAER EL ID DEL TOKEN DE FORMA RESILIENTE
  const extractCourierId = (token: string): string | null => {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      // Retorna 'id' si existe, si no busca en 'sub', y si no devuelve null
      return decoded.id || decoded.sub || null; 
    } catch (error) {
      console.error("Error decodificando el JWT en AuthContext:", error);
      return null;
    }
  };
  
  useEffect(() => {
    async function checkAuthStatus() {
      const token = await TokenService.getAccessToken();
      if (token) {
        setIsAuthenticated(true);
        setCourierId(extractCourierId(token)); // Extraemos el ID del courier del token y lo guardamos en el estado
      }
      setIsLoading(false);
    }
    checkAuthStatus();
  }, []);

  async function login(accessToken: string, refreshToken: string) {
    await TokenService.saveTokens(accessToken, refreshToken);
    setIsAuthenticated(true);
    setCourierId(extractCourierId(accessToken)); // Extraemos el ID del courier del token y lo guardamos en el estado
  }

  async function logout() {
    await TokenService.clearTokens();
    setIsAuthenticated(false);
    setCourierId(null); // Limpiamos el ID del courier al hacer logout
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, courierId, login, logout }}>
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

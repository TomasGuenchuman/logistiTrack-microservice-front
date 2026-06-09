import { createContext, ReactNode, useContext, useState } from "react";

// Contexto de autenticación para manejar el estado de login/logout en la app
type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

// Creamos el contexto con un valor inicial nulo, que luego será proporcionado por el AuthProvider
const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

// Componente proveedor del contexto de autenticación, que envuelve a toda la app para proporcionar el estado de autenticación a cualquier componente que lo necesite
export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Función para simular el login, que simplemente cambia el estado de autenticación a true
  function login() {
    setIsAuthenticated(true);
  }

  // Función para simular el logout, que cambia el estado de autenticación a false
  function logout() {
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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

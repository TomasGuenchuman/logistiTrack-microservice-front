import { useEffect } from 'react';
import { Alert } from 'react-native';
import { io } from 'socket.io-client';
import { useAuth } from '../context/AuthContext';
import { API_URLS } from '../api/endpoints';
import { TokenService } from '../services/token-service';

export function useSessionSocket() {
  const { logout } = useAuth();

  useEffect(() => {
    // el socket apunta a la api pero todavia no se conecta porque no tiene el token
    const socket = io(API_URLS.BASE, {
      autoConnect: false,
    });

    async function connectSocket() {
      const token = await TokenService.getAccessToken();
      if (!token) return;

      // le inyecto el token para que la api sepa quien es el usuario que se conecta
      socket.auth = { token };
      socket.connect();
    }

    connectSocket();

    // escucho el evento force_logout del back para mostrar la alerta y cerrar sesión
    socket.on('force_logout', () => {
      Alert.alert(
        "Sesión Cerrada",
        "Tu sesión fue cerrada desde otro dispositivo o por un administrador.",
        [
          {
            text: "Entendido",
            // Al ejecutar logout(), el AuthContext cambia el estado a false
            // y automáticamente el _layout.tsx manda al usuario a la pantalla del login
            onPress: () => logout() 
          }
        ]
      );
    });

    // cuando el usuario sale de la app o hace logout manual, apago el socket
    return () => {
      socket.disconnect();
    };
  }, [logout]);
}
import { useEffect } from 'react';
import { Alert } from 'react-native';
import { io } from 'socket.io-client';
import { useAuth } from '../context/AuthContext';
import { API_URLS } from '../api/endpoints';
import { TokenService } from '../services/auth/token-service';

export function useSessionSocket() {
  const { logout, isAuthenticated } = useAuth();

  useEffect(() => {
    let socket: ReturnType<typeof io>;

    async function connectSocket() {
      const deviceId = Math.random().toString(36).substring(7);
      console.log(`DISPOSITIVO ${deviceId} - INICIANDO CONEXIÓN`);
      
      const token = await TokenService.getAccessToken();
      if (!token) return;

      socket = io(API_URLS.BASE, {
        auth: { token },
      });

      socket.on('connect', () => {
        console.log(` DISPOSITIVO ${deviceId} - SOCKET CONECTADO`);
      });

      socket.on('connect_error', (error) => {
        console.log(` DISPOSITIVO ${deviceId} - ERROR DE CONEXIÓN:`, error.message);
      });

      socket.on('disconnect', (reason) => {
        console.log(` DISPOSITIVO ${deviceId} - SOCKET DESCONECTADO`);
      });

      socket.on('force_logout', () => {
        console.log(` DISPOSITIVO ${deviceId} - RECIBÍ FORCE_LOGOUT`);
        Alert.alert(
          'Sesión Cerrada',
          'Tu sesión fue cerrada desde otro dispositivo o por un administrador.',
          [{ text: 'Entendido', onPress: () => logout() }]
        );
      });
    }

    connectSocket();

    return () => {
      socket?.disconnect();
    };
  }, []);
}
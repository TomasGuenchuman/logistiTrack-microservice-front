import { useEffect } from 'react';
import { Alert } from 'react-native';
import { io } from 'socket.io-client';
import { useAuth } from '../context/AuthContext';
import { API_URLS } from '../api/endpoints';
import { TokenService } from '../services/token-service';

export function useSessionSocket() {
  const { logout, isAuthenticated } = useAuth();

  useEffect(() => {
    let socket: ReturnType<typeof io>;

    async function connectSocket() {
      const token = await TokenService.getAccessToken();
      if (!token) return;

      socket = io(API_URLS.BASE, {
        auth: { token },
      });

      socket.on('connect', () => {
        console.log('FRONT: SOCKET CONECTADO');
      });

      socket.on('connect_error', (error) => {
        console.log('FRONT: ERROR DE CONEXIÓN:', error.message);
      });

      socket.on('disconnect', (reason) => {
        console.log('FRONT: SOCKET DESCONECTADO. Razón:', reason);
      });

      socket.on('force_logout', () => {
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
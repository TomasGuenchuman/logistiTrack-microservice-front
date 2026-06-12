import { useEffect } from 'react';
import { Alert } from 'react-native';
import { io } from 'socket.io-client';
import { useAuth } from '../context/AuthContext';
import { API_URLS } from '../api/endpoints';
import { TokenService } from '../services/token-service';
import { DeviceService } from '../services/device-service';

export function useSessionSocket() {
  const { logout, isAuthenticated } = useAuth();

  useEffect(() => {
    let socket: ReturnType<typeof io>;

    async function setupSocket() {
      const token = await TokenService.getAccessToken();
      const deviceId = await DeviceService.getDeviceId();
      if (!token) return;

      socket = io(API_URLS.BASE, {
        auth: { token },
        query: { deviceId },
      });

      socket.on('force_logout', () => {
        Alert.alert(
          'Sesión Cerrada',
          'Tu sesión fue cerrada desde otro dispositivo o por un administrador.',
          [{ text: 'Entendido', onPress: () => logout() }]
        );
      });
    }

    setupSocket();

    return () => {
      socket?.disconnect();
    };
  }, [logout, isAuthenticated]);
}
import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { useSessionSocket } from "../../hooks/useSessionSocket";

export default function AppLayout() {
  const { isAuthenticated } = useAuth();
  console.log('🔥 APPLAYOUT RENDERIZADO');
  // el hook que conecta el socket y escucha el evento de cierre de sesión forzado
  //useSessionSocket();

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

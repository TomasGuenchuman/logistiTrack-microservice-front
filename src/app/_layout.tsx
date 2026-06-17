import 'react-native-get-random-values';
import { Stack, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

// Este componente se encarga de manejar la navegación y la autenticación de la aplicación.
function RootLayoutNav() {
  const { isAuthenticated, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return; //por si sigue buscando el token, no hace nada

    const inAuthScreen = segments[0] === "login";

    if (!isAuthenticated && !inAuthScreen) {
      router.replace("/login");
    } else if (isAuthenticated && inAuthScreen) {
      router.replace("/(app)/(tabs)"); 
    }
  }, [isAuthenticated, isLoading, segments]);

  if (isLoading) {
    // de momento lo dejo asi, despues la agrego la recarga generica del componente
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="(app)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

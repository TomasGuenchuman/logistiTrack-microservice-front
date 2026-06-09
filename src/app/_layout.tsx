import { Stack, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

// 1. EL PATOVICA: Este componente lee el estado y decide adónde vas
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
      router.replace("/"); 
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
      <Stack.Screen name="scan" />
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

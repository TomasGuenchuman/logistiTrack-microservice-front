import { Tabs, useRouter } from "expo-router";
import { Home, ScanLine, Settings } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSessionSocket } from "../../hooks/useSessionSocket";

export default function TabsLayout() {
  const router = useRouter();
  const insets = useSafeAreaInsets(); // dinamicamnete ajusta el width del tabBar para los botenes del dispositivo
  useSessionSocket();
  console.log('TABS LAYOUT RENDERIZADO');
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#0B5EA8",
        tabBarInactiveTintColor: "#2F343A",
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: "500",
          marginTop: 4,
        },
        tabBarStyle: {
          position: "absolute",
          height: 78 + insets.bottom,
          paddingTop: 10,
          paddingBottom: Math.max(insets.bottom, 14),
          backgroundColor: "#F7F7FA",
          borderTopWidth: 1,
          borderColor: "#D1D5DB",
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Home color={color} size={30} strokeWidth={2.2} />
          ),
        }}
      />

      <Tabs.Screen
        name="scan-tab"
        options={{
          title: "Scan",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 70,
                height: 70,
                borderRadius: 43,
                backgroundColor: "#005DA8",
                alignItems: "center",
                justifyContent: "center",
                marginTop: -46,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 6,
                elevation: 8,
                borderWidth: focused ? 2 : 0,
                borderColor: "#004C8A",
              }}
            >
              <ScanLine color="#FFFFFF" size={34} strokeWidth={2.4} />
            </View>
          ),
          tabBarButton: ({ children, style, accessibilityState }) => (
            <Pressable
              accessibilityRole="button"
              accessibilityState={accessibilityState}
              style={style}
              onPress={() => router.push("/scan")}
            >
              {children}
            </Pressable>
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <Settings color={color} size={30} strokeWidth={2.2} />
          ),
        }}
      />
    </Tabs>
  );
}

import type { PackageStatus } from "@/types/PackageStatus";
import { Pressable, StyleSheet, Text, View } from "react-native";

type PackageTabsProps = {
  activeTab: PackageStatus;
  onChangeTab: (tab: PackageStatus) => void;
  pendingCount: number;
  inTransitCount: number;
  deliveredCount: number;
};

type TabButtonProps = {
  label: string;
  active: boolean;
  onPress: () => void;
};

// Componente de pestañas para filtrar paquetes por estado, mostrando conteo en cada una
function TabButton({ label, active, onPress }: TabButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.tabItem, active && styles.activeTab]}
    >
      <Text style={[styles.tabText, active && styles.activeTabText]}>
        {label}
      </Text>
    </Pressable>
  );
}

// Componente de pestañas para filtrar paquetes por estado, mostrando conteo en cada una
export function PackageTabs({
  activeTab,
  onChangeTab,
  pendingCount,
  inTransitCount,
  deliveredCount,
}: PackageTabsProps) {
  return (
    <View style={styles.tabsContainer}>
      <TabButton
        label={`Pendientes (${pendingCount})`}
        active={activeTab === "PENDING"}
        onPress={() => onChangeTab("PENDING")}
      />

      <TabButton
        label={`En Tránsito (${inTransitCount})`}
        active={activeTab === "IN_TRANSIT"}
        onPress={() => onChangeTab("IN_TRANSIT")}
      />

      <TabButton
        label={`Entregados (${deliveredCount})`}
        active={activeTab === "DELIVERED"}
        onPress={() => onChangeTab("DELIVERED")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tabsContainer: {
    height: 48,
    flexDirection: "row",
    alignItems: "flex-end",
    borderBottomWidth: 1.2,
    borderBottomColor: "#BFC4CD",
    marginBottom: 32,
  },

  tabItem: {
    flex: 1,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },

  activeTab: {
    borderBottomWidth: 2.5,
    borderBottomColor: "#004A98",
  },

  tabText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#5B616B",
    letterSpacing: 0.5,
  },

  activeTabText: {
    color: "#004A98",
    fontWeight: "500",
  },
});
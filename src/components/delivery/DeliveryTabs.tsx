import { Pressable, StyleSheet, Text, View } from "react-native";
import type { DeliveryTab } from "./delivery";

type DeliveryTabsProps = {
  activeTab: DeliveryTab;
  onChangeTab: (tab: DeliveryTab) => void;
};

type TabButtonProps = {
  label: string;
  active: boolean;
  onPress: () => void;
};

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

export function DeliveryTabs({ activeTab, onChangeTab }: DeliveryTabsProps) {
  return (
    <View style={styles.tabsContainer}>
      <TabButton
        label="Pendientes (8)"
        active={activeTab === "pending"}
        onPress={() => onChangeTab("pending")}
      />

      <TabButton
        label="En Tránsito (1)"
        active={activeTab === "inTransit"}
        onPress={() => onChangeTab("inTransit")}
      />

      <TabButton
        label="Entregados (3)"
        active={activeTab === "delivered"}
        onPress={() => onChangeTab("delivered")}
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

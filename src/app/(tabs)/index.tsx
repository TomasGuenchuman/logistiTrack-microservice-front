import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CompletedCard } from "../../components/delivery/CompletedCard";
import { DeliveryCard } from "../../components/delivery/DeliveryCard";
import { DeliveryProgress } from "../../components/delivery/DeliveryProgress";
import { DeliveryTabs } from "../../components/delivery/DeliveryTabs";
import { HomeHeader } from "../../components/delivery/HomeHeader";
import { InTransitCard } from "../../components/delivery/InTransitCard";

import {
  deliveredDeliveries,
  inTransitDeliveries,
  pendingDeliveries,
} from "../../mock/delivery";

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<
    "pending" | "inTransit" | "delivered"
  >("pending");

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <HomeHeader />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <DeliveryProgress delivered={4} total={15} />

        <DeliveryTabs activeTab={activeTab} onChangeTab={setActiveTab} />

        {activeTab === "pending" &&
          pendingDeliveries.map((delivery) => (
            <DeliveryCard
              key={delivery.id}
              code={delivery.code}
              address={delivery.address}
              detail={delivery.detail}
              eta={delivery.eta ?? ""}
            />
          ))}

        {activeTab === "inTransit" &&
          inTransitDeliveries.map((delivery) => (
            <InTransitCard key={delivery.id} delivery={delivery} />
          ))}

        {activeTab === "delivered" &&
          deliveredDeliveries.map((delivery) => (
            <CompletedCard key={delivery.id} delivery={delivery} />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7F7FB",
  },

  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 28,
    paddingBottom: 125,
  },
});

import { CompletedCard } from "@/components/packages/CompletedCard";
import { HomeHeader } from "@/components/packages/HomeHeader";
import { InTransitCard } from "@/components/packages/InTransitCard";
import { PackageCard } from "@/components/packages/PackageCard";
import { PackageProgress } from "@/components/packages/PackageProgress";
import { PackageTabs } from "@/components/packages/PackageTabs";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  deliveredPackages,
  inTransitPackages,
  pendingPackages,
} from "@/mock/data";

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<
    "PENDING" | "IN_TRANSIT" | "DELIVERED"
  >("PENDING");

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <HomeHeader />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <PackageProgress delivered={deliveredPackages.length} total={15} />

        <PackageTabs activeTab={activeTab} onChangeTab={setActiveTab} />

        {activeTab === "PENDING" &&
          pendingPackages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              code={pkg.code}
              address={pkg.address}
              detail={pkg.detail}
              eta={pkg.eta ?? ""}
            />
          ))}

        {activeTab === "IN_TRANSIT" &&
          inTransitPackages.map((pkg) => (
            <InTransitCard key={pkg.id} pkg={pkg} />
          ))}

        {activeTab === "DELIVERED" &&
          deliveredPackages.map((pkg) => (
            <CompletedCard key={pkg.id} pkg={pkg} />
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

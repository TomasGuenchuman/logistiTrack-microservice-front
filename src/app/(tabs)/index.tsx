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

        <PackageTabs
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          pendingCount={pendingPackages.length}
          inTransitCount={inTransitPackages.length}
          deliveredCount={deliveredPackages.length}
        />

        {activeTab === "PENDING" &&
          pendingPackages.map((pkgViewModel) => (
            <PackageCard
              key={pkgViewModel.package.id}
              trackingCode={pkgViewModel.package.trackingCode}
              address={pkgViewModel.package.address}
              addressDetail={pkgViewModel.package.addressDetail}
              eta={pkgViewModel.eta ?? ""}
            />
          ))}

        {activeTab === "IN_TRANSIT" &&
          inTransitPackages.map((pkgViewModel) => (
            <InTransitCard
              key={pkgViewModel.package.id}
              pkg={pkgViewModel.package}
            />
          ))}

        {activeTab === "DELIVERED" &&
          deliveredPackages.map((pkgViewModel) => (
            <CompletedCard
              key={pkgViewModel.package.id}
              pkg={pkgViewModel.package}
            />
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

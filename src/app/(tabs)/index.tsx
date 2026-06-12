import { CompletedCard } from "@/components/packages/CompletedCard";
import { HomeHeader } from "@/components/packages/HomeHeader";
import { InTransitCard } from "@/components/packages/InTransitCard";
import { PackageCard } from "@/components/packages/PackageCard";
import { PackageProgress } from "@/components/packages/PackageProgress";
import { PackageTabs } from "@/components/packages/PackageTabs";
import { useAuth } from "@/context/AuthContext";
import { usePackages } from "@/hooks/usePackages";
import { usePackagesByStatus } from "@/hooks/usePackagesByStatus";
import { PackageStatus } from "@/types/PackageStatus";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Pantalla principal con tabs para paquetes pendientes, en tránsito y entregados
export default function HomeScreen() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<PackageStatus>("PENDING");
  const { packages, fetchPackages } = usePackages(user?.id);
  const pendingPackages = usePackagesByStatus(packages, "PENDING");
  const inTransitPackages = usePackagesByStatus(packages, "IN_TRANSIT");
  const deliveredPackages = usePackagesByStatus(packages, "DELIVERED");

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <HomeHeader />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <PackageProgress
          delivered={deliveredPackages.length}
          total={
            pendingPackages.length +
            inTransitPackages.length +
            deliveredPackages.length
          }
        />

        <PackageTabs
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          pendingCount={pendingPackages.length}
          inTransitCount={inTransitPackages.length}
          deliveredCount={deliveredPackages.length}
        />

        {activeTab === "PENDING" &&
          pendingPackages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg} // <-- Le pasás el paquete entero de la iteración
              onRefresh={fetchPackages} // <-- Le pasás la función de refresco para actualizar la lista después de iniciar el viaje
            />
          ))}

        {activeTab === "IN_TRANSIT" &&
          inTransitPackages.map((pkg) => (
            <InTransitCard key={pkg.id} pkg={pkg} onRefresh={fetchPackages} />
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

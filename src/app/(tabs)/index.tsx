import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CompletedCard } from "../../components/delivery/CompletedCard";
import { DeliveryCard } from "../../components/delivery/DeliveryCard";
import { DeliveryProgress } from "../../components/delivery/DeliveryProgress";
import { DeliveryTabs } from "../../components/delivery/DeliveryTabs";
import { HomeHeader } from "../../components/delivery/HomeHeader";
import { InTransitCard } from "../../components/delivery/InTransitCard";

import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { getPackages, Package } from "../../services/packagesService";

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<
    "pending" | "inTransit" | "delivered"
  >("pending");

  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadPackages() {
    try {
      console.log("1. Iniciando consulta a la API...");

      setLoading(true);
      setError(null);

      const data = await getPackages();

      console.log("2. Respuesta recibida de la API:");
      console.log(data);

      setPackages(data);

      console.log("3. Packages guardados en el estado");
    } catch (error) {
      console.log("4. Error cargando paquetes:");
      console.log(error);

      setError("No se pudieron cargar los paquetes");
    } finally {
      console.log("5. Finalizó loadPackages");
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPackages();
  }, []);

  const pendingPackages = useMemo(() => {
    return packages.filter((pkg) => pkg.status === "PENDING");
  }, [packages]);

  const inTransitPackages = useMemo(() => {
    return packages.filter((pkg) => pkg.status === "IN_TRANSIT");
  }, [packages]);

  const deliveredPackages = useMemo(() => {
    return packages.filter((pkg) => pkg.status === "DELIVERED");
  }, [packages]);

  const deliveredCount = deliveredPackages.length;
  const totalCount = packages.length;

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <HomeHeader />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <DeliveryProgress delivered={4} total={15} />

        <DeliveryTabs activeTab={activeTab} onChangeTab={setActiveTab} />

        {loading && (
          <View style={styles.centerBox}>
            <ActivityIndicator size="large" />
            <Text style={styles.loadingText}>Cargando paquetes...</Text>
          </View>
        )}

        {!loading && error && (
          <View style={styles.centerBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {!loading &&
          !error &&
          activeTab === "pending" &&
          pendingPackages.map((pkg) => (
            <DeliveryCard
              key={pkg.id}
              code={pkg.trackingCode}
              address={pkg.address}
              detail={pkg.recipientName}
              eta="Pendiente"
            />
          ))}

        {!loading &&
          !error &&
          activeTab === "inTransit" &&
          inTransitPackages.map((pkg) => (
            <InTransitCard
              key={pkg.id}
              delivery={{
                id: pkg.id,
                code: pkg.trackingCode,
                address: pkg.address,
                detail: pkg.recipientName,
                eta: "En camino",
                client: pkg.recipientName,
              }}
            />
          ))}

        {!loading &&
          !error &&
          activeTab === "delivered" &&
          deliveredPackages.map((pkg) => (
            <CompletedCard
              key={pkg.id}
              delivery={{
                id: pkg.id,
                code: pkg.trackingCode,
                address: pkg.address,
                detail: pkg.recipientName,
                eta: "Entregado",
                client: pkg.recipientName,
              }}
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

  centerBox: {
    paddingVertical: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: "#6B7280",
  },

  errorText: {
    fontSize: 14,
    color: "#DC2626",
    fontWeight: "600",
  },
});

import { Map } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

type PackageCardProps = {
  trackingCode: string;
  address: string;
  addressDetail: string | null;
};

export function PackageCard({
  trackingCode,
  address,
  addressDetail,
}: PackageCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.trackingCode}>{trackingCode}</Text>
      </View>

      <Text style={styles.address}>{address}</Text>
      {addressDetail && <Text style={styles.detail}>{addressDetail}</Text>}

      <View style={styles.actionsRow}>
        <Pressable style={styles.mapButton}>
          <Map size={21} color="#004A98" strokeWidth={2.2} />
          <Text style={styles.mapButtonText}>Ver Mapa</Text>
        </Pressable>

        <Pressable style={styles.startButton}>
          <Text style={styles.startButtonText}>Iniciar Viaje</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.2,
    borderColor: "#BDC3CE",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 22,
    marginBottom: 24,
    shadowColor: "#000000",
    shadowOpacity: 0.07,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
  },

  cardHeader: {
    marginBottom: 18,
  },

  trackingCode: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1A1D22",
    letterSpacing: 1,
  },

  address: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "800",
    color: "#16181D",
    letterSpacing: 0.4,
    marginBottom: 8,
  },

  detail: {
    fontSize: 17,
    color: "#3F4652",
    letterSpacing: 0.5,
    marginBottom: 28,
  },

  etaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 28,
  },

  actionsRow: {
    flexDirection: "row",
    gap: 12,
  },

  mapButton: {
    flex: 1,
    height: 58,
    borderRadius: 16,
    borderWidth: 1.4,
    borderColor: "#004A98",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  mapButtonText: {
    fontSize: 19,
    fontWeight: "500",
    color: "#004A98",
    letterSpacing: 0.6,
  },

  startButton: {
    flex: 1,
    height: 58,
    borderRadius: 16,
    backgroundColor: "#DDE8F8",
    alignItems: "center",
    justifyContent: "center",
  },

  startButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#586473",
    letterSpacing: 0.5,
  },
});

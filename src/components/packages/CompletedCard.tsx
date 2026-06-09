import type { Package } from "@/types/domain/Package";
import { formatTime } from "@/utils/dateUtils";
import { User } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

type CompletedCardProps = {
  pkg: Package;
};

export function CompletedCard({ pkg }: CompletedCardProps) {
  return (
    <View style={styles.completedCard}>
      <View style={styles.completedTop}>
        <Text style={styles.completedCode}>{pkg.trackingCode}</Text>

        <View style={styles.completedBadge}>
          <Text style={styles.completedBadgeText}>Entregado</Text>
        </View>
      </View>

      <Text style={styles.completedAddress}>{pkg.address}</Text>
      {pkg.addressDetail && (
        <Text style={styles.completedDetail}>{pkg.addressDetail}</Text>
      )}

      <View style={styles.clientBox}>
        <User size={22} color="#5C6470" strokeWidth={2} />
        <Text style={styles.clientText}>
          Cliente: <Text style={styles.clientName}>{pkg.recipientName}</Text>
        </Text>
      </View>

      <Text style={styles.deliveredAt}>
        Entregado a las {formatTime(pkg.deliveredAt)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  completedCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.2,
    borderColor: "#BDC3CE",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 22,
    marginBottom: 24,
  },

  completedTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  completedCode: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1A1D22",
    letterSpacing: 1,
  },

  completedBadge: {
    height: 34,
    paddingHorizontal: 16,
    borderRadius: 18,
    backgroundColor: "#DFF4E5",
    alignItems: "center",
    justifyContent: "center",
  },

  completedBadgeText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1F7A3D",
  },

  completedAddress: {
    fontSize: 25,
    lineHeight: 31,
    fontWeight: "800",
    color: "#16181D",
    marginBottom: 8,
  },

  completedDetail: {
    fontSize: 16,
    color: "#3F4652",
    marginBottom: 20,
  },

  clientBox: {
    minHeight: 46,
    borderWidth: 1,
    borderColor: "#C9CDD5",
    borderRadius: 12,
    backgroundColor: "#F2F2F6",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    gap: 10,
    marginBottom: 18,
  },

  clientText: {
    flex: 1,
    fontSize: 15,
    color: "#5A6270",
    letterSpacing: 0.3,
  },

  clientName: {
    fontWeight: "800",
    color: "#1E2228",
  },

  deliveredAt: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F7A3D",
  },
});
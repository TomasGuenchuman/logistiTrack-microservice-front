import { Package } from "@/types/Package";
import {
  AlertTriangle,
  Circle,
  Map,
  MapPin,
  Phone,
  QrCode,
  User,
} from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

type InTransitCardProps = {
  pkg: Package;
};

export function InTransitCard({ pkg }: InTransitCardProps) {
  return (
    <View style={styles.inTransitCard}>
      <View style={styles.inTransitTop}>
        <View style={styles.codeRow}>
          <Circle size={14} color="#004A98" strokeWidth={2.5} />
          <Text style={styles.inTransitCode}>{pkg.trackingCode}</Text>
        </View>

        <View style={styles.inTransitBadge}>
          <Text style={styles.inTransitBadgeText}>En Tránsito</Text>
        </View>
      </View>

      <View style={styles.inTransitBody}>
        <View style={styles.addressBlock}>
          <MapPin size={27} color="#004A98" strokeWidth={2.4} />

          <View style={styles.addressInfo}>
            <Text style={styles.inTransitAddress}>{pkg.address}</Text>
            {pkg.address_detail && (
              <Text style={styles.inTransitDetail}>{pkg.address_detail}</Text>
            )}
          </View>
        </View>

        <View style={styles.clientBox}>
          <User size={20} color="#5C6470" strokeWidth={2} />
          <Text style={styles.clientText}>
            Cliente: <Text style={styles.clientName}>{pkg.recipientName}</Text>
          </Text>
        </View>

        <View style={styles.inTransitActions}>
          <Pressable style={styles.secondaryActionButton}>
            <Map size={20} color="#4B5563" strokeWidth={2} />
            <Text style={styles.secondaryActionText}>Ver Mapa</Text>
          </Pressable>

          <Pressable style={styles.secondaryActionButton}>
            <Phone size={20} color="#4B5563" strokeWidth={2} />
            <Text style={styles.secondaryActionText}>Llamar</Text>
          </Pressable>
        </View>
      </View>

      <Pressable style={styles.scanDeliveryButton}>
        <QrCode size={25} color="#FFFFFF" strokeWidth={2.2} />
        <Text style={styles.scanDeliveryText}>ESCANEAR QR / ENTREGAR</Text>
      </Pressable>

      <Pressable style={styles.reportButton}>
        <AlertTriangle size={19} color="#555B65" strokeWidth={2} />
        <Text style={styles.reportText}>Reportar Problema o Incidencia</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  inTransitCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.1,
    borderColor: "#BDC3CE",
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 22,
    shadowColor: "#000000",
    shadowOpacity: 0.06,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
  },

  inTransitTop: {
    minHeight: 54,
    paddingHorizontal: 14,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#D1D5DB",
    gap: 8,
  },

  codeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    flexShrink: 1,
  },

  inTransitCode: {
    fontSize: 15,
    fontWeight: "800",
    color: "#003F85",
    letterSpacing: 0.7,
  },

  inTransitBadge: {
    height: 30,
    paddingHorizontal: 12,
    borderRadius: 15,
    backgroundColor: "#0059B8",
    alignItems: "center",
    justifyContent: "center",
  },

  inTransitBadgeText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },

  inTransitBody: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 18,
  },

  addressBlock: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 16,
  },

  addressInfo: {
    flex: 1,
    minWidth: 0,
  },

  inTransitAddress: {
    fontSize: 25,
    lineHeight: 31,
    fontWeight: "800",
    color: "#15171B",
    letterSpacing: 0.2,
    marginBottom: 6,
  },

  inTransitDetail: {
    fontSize: 15,
    color: "#3D444F",
    letterSpacing: 0.3,
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

  inTransitActions: {
    flexDirection: "row",
    gap: 12,
  },

  secondaryActionButton: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    backgroundColor: "#DDE8F8",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  secondaryActionText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#4B5563",
    letterSpacing: 0.3,
  },

  scanDeliveryButton: {
    height: 58,
    backgroundColor: "#102B8C",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },

  scanDeliveryText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.8,
  },

  reportButton: {
    minHeight: 52,
    backgroundColor: "#F7F7FB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 12,
  },

  reportText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#555B65",
    letterSpacing: 0.3,
  },
});

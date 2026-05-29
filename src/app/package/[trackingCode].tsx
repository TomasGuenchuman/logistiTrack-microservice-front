import { router, useLocalSearchParams } from "expo-router";
import {
  Check,
  MapPin,
  PackageCheck,
  ShieldCheck,
  User,
  X,
} from "lucide-react-native";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type PackageDetail = {
  trackingCode: string;
  packageType: string;
  recipientName: string;
  recipientPhone: string;
  address: string;
  addressReference: string;
  content: string;
  tags: string;
  priority: string;
  reference: string;
};

const { width } = Dimensions.get("window");

const HORIZONTAL_PADDING = 20;
const CARD_GAP = 14;
const DETAIL_CARD_WIDTH = (width - HORIZONTAL_PADDING * 2 - CARD_GAP) / 2;

const isSmallScreen = width < 380;

export default function PackageTrackingScreen() {
  const params = useLocalSearchParams<{
    trackingCode?: string;
  }>();

  const trackingCode = params.trackingCode ?? "#QR-99283-GT";

  const packageData: PackageDetail = {
    trackingCode,
    packageType: "Caja Mediana (3.5 kg)",
    recipientName: "Juan Pérez",
    recipientPhone: "+54 2901 42-XXXX",
    address: "Av. San Martín 450, Piso 2",
    addressReference: "(Cerca de Plaza Cívica)",
    content: "Electrónicos",
    tags: "⚠️ FRÁGIL",
    priority: "Alta ⏳",
    reference: "#ENV-1004",
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Pressable
            style={styles.exitIconButton}
            onPress={() => router.back()}
          >
            <X size={24} color="#374151" strokeWidth={2.5} />
          </Pressable>
          <View style={styles.headerLeft}>
            <View style={styles.headerCheck}>
              <Check size={21} color="#004B43" strokeWidth={3} />
            </View>

            <Text style={styles.headerTitle}>VALIDACIÓN DE PAQUETE</Text>
          </View>
        </View>

        <View style={styles.confirmCard}>
          <ShieldCheck size={24} color="#004B43" />
          <Text style={styles.confirmText}>
            ✅ Código de Rastreo Confirmado
          </Text>
        </View>

        <View style={styles.mainCard}>
          <View style={styles.trackingHeader}>
            <View style={styles.trackingContent}>
              <Text style={styles.trackingTitle}>
                Rastreo: {packageData.trackingCode}
              </Text>
              <Text style={styles.packageType}>
                Tipo de Paquete: Caja{"\n"}Mediana (3.5 kg)
              </Text>
            </View>

            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedBadgeText}>VERIFICADO</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.recipientRow}>
            <View style={styles.userIconBox}>
              <User size={28} color="#111827" />
            </View>

            <View>
              <Text style={styles.recipientName}>
                {packageData.recipientName}
              </Text>
              <Text style={styles.recipientPhone}>
                {packageData.recipientPhone}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.addressRow}>
            <MapPin size={28} color="#004A98" />

            <View style={styles.addressContent}>
              <Text style={styles.addressText}>{packageData.address}</Text>
              <Text style={styles.addressReference}>
                {packageData.addressReference}
              </Text>
            </View>
          </View>

          <View style={styles.mapBox}>
            <View style={styles.mapGrid}>
              <View style={styles.mapPinContainer}>
                <MapPin size={80} color="#004A98" fill="#9CA3AF" />
              </View>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>DETALLES DEL PAQUETE</Text>

        <View style={styles.detailsGrid}>
          <DetailCard label="CONTENIDO" value={packageData.content} />

          <DetailCard label="ETIQUETAS" value={packageData.tags} danger />

          <DetailCard label="PRIORIDAD" value={packageData.priority} />

          <DetailCard label="REFERENCIA" value={packageData.reference} />
        </View>

        <Pressable style={styles.primaryButton}>
          <PackageCheck size={28} color="#FFFFFF" />
          <Text style={styles.primaryButtonText}>AGREGAR A MI RUTA</Text>
        </Pressable>

        <Pressable style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>
            Reportar Problema con el paquete
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

type DetailCardProps = {
  label: string;
  value: string;
  danger?: boolean;
};

function DetailCard({ label, value, danger }: DetailCardProps) {
  return (
    <View style={[styles.detailCard, danger && styles.detailCardDanger]}>
      <Text style={[styles.detailLabel, danger && styles.detailLabelDanger]}>
        {label}
      </Text>

      <Text style={[styles.detailValue, danger && styles.detailValueDanger]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F7FA",
  },

  scrollContent: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingBottom: 120,
  },

  header: {
    minHeight: 72,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#D1D5DB",
    marginHorizontal: -HORIZONTAL_PADDING,
    paddingHorizontal: HORIZONTAL_PADDING,
    marginBottom: 20,
  },

  headerLeft: {
    flexDirection: "row-reverse",
    alignItems: "center",
    flex: 1,
  },

  headerCheck: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: "#004B43",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },

  headerTitle: {
    fontSize: isSmallScreen ? 18 : 21,
    fontWeight: "900",
    color: "#073B78",
    letterSpacing: 1,
    flexShrink: 1,
    textAlign: "center",
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    borderColor: "#073B78",
  },

  confirmCard: {
    minHeight: 68,
    borderRadius: 16,
    backgroundColor: "#A8ECEA",
    borderWidth: 1,
    borderColor: "#54C4C0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },

  confirmText: {
    fontSize: isSmallScreen ? 16 : 18,
    fontWeight: "900",
    color: "#081018",
    flexShrink: 1,
  },

  mainCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "#C8CEDA",
    padding: isSmallScreen ? 16 : 18,
    marginBottom: 24,
  },

  trackingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  trackingContent: {
    flex: 1,
    paddingRight: 12,
  },

  trackingTitle: {
    fontSize: isSmallScreen ? 18 : 20,
    fontWeight: "900",
    color: "#073B78",
    marginBottom: 6,
    flexShrink: 1,
  },

  packageType: {
    fontSize: isSmallScreen ? 17 : 19,
    color: "#2F343B",
    lineHeight: isSmallScreen ? 25 : 28,
    letterSpacing: 0.8,
  },

  verifiedBadge: {
    backgroundColor: "#E5EEFF",
    paddingHorizontal: 22,
    paddingVertical: 9,
    borderRadius: 20,
    marginTop: 0,
  },

  verifiedBadgeText: {
    fontSize: 15,
    fontWeight: "900",
    color: "#073B78",
    letterSpacing: 1,
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 18,
  },

  recipientRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  userIconBox: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#DEE9FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 22,
  },

  recipientName: {
    fontSize: isSmallScreen ? 18 : 20,
    fontWeight: "600",
    color: "#111111",
    marginBottom: 5,
  },

  recipientPhone: {
    fontSize: isSmallScreen ? 14 : 16,
    color: "#1F2937",
    letterSpacing: 1,
  },

  addressRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 18,
    marginBottom: 16,
  },

  addressContent: {
    flex: 1,
  },

  addressText: {
    fontSize: isSmallScreen ? 17 : 19,
    fontWeight: "900",
    color: "#101010",
    marginBottom: 5,
    letterSpacing: 0.5,
  },

  addressReference: {
    fontSize: isSmallScreen ? 14 : 16,
    color: "#111827",
    letterSpacing: 0.8,
  },

  mapBox: {
    height: isSmallScreen ? 145 : 165,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#9CA3AF",
  },

  mapGrid: {
    flex: 1,
    backgroundColor: "#A3A3A3",
    justifyContent: "center",
    alignItems: "center",
  },

  mapPinContainer: {
    transform: [{ translateY: -6 }],
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: "900",
    color: "#374151",
    letterSpacing: 1.5,
    marginBottom: 22,
    marginLeft: 6,
  },

  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: CARD_GAP,
    rowGap: 14,
    marginBottom: 28,
  },

  detailCard: {
    width: DETAIL_CARD_WIDTH,
    minHeight: isSmallScreen ? 96 : 108,
    backgroundColor: "#FBFBFD",
    borderRadius: 16,
    borderWidth: 1.2,
    borderColor: "#D9DCE5",
    padding: isSmallScreen ? 16 : 18,
    justifyContent: "center",
  },

  detailCardDanger: {
    borderColor: "#ECA9A9",
    backgroundColor: "#FFFDFD",
  },

  detailLabel: {
    fontSize: isSmallScreen ? 12 : 14,
    color: "#374151",
    letterSpacing: 1,
    marginBottom: 10,
  },

  detailLabelDanger: {
    color: "#7F1D1D",
  },

  detailValue: {
    fontSize: isSmallScreen ? 18 : 21,
    color: "#111111",
    fontWeight: "400",
  },

  detailValueDanger: {
    color: "#B91C1C",
    fontWeight: "900",
  },

  primaryButton: {
    minHeight: 64,
    borderRadius: 14,
    backgroundColor: "#004B43",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 16,
    paddingHorizontal: 16,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: isSmallScreen ? 17 : 19,
    fontWeight: "900",
    letterSpacing: 0.8,
  },

  secondaryButton: {
    minHeight: 62,
    borderRadius: 16,
    backgroundColor: "#E6E7EA",
    borderWidth: 1,
    borderColor: "#CFD2D8",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },

  secondaryButtonText: {
    fontSize: isSmallScreen ? 16 : 18,
    color: "#374151",
    letterSpacing: 0.5,
    textAlign: "center",
  },

  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 92,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 8,
  },

  bottomItem: {
    alignItems: "center",
    justifyContent: "center",
    width: 110,
  },

  bottomItemText: {
    marginTop: 7,
    fontSize: 16,
    color: "#374151",
    letterSpacing: 1,
  },

  scanTab: {
    width: 82,
    height: 62,
    borderRadius: 35,
    backgroundColor: "#E1ECFF",
    alignItems: "center",
    justifyContent: "center",
  },

  scanTabText: {
    marginTop: 4,
    fontSize: 15,
    color: "#6B7280",
  },
  exitIconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
});

import {
  Archive,
  CalendarDays,
  ChevronRight,
  MapPin,
  Package,
  Route,
  Truck,
} from "lucide-react-native";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type DeliveryStatus = "Out for Delivery" | "In Transit";

type DeliveryCardProps = {
  code: string;
  address: string;
  detail: string;
  eta: string;
  status: DeliveryStatus;
  active?: boolean;
};

function DeliveryCard({
  code,
  address,
  detail,
  eta,
  status,
  active = false,
}: DeliveryCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <View style={styles.packageInfo}>
          {active ? (
            <Package size={23} color="#0B5EA8" strokeWidth={2.2} />
          ) : (
            <Archive size={24} color="#343A40" strokeWidth={2.1} />
          )}

          <Text style={styles.packageCode} numberOfLines={1}>
            {code}
          </Text>
        </View>

        <View style={[styles.badge, active && styles.activeBadge]}>
          {active ? (
            <Truck size={14} color="#59616B" strokeWidth={2} />
          ) : (
            <Route size={14} color="#343A40" strokeWidth={2} />
          )}

          <Text style={styles.badgeText} numberOfLines={1}>
            {status}
          </Text>
        </View>
      </View>

      <View style={styles.addressRow}>
        <MapPin size={25} color="#343A40" strokeWidth={2} />

        <View style={styles.addressContent}>
          <Text style={styles.address} numberOfLines={1}>
            {address}
          </Text>

          <Text style={styles.detail} numberOfLines={1}>
            {detail}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.cardFooter}>
        <Text style={styles.eta}>ETA: {eta}</Text>

        {active ? (
          <Pressable style={styles.detailsButton}>
            <Text style={styles.detailsButtonText}>View Details</Text>
          </Pressable>
        ) : (
          <ChevronRight size={28} color="#343A40" strokeWidth={2.2} />
        )}
      </View>
    </View>
  );
}

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.topBar}>
        <View style={styles.logoRow}>
          <Truck size={28} color="#064B7D" strokeWidth={2.3} />
          <Text style={styles.logoText}>LogistiTrack</Text>
        </View>

        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200",
          }}
          style={styles.avatar}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Pending Deliveries</Text>

          <View style={styles.subtitleRow}>
            <CalendarDays size={20} color="#343A40" strokeWidth={2} />
            <Text style={styles.subtitle}>Today • 3 Active Routes</Text>
          </View>
        </View>

        <DeliveryCard
          code="#TRK-8492"
          address="1042 Industrial Parkway"
          detail="Dock 4, South Entrance"
          eta="14:30"
          status="Out for Delivery"
          active
        />

        <DeliveryCard
          code="#TRK-2104"
          address="885 Logistics Blvd"
          detail="Main Reception"
          eta="16:00"
          status="In Transit"
        />

        <DeliveryCard
          code="#TRK-9331"
          address="500 Corporate Way"
          detail="Suite 200"
          eta="17:15"
          status="In Transit"
        />

        <DeliveryCard
          code="#TRK-9331"
          address="500 Corporate Way"
          detail="Suite 200"
          eta="17:15"
          status="In Transit"
        />

        <DeliveryCard
          code="#TRK-9331"
          address="500 Corporate Way"
          detail="Suite 200"
          eta="17:15"
          status="In Transit"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7FA",
  },

  topBar: {
    height: 82,
    paddingHorizontal: 20,
    paddingTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#C9CDD3",
  },

  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  logoText: {
    fontSize: 26,
    fontWeight: "700",
    color: "#064B7D",
    letterSpacing: 0.3,
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "#8B949E",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 34,
    paddingBottom: 130,
  },

  header: {
    marginBottom: 28,
  },

  title: {
    fontSize: 33,
    fontWeight: "300",
    color: "#111111",
    letterSpacing: 0.8,
    marginBottom: 10,
  },

  subtitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  subtitle: {
    fontSize: 18,
    color: "#2F343A",
    letterSpacing: 1,
  },

  card: {
    backgroundColor: "#F7F7FA",
    borderWidth: 1.2,
    borderColor: "#C2C4C8",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 18,
    marginBottom: 20,
  },

  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 20,
  },

  packageInfo: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  packageCode: {
    flexShrink: 1,
    fontSize: 21,
    fontWeight: "800",
    color: "#1B1D21",
    letterSpacing: 0.8,
  },

  badge: {
    flexShrink: 0,
    maxWidth: 145,
    minHeight: 32,
    paddingHorizontal: 10,
    borderRadius: 16,
    backgroundColor: "#E9EAEC",
    borderWidth: 1,
    borderColor: "#C5C7CB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },

  activeBadge: {
    backgroundColor: "#E7EDF6",
    borderColor: "#E7EDF6",
  },

  badgeText: {
    flexShrink: 1,
    fontSize: 13,
    color: "#4A5058",
    letterSpacing: 0.2,
  },

  addressRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 18,
  },

  addressContent: {
    flex: 1,
    minWidth: 0,
  },

  address: {
    fontSize: 19,
    fontWeight: "400",
    color: "#17191D",
    letterSpacing: 0.3,
    marginBottom: 4,
  },

  detail: {
    fontSize: 15,
    color: "#2F343A",
    letterSpacing: 0.4,
  },

  divider: {
    height: 1,
    backgroundColor: "#C2C4C8",
    marginBottom: 12,
  },

  cardFooter: {
    minHeight: 46,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  eta: {
    fontSize: 18,
    color: "#064B7D",
    letterSpacing: 0.6,
  },

  detailsButton: {
    height: 44,
    minWidth: 138,
    borderRadius: 22,
    backgroundColor: "#005DA8",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
  },

  detailsButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
    letterSpacing: 0.4,
  },
});

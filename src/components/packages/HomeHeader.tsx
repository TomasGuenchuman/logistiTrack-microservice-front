import { Truck } from "lucide-react-native";
import { Image, StyleSheet, Text, View } from "react-native";

export function HomeHeader() {
  return (
    <View style={styles.topBar}>
      <View style={styles.logoRow}>
        <Truck size={26} color="#004A98" strokeWidth={2.2} />
        <Text style={styles.logoText}>LogistiTrack</Text>
      </View>

      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200",
        }}
        style={styles.avatar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    height: 72,
    paddingHorizontal: 20,
    paddingTop: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#C4C8D0",
    backgroundColor: "#F7F7FB",
  },

  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  logoText: {
    fontSize: 27,
    fontWeight: "700",
    color: "#004A98",
    letterSpacing: 0.2,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#D4D7DE",
  },
});
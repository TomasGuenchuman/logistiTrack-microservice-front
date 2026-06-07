import { DimensionValue, StyleSheet, Text, View } from "react-native";

type PackageProgressProps = {
  delivered: number;
  total: number;
};

// Componente de progreso del día, mostrando porcentaje y cantidad entregada
export function PackageProgress({ delivered, total }: PackageProgressProps) {
  const progress: DimensionValue = `${(delivered / total) * 100}%`;

  return (
    <>
      <View style={styles.progressHeader}>
        <Text style={styles.progressTitle}>Progreso del Día</Text>
        <Text style={styles.progressAmount}>
          Progreso: {delivered} /{total} Entregados
        </Text>
      </View>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: progress }]} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  progressTitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#14161A",
    letterSpacing: 0.4,
  },

  progressAmount: {
    fontSize: 14,
    fontWeight: "700",
    color: "#004A98",
    letterSpacing: 0.6,
  },

  progressTrack: {
    height: 10,
    borderRadius: 20,
    backgroundColor: "#E3E3E8",
    overflow: "hidden",
    marginBottom: 42,
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#004A98",
    borderRadius: 20,
  },
});
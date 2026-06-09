import { CheckCircle2 } from "lucide-react-native";
import React from "react";
import { DimensionValue, StyleSheet, Text, View } from "react-native";

type PackageProgressProps = {
  delivered: number;
  total: number;
};

export function PackageProgress({ delivered, total }: PackageProgressProps) {
  // 1. Protección contra división por cero (si total es 0, el progreso es 0%)
  const percentage = total > 0 ? Math.round((delivered / total) * 100) : 0;
  
  // 2. Formateo de ancho seguro para los estilos nativos
  const progressWidth: DimensionValue = `${percentage}%`;

  // 3. Toque dinámico: Cambia el color si ya completó el 100% de los paquetes del día
  const isFinished = percentage === 100 && total > 0;
  const activeColor = isFinished ? "#10B981" : "#004A98"; // Verde éxito o el azul corporativo

  return (
    <View style={styles.container}>
      <View style={styles.progressHeader}>
        <View style={styles.titleRow}>
          <Text style={styles.progressTitle}>Progreso del Día</Text>
          {isFinished && <CheckCircle2 size={16} color="#10B981" strokeWidth={2.5} />}
        </View>
        <Text style={[styles.progressPercentage, { color: activeColor }]}>
          {percentage}%
        </Text>
      </View>

      {/* Barra de progreso */}
      <View style={styles.progressTrack}>
        <View 
          style={[
            styles.progressFill, 
            { 
              width: progressWidth, 
              backgroundColor: activeColor 
            }
          ]} 
        />
      </View>

      {/* Contador secundario informativo */}
      <View style={styles.footerRow}>
        <Text style={styles.progressAmount}>
          Entregados: <Text style={styles.boldText}>{delivered}</Text> de <Text style={styles.boldText}>{total}</Text>
        </Text>
        <Text style={styles.remainingText}>
          {total - delivered === 0 ? "¡Ruta completada!" : `${total - delivered} pendientes`}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    // Sombreado limpio para que resalte en la Home como una tarjeta de control
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  progressTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#334155", // Tono slate intermedio, más moderno que el negro puro
    letterSpacing: 0.2,
  },

  progressPercentage: {
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  progressTrack: {
    height: 12, // Un toque más gruesa para que se aprecie mejor en pantallas de alta densidad
    borderRadius: 6,
    backgroundColor: "#F1F5F9",
    overflow: "hidden",
    marginBottom: 12,
  },

  progressFill: {
    height: "100%",
    borderRadius: 6,
  },

  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  progressAmount: {
    fontSize: 13,
    color: "#64748B",
  },

  boldText: {
    fontWeight: "700",
    color: "#0F172A",
  },

  remainingText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#64748B",
  },
});
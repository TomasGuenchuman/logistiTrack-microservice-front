import { packageService } from "@/services/index";
import { Package } from "@/types/domain/Package";
import {
  openMapWithAddress,
  openMapWithInstructions,
} from "@/utils/navigationUtils"; // Importamos la función centralizada para abrir el mapa
import { Map } from "lucide-react-native";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

// Componente de tarjeta de paquete con acciones para ver mapa e iniciar viaje
type PackageCardProps = {
  pkg: Package;
  onRefresh?: () => void; // Función opcional para refrescar la lista después de iniciar el viaje
};

export function PackageCard({ pkg, onRefresh }: PackageCardProps) {
  const [loading, setLoading] = useState(false);

  // ACCIÓN DEL BOTÓN VER MAPA: Solo ver el pin
  const handleOpenMap = () => {
    openMapWithAddress(pkg.address);
  };

  // ACCIÓN DEL BOTÓN INICIAR VIAJE: Cambia estado + GPS con ruta
  const handleStartTrip = async () => {
    try {
      setLoading(true); // Iniciamos el estado de carga para este paquete específico

      // 1. Cambiamos el estado en la arquitectura (Mocks/API)
      await packageService.updatePackage(pkg.id, { status: "IN_TRANSIT" });

      onRefresh?.(); // Refrescamos la lista de paquetes en la pantalla principal, si se proporcionó la función

      // 2. Lanzamos el modo indicaciones directo
      openMapWithInstructions(pkg.address);
    } catch (error) {
      console.error("Error al iniciar viaje:", error);
      alert("No se pudo procesar el inicio de viaje.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.trackingCode}>{pkg.trackingCode}</Text>
      </View>

      <Text style={styles.address}>{pkg.address}</Text>
      {pkg.addressDetail && (
        <Text style={styles.detail}>{pkg.addressDetail}</Text>
      )}

      <View style={styles.actionsRow}>
        {/* BOTÓN VER MAPA */}
        <Pressable style={styles.mapButton} onPress={handleOpenMap}>
          <Map size={21} color="#004A98" strokeWidth={2.2} />
          <Text style={styles.mapButtonText}>Ver Mapa</Text>
        </Pressable>

        {/* BOTÓN INICIAR VIAJE CON INDICADOR DE CARGA */}
        <Pressable
          style={[styles.startButton, loading && { opacity: 0.7 }]} // Aplicamos un estilo de opacidad cuando está cargando
          onPress={handleStartTrip}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#004A98" />
          ) : (
            <Text style={styles.startButtonText}>Iniciar Viaje</Text>
          )}
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

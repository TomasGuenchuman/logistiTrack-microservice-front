import { Package } from "@/types/domain/Package";
import { openMapWithAddress } from "@/utils/navigationUtils";
import { AlertTriangle, Circle, Map, MapPin, Phone, QrCode, User } from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { DeliverySignatureModal } from "./modals/DeliverySignatureModal";
import { IncidentModal } from "./modals/IncidentModal";

type InTransitCardProps = {
  pkg: Package;
  onRefresh: () => void; // Callback opcional para avisarle a la pantalla madre que refresque datos después de una entrega
};

export function InTransitCard({ pkg, onRefresh }: InTransitCardProps) {
  // 2. Definimos el estado para controlar la visibilidad del modal de firma
  const [modalVisible, setModalVisible] = useState(false);
  const [incidentModalVisible, setIncidentModalVisible] = useState(false);

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
            {pkg.addressDetail && (
              <Text style={styles.inTransitDetail}>{pkg.addressDetail}</Text>
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
          <Pressable style={styles.secondaryActionButton} onPress={() => openMapWithAddress(pkg.address)}>
            <Map size={20} color="#4B5563" strokeWidth={2} />
            <Text style={styles.secondaryActionText}>Ver Mapa</Text>
          </Pressable>

          <Pressable style={styles.secondaryActionButton}>
            <Phone size={20} color="#4B5563" strokeWidth={2} />
            <Text style={styles.secondaryActionText}>Llamar</Text>
          </Pressable>
        </View>
      </View>

      {/* 3. Agregamos el onPress para abrir el modal */}
      <Pressable 
        style={styles.scanDeliveryButton} 
        onPress={() => setModalVisible(true)}
      >
        <QrCode size={25} color="#FFFFFF" strokeWidth={2.2} />
        <Text style={styles.scanDeliveryText}>ENTREGAR</Text>
      </Pressable>

      {/* 3. ENGANCHAMOS EL ONPRESS PARA INCIDENCIAS */}
      {/* Botón de Reportar Incidencia*/}
      <Pressable style={styles.reportButton} onPress={() => setIncidentModalVisible(true)}>
      <AlertTriangle size={20} color="#78350F" strokeWidth={2.2} /><Text style={styles.reportText}>Reportar Problema o Incidencia</Text>
      </Pressable>

      {/* 4. Renderizamos el modal desacoplado al final de la tarjeta */}
      <DeliverySignatureModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        packageId={pkg.id}
        trackingCode={pkg.trackingCode}
        onSuccess={onRefresh}
      />

      {/* 4. INYECTAMOS EL MODAL DE INCIDENCIAS AL FINAL */}
      <IncidentModal
        visible={incidentModalVisible}
        onClose={() => setIncidentModalVisible(false)}
        packageId={pkg.id}
        trackingCode={pkg.trackingCode}
        onSuccess={onRefresh} // Mismo cable reactivo para refrescar la Home al toque
      />

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
    height: 54,
    backgroundColor: "#FEF3C7", // Un fondo amarillo/ámbar suave (Amber 100)
    borderBottomLeftRadius: 18,  // Mantiene la armonía con las esquinas de tu tarjeta
    borderBottomRightRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: "#FDE68A", // Una pequeña línea divisoria sutil
  },

  reportText: {
    fontSize: 15,
    fontWeight: "700", // Le subimos a 700 para que tenga más carácter y legibilidad
    color: "#78350F",  // Texto en marrón/ámbar oscuro (Amber 900) para un contraste perfecto
    letterSpacing: 0.4,
  },
});
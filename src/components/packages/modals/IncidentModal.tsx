import { packageService } from "@/services/index";
import { X } from "lucide-react-native";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type IncidentModalProps = {
  visible: boolean;
  onClose: () => void;
  packageId: string;
  trackingCode: string;
  onSuccess: () => void;
};

// Tipos comunes de problemas de campo
const INCIDENT_TYPES = [
  { id: "DIRECCION_INCORRECTA", label: "Dirección incorrecta o inexistente" },
  { id: "CLIENTE_AUSENTE", label: "Cliente ausente / No atiende" },
  { id: "ZONA_INACCESIBLE", label: "Zona inaccesible o peligrosa" },
  { id: "PAQUETE_DANADO", label: "Paquete dañado o con faltantes" },
  { id: "OTRO", label: "Otro motivo (Especificar abajo)" },
];

export function IncidentModal({ visible, onClose, packageId, trackingCode, onSuccess }: IncidentModalProps) {
  const [selectedType, setSelectedType] = useState("");
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConfirmIncident = async () => {
    if (!selectedType) {
      Alert.alert("Atención", "Por favor, seleccione el tipo de incidencia.");
      return;
    }
    if (selectedType === "OTRO" && !comments.trim()) {
      Alert.alert("Atención", "Por favor, detalle el motivo en los comentarios.");
      return;
    }

    try {
      setLoading(true);

      // Impactamos el MockPackageService 
      // Podés pasar el estado a "INCIDENT" o el que defina tu regla de negocio
      await packageService.updatePackage(packageId, {
        status: "PENDING", // Lo devolvemos a pendientes o a un estado específico de revisión
        // Campos preparados para cuando escalen el modelo en Django:
        // incidentType: selectedType,
        // incidentComments: comments,
      });

      // Notificamos de forma reactiva antes de cerrar
      onSuccess();
      onClose();

      Alert.alert("Incidencia Registrada", `Se reportó el problema para el paquete ${trackingCode}.`);
      
      // Limpiamos formulario
      setSelectedType("");
      setComments("");
    } catch (error) {
      console.error("Error al registrar incidencia:", error);
      Alert.alert("Error", "No se pudo registrar la incidencia.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.modalContainer}>
        {/* Header */}
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Reportar Incidencia</Text>
          <Pressable onPress={onClose} style={styles.closeBtn}>
            <X size={24} color="#0F172A" />
          </Pressable>
        </View>

        <Text style={styles.modalSubtitle}>Paquete: {trackingCode}</Text>

        {/* Listado de Opciones */}
        <View style={styles.section}>
          <Text style={styles.label}>Seleccione el motivo *</Text>
          {INCIDENT_TYPES.map((type) => (
            <Pressable
              key={type.id}
              style={[
                styles.optionRow,
                selectedType === type.id && styles.optionRowSelected
              ]}
              onPress={() => setSelectedType(type.id)}
            >
              <View style={[styles.radio, selectedType === type.id && styles.radioSelected]} />
              <Text style={[styles.optionText, selectedType === type.id && styles.optionTextSelected]}>
                {type.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Comentarios Adicionales */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Observaciones o comentarios adicionales</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Escriba detalles del problema encontrado en la recorrida..."
            multiline
            numberOfLines={4}
            value={comments}
            onChangeText={setComments}
          />
        </View>

        {/* Acciones */}
        <View style={styles.modalActions}>
          <Pressable style={styles.cancelBtn} onPress={onClose}>
            <Text style={styles.cancelBtnText}>Cancelar</Text>
          </Pressable>

          <Pressable style={styles.submitBtn} onPress={handleConfirmIncident} disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.submitBtnText}>Enviar Reporte</Text>
            )}
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: { flex: 1, backgroundColor: "#F7F7FB", paddingHorizontal: 20, paddingTop: 50 },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  modalTitle: { fontSize: 22, fontWeight: "800", color: "#0F172A" },
  closeBtn: { padding: 4 },
  modalSubtitle: { fontSize: 15, color: "#555B65", marginBottom: 20, fontWeight: "600" },
  section: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: "700", color: "#3D444F", marginBottom: 10 },
  optionRow: { flexDirection: "row", alignItems: "center", padding: 14, backgroundColor: "#FFFFFF", borderRadius: 12, marginBottom: 8, borderWidth: 1, borderColor: "#E5E7EB" },
  optionRowSelected: { borderColor: "#004A98", backgroundColor: "#F2F7FD" },
  radio: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: "#9CA3AF", marginRight: 12 },
  radioSelected: { borderColor: "#004A98", backgroundColor: "#004A98" },
  optionText: { fontSize: 14, color: "#3D444F", fontWeight: "500" },
  optionTextSelected: { color: "#003F85", fontWeight: "700" },
  inputGroup: { flex: 1, marginBottom: 20 },
  textArea: { backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#C9CDD5", borderRadius: 12, padding: 12, textAlignVertical: "top", height: 100, fontSize: 15 },
  modalActions: { flexDirection: "row", gap: 12, marginBottom: 30 },
  cancelBtn: { flex: 1, height: 52, borderRadius: 12, backgroundColor: "#E5E7EB", alignItems: "center", justifyContent: "center" },
  cancelBtnText: { color: "#4B5563", fontWeight: "600", fontSize: 15 },
  submitBtn: { flex: 2, height: 52, borderRadius: 12, backgroundColor: "#DC2626", alignItems: "center", justifyContent: "center" },
  submitBtnText: { color: "#FFFFFF", fontWeight: "700", fontSize: 15 }
});
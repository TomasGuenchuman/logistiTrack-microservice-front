import { useAuth } from "@/context/AuthContext";
import { verificationService } from "@/services/index";
import { X } from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import SignatureScreen, {
  SignatureViewRef,
} from "react-native-signature-canvas";

type DeliverySignatureModalProps = {
  visible: boolean;
  onClose: () => void;
  packageId: string;
  trackingCode: string;
  onSuccess?: () => void; // Callback opcional para avisarle a la pantalla madre que refresque datos
};

export function DeliverySignatureModal({
  visible,
  onClose,
  packageId,
  trackingCode,
  onSuccess,
}: DeliverySignatureModalProps) {
  const { user } = useAuth();
  const [dni, setDni] = useState("");
  const [loading, setLoading] = useState(false);
  const signatureRef = useRef<SignatureViewRef>(null);

  // Procesar los datos recopilados e impactar el servicio
  const handleConfirmDelivery = async (signatureBase64: string) => {
    if (!dni.trim() || dni.length < 6) {
      alert("Por favor, ingrese un DNI válido.");
      return;
    }

    try {
      setLoading(true);

      // Capturamos el momento exacto en formato ISO estándar (ej: "2026-06-07T23:01:00.000Z")
      const currentTime = new Date().toISOString();

      await verificationService.createVerification({
        packageId: packageId,
        recipientDni: dni,
        signature: signatureBase64,
        courierId: user?.id || "", // Si está vacío manda un string para evitar fallas del DTO
      });

      alert(`¡Paquete ${trackingCode} entregado con éxito!`);

      // Limpiamos estados locales antes de cerrar
      setDni("");
      signatureRef.current?.clearSignature();

      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.error("Error al finalizar entrega en el modal:", error);
      alert("No se pudo registrar la entrega en este momento.");
    } finally {
      setLoading(false);
    }
  };

  const handleOK = (signature: string) => {
    handleConfirmDelivery(signature);
  };

  const handleEmpty = () => {
    alert("Debe proporcionar una firma para confirmar la entrega.");
  };

  const triggerSignatureSave = () => {
    signatureRef.current?.readSignature();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.modalContainer}>
        {/* Header */}
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Finalizar Entrega</Text>
          <Pressable onPress={onClose} style={styles.closeModalBtn}>
            <X size={24} color="#0F172A" />
          </Pressable>
        </View>

        <Text style={styles.modalSubtitle}>Paquete: {trackingCode}</Text>

        {/* Input DNI */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>DNI de quien recibe *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: 42111333"
            keyboardType="number-pad"
            value={dni}
            onChangeText={setDni}
          />
        </View>

        {/* Lienzo de Firma */}
        <View style={styles.signatureGroup}>
          <Text style={styles.label}>Firma Digital *</Text>
          <View style={styles.signatureWrapper}>
            <SignatureScreen
              ref={signatureRef}
              onOK={handleOK}
              onEmpty={handleEmpty}
              descriptionText="Firme dentro del cuadro"
              clearText="Limpiar"
              confirmText="Confirmar"
              webStyle={`.m-signature-pad--footer { display: none; margin: 0; }`}
            />
          </View>
        </View>

        {/* Botones Inferiores */}
        <View style={styles.modalActions}>
          <Pressable
            style={styles.clearBtn}
            onPress={() => signatureRef.current?.clearSignature()}
          >
            <Text style={styles.clearBtnText}>Borrar Firma</Text>
          </Pressable>

          <Pressable
            style={styles.submitBtn}
            onPress={triggerSignatureSave}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.submitBtnText}>Confirmar Entrega</Text>
            )}
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0F172A",
  },
  modalSubtitle: {
    fontSize: 15,
    color: "#64748B",
    marginBottom: 24,
  },
  closeModalBtn: {
    padding: 4,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 8,
  },
  input: {
    height: 54,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.2,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#0F172A",
  },
  signatureGroup: { flex: 1, marginBottom: 24 },
  signatureWrapper: {
    flex: 1,
    borderWidth: 1.2,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
  },
  modalActions: { flexDirection: "row", gap: 12, paddingBottom: 34 },
  clearBtn: {
    height: 56,
    flex: 1,
    borderRadius: 14,
    borderWidth: 1.4,
    borderColor: "#94A3B8",
    alignItems: "center",
    justifyContent: "center",
  },
  clearBtnText: { fontSize: 16, fontWeight: "600", color: "#475569" },
  submitBtn: {
    height: 56,
    flex: 1,
    borderRadius: 14,
    backgroundColor: "#004A98",
    alignItems: "center",
    justifyContent: "center",
  },
  submitBtnText: { fontSize: 16, fontWeight: "600", color: "#FFFFFF" },
});

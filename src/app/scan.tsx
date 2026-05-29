import { CameraView, useCameraPermissions } from "expo-camera";
import { useFocusEffect, useRouter } from "expo-router";
import { ArrowLeft, Keyboard, ScanLine, Truck, Zap } from "lucide-react-native";
import { useCallback, useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const FRAME_SIZE = width * 0.74;

export default function ScanScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setScanned(false);

      return () => {
        setScanned(false);
      };
    }, []),
  );

  const handleManualEntry = () => {
    console.log("Manual entry");
  };

  const handleQRCodeScanned = ({ data }: { data: string }) => {
    if (scanned) return;

    setScanned(true);
    console.log("QR escaneado:", data);

    router.replace({
      pathname: "/package/[trackingCode]",
      params: {
        trackingCode: data,
      },
    });
  };

  if (!permission) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando cámara...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.permissionContainer}>
        <Truck size={42} color="#0f172a" />

        <Text style={styles.permissionTitle}>Permiso de cámara</Text>

        <Text style={styles.permissionDescription}>
          Necesitamos acceso a la cámara para escanear códigos QR de los
          paquetes.
        </Text>

        <Pressable style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Permitir cámara</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={scanned ? undefined : handleQRCodeScanned}
      />

      <View style={styles.darkOverlay} />

      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color="#0f172a" />
          </Pressable>

          <View style={styles.brandContainer}>
            <Truck size={22} color="#0f172a" strokeWidth={2} />
            <Text style={styles.brandText}>LogistiTrack</Text>
          </View>

          <Pressable style={styles.avatarButton}>
            <Text style={styles.avatarText}>E</Text>
          </Pressable>
        </View>

        <View style={styles.scannerContainer}>
          <Text style={styles.instructionText}>
            Align QR code within the frame
          </Text>

          <View style={styles.scanFrame}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />

            <View style={styles.scanLineContainer}>
              <ScanLine size={42} color="rgba(255,255,255,0.85)" />
            </View>
          </View>
        </View>
      </SafeAreaView>

      <View
        style={[
          styles.actionsContainer,
          {
            bottom: insets.bottom + 28,
          },
        ]}
      >
        <Pressable style={styles.flashButton}>
          <Zap size={24} color="#0f172a" />
        </Pressable>

        <Pressable style={styles.manualButton} onPress={handleManualEntry}>
          <Keyboard size={24} color="#ffffff" />
          <Text style={styles.manualButtonText}>Manual Entry</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
  },

  safeArea: {
    flex: 1,
  },

  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(2, 6, 23, 0.35)",
  },

  header: {
    height: 72,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f8fafc",
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e2e8f0",
  },

  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  brandText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0f172a",
    letterSpacing: 0.4,
  },

  avatarButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: "#94a3b8",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f1f5f9",
  },

  avatarText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#334155",
  },

  scannerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 130,
  },

  instructionText: {
    fontSize: 17,
    fontWeight: "500",
    color: "#ffffff",
    marginBottom: 56,
    letterSpacing: 0.3,
  },

  scanFrame: {
    width: FRAME_SIZE,
    height: FRAME_SIZE,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },

  corner: {
    position: "absolute",
    width: 56,
    height: 56,
    borderColor: "rgba(219, 234, 254, 0.95)",
  },

  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderTopLeftRadius: 10,
  },

  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderTopRightRadius: 10,
  },

  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderBottomLeftRadius: 10,
  },

  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderBottomRightRadius: 10,
  },

  scanLineContainer: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: "rgba(15, 23, 42, 0.18)",
    alignItems: "center",
    justifyContent: "center",
  },

  actionsContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 18,
  },

  flashButton: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#f8fafc",
    alignItems: "center",
    justifyContent: "center",
  },

  manualButton: {
    height: 64,
    paddingHorizontal: 28,
    borderRadius: 32,
    backgroundColor: "#0284c7",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },

  manualButtonText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#ffffff",
  },

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },

  loadingText: {
    fontSize: 16,
    color: "#64748b",
  },

  permissionContainer: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },

  permissionTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0f172a",
    marginTop: 18,
    marginBottom: 8,
  },

  permissionDescription: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
  },

  permissionButton: {
    height: 52,
    paddingHorizontal: 28,
    borderRadius: 26,
    backgroundColor: "#0284c7",
    alignItems: "center",
    justifyContent: "center",
  },

  permissionButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
  },
});

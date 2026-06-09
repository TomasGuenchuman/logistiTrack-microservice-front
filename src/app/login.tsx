import { useState } from "react";
import axios from "axios";
import { API_URLS } from "../api/endpoints";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ArrowRight, LockKeyhole, Mail, Sparkles, Truck } from "lucide-react-native";
import { ImageBackground, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading,setIsLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      alert("Por favor, completá todos los campos.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await axios.post(`${API_URLS.BASE}${API_URLS.AUTH.LOGIN}`, {
        email: email.trim().toLowerCase(),
        password: password
      });

      const { access_token, refresh_token } = response.data;

      await login(access_token, refresh_token);

      router.replace("/(tabs)");

    } catch (error: any) {

      const data = error.response?.data;
      console.log("ERRORES DEL BACKEND:", data);
      
      const mensajeReal = data?.authServiceMessage || data?.message || "Error al intentar iniciar sesión";
      alert(mensajeReal);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ImageBackground
      source={require("../../assets/login-bg.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <View style={styles.container}>
        <View style={styles.card}>
          <Truck size={74} color="#0A376A" strokeWidth={2.4} />

          <Text style={styles.title}>LogistiTrack</Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Email Address</Text>

            <View style={styles.inputContainer}>
              <Mail size={24} color="#4B5563" strokeWidth={1.8} />

              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.passwordHeader}>
            <Text style={styles.label}>Password</Text>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </View>

          <View style={styles.inputContainer}>
            <LockKeyhole size={25} color="#4B5563" strokeWidth={1.8} />

            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <Pressable onPress={handleLogin} style={styles.buttonWrapper}>
            <LinearGradient
              colors={["#0F4D8C", "#07315F"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Login to Portal</Text>
              <ArrowRight size={22} color="#FFFFFF" strokeWidth={2} />
            </LinearGradient>
          </Pressable>

          <Text style={styles.securityText}>
            Your connection is secured with SSL 256-bit encryption.
          </Text>
        </View>
      </View>

      <Sparkles
        size={35}
        color="#FFFFFF"
        strokeWidth={1.8}
        style={styles.sparkle}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(3, 15, 27, 0.45)",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 22,
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 8,
    paddingHorizontal: 28,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.28,
    shadowRadius: 18,
    elevation: 12,
  },

  title: {
    marginTop: 8,
    fontSize: 29,
    fontWeight: "700",
    color: "#082F5F",
    letterSpacing: 0.2,
  },

  subtitle: {
    marginTop: 10,
    marginBottom: 12,
    textAlign: "center",
    fontSize: 15,
    lineHeight: 20,
    color: "#111827",
    letterSpacing: 0.8,
  },

  fieldGroup: {
    width: "100%",
    marginTop: 4,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 7,
  },

  inputContainer: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#9CA3AF",
    borderRadius: 4,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  input: {
    flex: 1,
    marginLeft: 13,
    fontSize: 20,
    color: "#111827",
    paddingVertical: 0,
  },

  passwordHeader: {
    width: "100%",
    marginTop: 22,
    marginBottom: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  forgot: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0A376A",
  },

  button: {
    width: "100%",
    height: 58,
    borderRadius: 29,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.3,
    shadowRadius: 9,
    elevation: 8,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  securityText: {
    marginTop: 25,
    fontSize: 12,
    color: "#111827",
    textAlign: "center",
    letterSpacing: 0.4,
  },

  sparkle: {
    position: "absolute",
    right: 22,
    bottom: 54,
  },

  buttonWrapper: {
    width: "100%",
    marginTop: 28,
    borderRadius: 29,
  },
});

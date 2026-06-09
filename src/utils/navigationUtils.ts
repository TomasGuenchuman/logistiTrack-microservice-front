import { Linking, Platform } from "react-native";


// Formateo de dirección común para asegurar que busque siempre en Ushuaia
const getFullAddress = (address: string): string => {
  return `${address}, Ushuaia, Tierra del Fuego, Argentina`;
};

/**
 * Abre la aplicación de mapas nativa (o web) con una dirección específica.
 * Centraliza la lógica de formateo y manejo de errores.
 */

/**
 * COMPORTAMIENTO 1: Abre el mapa con el pin en la ubicacion.
 */
export const openMapWithAddress = (address: string): void => {
  const fullAddress = getFullAddress(address);
  const encodedAddress = encodeURIComponent(fullAddress);

  let url = "";

  if (Platform.OS === "ios") {
    // Abre la app nativa Apple Maps con un pin de búsqueda
    url = `maps://?q=${encodedAddress}`;
  } else if (Platform.OS === "android") {
    // Abre la app nativa Google Maps apuntando a la dirección
    url = `geo:0,0?q=${encodedAddress}`;
  } else {
    // Fallback para cuando lo probás desde la Web en la PC
    url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  }

  Linking.openURL(url).catch((err) => {
    console.error("Error al abrir la URL del mapa centralizado:", err);
    alert("No se pudo abrir el mapa en este dispositivo.");
  });
};

/**
 * COMPORTAMIENTO 2: Abre el mapa directo en modo navegación con indicaciones de ruta.
 */
export const openMapWithInstructions = (address: string): void => {
  const fullAddress = getFullAddress(address);
  const encodedAddress = encodeURIComponent(fullAddress);

  //hacer lo mismo con funciones puras


  let url = "";

  if (Platform.OS === "ios") {
    // Navegación paso a paso en Apple Maps (d = destino, dirflg=d es manejo en auto)
    url = `maps://?daddr=${encodedAddress}&dirflg=d`;
  } else if (Platform.OS === "android") {
    // Navegación paso a paso en Google Maps nativo (google.navigation:q=...)
    url = `google.navigation:q=${encodedAddress}&mode=d`;
  } else {
    // Fallback para la versión Web en la PC (Directions API)
    url = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}&travelmode=driving`;
  }

  Linking.openURL(url).catch((err) => {
    console.error("Error al iniciar navegación en celular:", err);
    // Si falla el esquema nativo de navegación por algún motivo, intentamos abrir el navegador web común como salvavidas
    const webFallback = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}&travelmode=driving`;
    Linking.openURL(webFallback);
  });
};
// funciona para un formato de timestamp YYYY-MM-DD HH:mm:ss ART
export function formatTime(timestamp: string | undefined): string {
  if (!timestamp || timestamp.trim() === "") {
    return "";
  }

  const date = new Date(timestamp);

  return date.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};
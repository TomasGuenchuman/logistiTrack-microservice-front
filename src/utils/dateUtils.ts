export function formatTime(timestamp: string | null | undefined): string {
  if (!timestamp?.trim()) {
    return "";
  }

  const date = new Date(timestamp);

  if (isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

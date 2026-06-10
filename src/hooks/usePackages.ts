import { packageService } from "@/services/index";
import { Package } from "@/types/domain/Package";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";

export function usePackages() {
  const [packages, setPackages] = useState<Package[]>([]);
  // Este contador nos va a servir como un "gatillo" manual para forzar la recarga
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Sacamos la función afuera para que sea accesible desde cualquier lado
  const fetchPackages = useCallback(async () => {
    try {
      const data = await packageService.getPackages();
      setPackages([...data]);
      console.log("Paquetes recargados desde el hook:", data);
    } catch (error) {
      console.error("Error al recargar paquetes desde el hook:", error);
    }
  }, []);

  // Reacción inmediata. Este useEffect escucha los cambios manuales (el gatillo)
  // Se va a ejecutar al instante en cuanto le des click a "Confirmar Entrega"
  useEffect(() => {
    fetchPackages();
  }, [refreshTrigger]);

  // Reacción por navegación. Mantiene la lista fresca si el repartidor cambia de pantalla
  useFocusEffect(
    useCallback(() => {
      fetchPackages();
      return () => {};
    }, [fetchPackages]),
  );

  // Esta es la función que expone el hook hacia la HomeScreen
  const triggerRefresh = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1); // Incrementa el número para forzar al useEffect
  }, []);

  return {
    packages,
    fetchPackages: triggerRefresh, // <-- Mapeamos la ejecución al gatillo
  };
}

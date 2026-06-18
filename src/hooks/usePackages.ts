import { packageService } from "@/services/index";
import { Package } from "@/types/domain/Package";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export function usePackages() {
  const [packages, setPackages] = useState<Package[]>([]);
  // Este contador nos va a servir como un "gatillo" manual para forzar la recarga
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Sacamos la función afuera
  const fetchPackages = useCallback(async (options?: { signal?: AbortSignal }) => {
    try {
      const data = await packageService.getPackages(options);
      setPackages(data);
      console.log("Paquetes recargados desde el hook");
    } catch (error: any) {
      if (error.name === 'AbortError' || error.code === 'ERR_CANCELED') return;
      console.error("Error al recargar paquetes:", {
        status: error?.response?.status,
        message: error?.message,
        name: error?.name,
        code: error?.code,
      });
    }
  }, []);

  // Reacción por navegación. Mantiene la lista fresca si el repartidor cambia de pantalla
  useFocusEffect(
    useCallback(() => {
      const controller = new AbortController();
      fetchPackages({ signal: controller.signal });
      return () => controller.abort();
    }, [fetchPackages]),
  );

  return {
    packages,
    fetchPackages,
  };
}

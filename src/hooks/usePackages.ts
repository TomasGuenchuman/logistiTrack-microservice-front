import { packageService } from "@/services/index";
import { Package } from "@/types/domain/Package";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export function usePackages(courierId?: string) {
  const [packages, setPackages] = useState<Package[]>([]);
  // Este contador nos va a servir como un "gatillo" manual para forzar la recarga
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Sacamos la función afuera
  const fetchPackages = useCallback(async () => {
    try {
      const data = await packageService.getPackagesByCourierId(courierId);
      setPackages(data);
      console.log("Paquetes recargados desde el hook");
    } catch (error) {
      console.error("Error al recargar paquetes desde el hook:", error);
    }
  }, []);

  // Reacción por navegación. Mantiene la lista fresca si el repartidor cambia de pantalla
  useFocusEffect(
    useCallback(() => {
      fetchPackages();
    }, [fetchPackages]),
  );

  return {
    packages,
    fetchPackages,
  };
}

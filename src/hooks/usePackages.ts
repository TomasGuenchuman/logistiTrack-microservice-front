import { useAuth } from "@/context/AuthContext";
import { packageService } from "@/services/index";
import { Package } from "@/types/domain/Package";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export function usePackages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const { isAuthenticated, user } = useAuth();
  const courierId = user?.id;

  // Sacamos la función afuera
  const fetchPackages = useCallback(async (options?: { signal?: AbortSignal }) => {
    // Si no hay sesión o usuario, no se hace la petición GET de packages,
    // simplemente limpiamos el estado de los paquetes
    if (!isAuthenticated || !courierId) {
      setPackages([]);
      return;
    }

    try {
      const data = await packageService.getPackagesByCourierId(courierId, options);
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

    try {
      const data = await packageService.getPackagesByCourierId(courierId);
      setPackages(data);
    } catch (error) {
      console.error("Error al recargar paquetes desde el hook, error:", error);
    }
    // Obtenemos los paquetes cada vez que la sesión o el usuario cambia
  }, [isAuthenticated, courierId]);

  // Reacción por navegación. Mantiene la lista fresca si el repartidor cambia de pantalla
  useFocusEffect(
    useCallback(() => {
      const controller = new AbortController();
      fetchPackages({ signal: controller.signal });
      return () => controller.abort();
    }, [fetchPackages]),
  );

  return { packages, fetchPackages, };
}

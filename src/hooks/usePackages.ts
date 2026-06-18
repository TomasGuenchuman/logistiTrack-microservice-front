import { useAuth } from "@/context/AuthContext";
import { packageService } from "@/services/index";
import { Package } from "@/types/domain/Package";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export function usePackages(courierId?: string) {
  const [packages, setPackages] = useState<Package[]>([]);
  const { isAuthenticated } = useAuth();

  const fetchPackages = useCallback(async () => {
    // Si no hay sesión o usuario, no se hace la petición GET de packages,
    // simplemente limpiamos el estado de los paquetes
    if (!isAuthenticated || !courierId) {
      setPackages([]);
      return;
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
      // aunque la navegación cambie, impido que se haga la petición
      // debido a que no hay sesión activa
      if (!isAuthenticated) return;

      fetchPackages();
    }, [fetchPackages, isAuthenticated]),
  );

  return {
    packages,
    fetchPackages,
  };
}

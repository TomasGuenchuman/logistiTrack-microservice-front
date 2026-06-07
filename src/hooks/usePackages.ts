import { packageService } from "@/services/index";
import { Package } from "@/types/domain/Package";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export function usePackages() {
  const [packages, setPackages] = useState<Package[]>([]);

  // useFocusEffect requiere que envolvamos la acción en un useCallback
  useFocusEffect(
    useCallback(() => {
      async function loadPackages() {
        try {
          const data = await packageService.getPackages();
          setPackages(data);
        } catch (error) {
          console.error("Error al recargar paquetes desde el hook:", error);
        }
      }

      loadPackages();

      // Opcional: Retornar una función de limpieza si es necesario (por ejemplo, para cancelar solicitudes pendientes)
      return () => {};
    }, [])
  );

  return packages;
}

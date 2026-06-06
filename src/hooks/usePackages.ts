import { packageService } from "@/services/index";
import { Package } from "@/types/domain/Package";
import { useEffect, useState } from "react";

export function usePackages() {
  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    async function loadPackages() {
      const data = await packageService.getPackages();
      setPackages(data);
    }

    loadPackages();
  }, []);

  return packages;
}

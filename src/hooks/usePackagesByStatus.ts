import { Package } from "@/types/domain/Package";
import { PackageStatus } from "@/types/PackageStatus";
import { useMemo } from "react";

export function usePackagesByStatus(
  packages: Package[],
  status: PackageStatus,
) {
  return useMemo(
    () => packages.filter((p) => p.status === status),
    [packages, status],
  );
}
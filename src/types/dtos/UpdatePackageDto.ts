import { PackageStatus } from "@/types/PackageStatus";

export type UpdatePackageDto = {
  status?: PackageStatus;
  courierId?: string | null;
  deliveredAt?: string | null;
};

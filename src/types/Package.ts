import { PackageStatus } from "@/types/PackageStatus";

export type Package = {
  id: string;
  code: string;
  address: string;
  detail: string;
  eta?: string;
  client: string;
  deliveredAt?: string;
  status: PackageStatus;
};

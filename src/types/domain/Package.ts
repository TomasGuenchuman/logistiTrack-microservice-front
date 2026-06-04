import { PackageStatus } from "@/types/PackageStatus";

// entidad Package que usará el frontend,
// con los mismos campos que el backend
// pero respetando convención camelCase para el frontend
export type Package = {
  id: string;
  trackingCode: string;
  recipientName: string;
  recipientDocument: string;
  address: string;
  addressDetail?: string;
  status: PackageStatus;
  courierId?: string;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
};

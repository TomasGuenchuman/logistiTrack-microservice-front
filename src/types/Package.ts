import { PackageStatus } from "@/types/PackageStatus";

export type Package = {
  // campos reales de la entidad Package del backend
  id: string;
  trackingCode: string;
  recipientName: string;
  recipientDocument: string;
  address: string;
  address_detail?: string;
  status: PackageStatus;
  courierId?: string;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
};

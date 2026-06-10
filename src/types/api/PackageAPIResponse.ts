import { PackageStatus } from "@/types/PackageStatus";

// reflejo exactamente la entidad real que viene del backend
export type PackageApiResponse = {
  id: string;
  trackingCode: string;
  recipientName: string;
  recipientDocument: string;
  address: string;
  status: PackageStatus;
  addressDetail: string | null;
  courierId: string | null;
  deliveredAt: string | null;
  createdAt: string;
  updatedAt: string;
};

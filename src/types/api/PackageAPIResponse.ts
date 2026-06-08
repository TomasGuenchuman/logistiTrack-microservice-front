import { PackageStatus } from "@/types/PackageStatus";

// reflejo exactamente la entidad real que viene del backend
export type PackageApiResponse = {
  id: string;
  tracking_code: string;
  recipient_name: string;
  recipient_document: string;
  address: string;
  status: PackageStatus;
  address_detail: string | null;
  courier_id: string | null;
  delivered_at: string | null;
  created_at: string;
  updated_at: string;
};

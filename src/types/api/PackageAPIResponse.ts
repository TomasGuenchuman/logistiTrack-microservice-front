import { PackageStatus } from "@/types/PackageStatus";

// reflejo exactamente la entidad real que viene del backend
export type PackageAPIResponse = {
  id: string;
  tracking_code: string;
  recipient_name: string;
  recipient_document: string;
  address: string;
  address_detail?: string;
  status: PackageStatus;
  courier_id?: string;
  delivered_at?: string;
  created_at: string;
  updated_at: string;
};

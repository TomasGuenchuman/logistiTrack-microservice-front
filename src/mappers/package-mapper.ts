import { PackageApiResponse } from "@/types/api/PackageApiResponse";
import { Package } from "@/types/domain/Package";

export const mapPackageFromApi = (raw: PackageApiResponse): Package => ({
  id: raw.id,
  trackingCode: raw.tracking_code,
  recipientName: raw.recipient_name,
  recipientDocument: raw.recipient_document,
  address: raw.address,
  addressDetail: raw.address_detail,
  status: raw.status,
  courierId: raw.courier_id,
  deliveredAt: raw.delivered_at,
  createdAt: raw.created_at,
  updatedAt: raw.updated_at,
});

export const mapPackagesFromApi = (raw: PackageApiResponse[]): Package[] =>
  raw.map(mapPackageFromApi);

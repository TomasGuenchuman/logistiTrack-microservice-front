import { PackageApiResponse } from "@/types/api/PackageApiResponse";
import { Package } from "@/types/domain/Package";

export const mapPackageFromApi = (raw: PackageApiResponse): Package => ({
  id: raw.id,
  trackingCode: raw.trackingCode,
  recipientName: raw.recipientName,
  recipientDocument: raw.recipientDocument,
  address: raw.address,
  addressDetail: raw.addressDetail,
  status: raw.status,
  courierId: raw.courierId,
  deliveredAt: raw.deliveredAt,
  createdAt: raw.createdAt,
  updatedAt: raw.updatedAt,
});

export const mapPackagesFromApi = (raw: PackageApiResponse[]): Package[] =>
  raw.map(mapPackageFromApi);

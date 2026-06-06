import { Package } from "@/types/domain/Package";
import { PackageStatus } from "@/types/PackageStatus";
import { apiClient } from "../api/apiClient";

export interface CreatePackagePayload {
  trackingCode: string;
  recipientName: string;
  recipientDocument: string;
  address: string;
  status?: PackageStatus;
  courierId: string;
}

export interface UpdatePackagePayload {
  trackingCode?: string;
  recipientName?: string;
  recipientDocument?: string;
  address?: string;
  status?: PackageStatus;
  courierId?: string;
}

export interface UpdatePackageStatusPayload {
  status: PackageStatus;
}

export async function createPackage(
  data: CreatePackagePayload,
): Promise<Package> {
  const response = await apiClient.post<Package>("/packages", data);
  return response.data;
}

export async function getPackages(): Promise<Package[]> {
  const response = await apiClient.get<Package[]>("/packages");
  return response.data;
}

export async function getPackageByTrackingCode(
  trackingCode: string,
): Promise<Package> {
  const response = await apiClient.get<Package>(
    `/packages/tracking/${trackingCode}`,
  );
  return response.data;
}

export async function getPackagesByCourierId(
  courierId: string,
): Promise<Package[]> {
  const response = await apiClient.get<Package[]>(
    `/packages/courier/${courierId}`,
  );

  return response.data;
}

export async function getPackageById(id: string): Promise<Package> {
  const response = await apiClient.get<Package>(`/packages/${id}`);
  return response.data;
}

export async function updatePackage(
  id: string,
  data: UpdatePackagePayload,
): Promise<Package> {
  const response = await apiClient.patch<Package>(`/packages/${id}`, data);
  return response.data;
}

export async function updatePackageStatus(
  id: string,
  data: UpdatePackageStatusPayload,
): Promise<Package> {
  const response = await apiClient.patch<Package>(
    `/packages/${id}/status`,
    data,
  );

  return response.data;
}

export async function markPackageAsDelivered(id: string): Promise<Package> {
  const response = await apiClient.patch<Package>(`/packages/${id}/delivered`);
  return response.data;
}

export async function deletePackage(id: string): Promise<void> {
  await apiClient.delete(`/packages/${id}`);
}

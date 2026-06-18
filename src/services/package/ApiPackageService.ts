import { apiClient } from "@/api/apiClient";
import {
  mapPackageFromApi,
  mapPackagesFromApi,
} from "@/mappers/package-mapper";
import { PackageApiResponse } from "@/types/api/PackageApiResponse";
import { Package } from "@/types/domain/Package";
import { UpdatePackageDto } from "@/types/dtos/UpdatePackageDto";
import { PackageService } from "./PackageService";


export class ApiPackageService implements PackageService {

  async getPackageById(id: string): Promise<Package | null> {
    const response = await apiClient.get<PackageApiResponse>(`/packages/${id}`);
    // Retorno el paquete mapeado a la estructura del dominio (front)
    return mapPackageFromApi(response.data);
  }

  async getPackageByTrackingCode(
    trackingCode: string,
  ): Promise<Package | null> {
    const response = await apiClient.get<PackageApiResponse>(
      `/packages/tracking/${trackingCode}`,
    );

    return mapPackageFromApi(response.data);
  }

  async getPackagesByCourierId(courierId: string, options?: { signal?: AbortSignal }): Promise<Package[]> {
    const response = await apiClient.get<PackageApiResponse[]>(
      `/packages?courierId=${courierId}`, { signal: options?.signal }
    );
    const paquetesMapeados = mapPackagesFromApi(response.data);
    return paquetesMapeados;
  }

  async updatePackage(
    id: string,
    data: UpdatePackageDto,
  ): Promise<Package | null> {
    const response = await apiClient.patch<PackageApiResponse>(
      `/packages/${id}`,
      data,
    );
    return mapPackageFromApi(response.data);
  }

  /* async createPackage(data: CreatePackagePayload): Promise<PackageApiResponse> {
    // Simulo una llamada a la API con un retraso
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Retorno la respuesta mockeada
    return {
      id: `package-${Date.now()}`,
      ...data,
    };
  }
  async updatePackage(
    id: string,
    data: UpdatePackagePayload,
  ): Promise<PackageApiResponse> {
    // Simulo una llamada a la API con un retraso
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Retorno la respuesta mockeada
    return {
      id: `package-${Date.now()}`,
      ...data,
    };
  } */
  /* async updatePackageStatus(
    id: string,
    data: UpdatePackageStatusPayload,
  ): Promise<PackageApiResponse> {
    // Simulo una llamada a la API con un retraso
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Retorno la respuesta mockeada
    return {
      id: `package-${Date.now()}`,
    };
  } */
  /* async markPackageAsDelivered(id: string): Promise<PackageApiResponse> {
    const response = await apiClient.patch<PackageApiResponse>(
      `/packages/${id}/delivered`,
    );
    return response.data;
  }

  async deletePackage(id: string): Promise<void> {
    await apiClient.delete(`/packages/${id}`);
  } */
}

/* export interface CreatePackagePayload {
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
} */

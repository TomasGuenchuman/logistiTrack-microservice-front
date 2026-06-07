import { packagesMock } from "@/data/packages-mock";
import { mapPackagesFromApi } from "@/mappers/package-mapper";
import { Package } from "@/types/domain/Package";
import { PackageService } from "./PackageService";

// SIN IMPLEMENTAR: Este servicio es un esqueleto para la futura implementación real que se conectará a una API REST.

export class ApiPackageService implements PackageService {
  async getPackages(): Promise<Package[]> {
    // Simulo una llamada a la API con un retraso
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Retorno los datos mock mapeados a la estructura del dominio (front)
    return mapPackagesFromApi(packagesMock);
  }

  async getPackageByTrackingCode(
    trackingCode: string,
  ): Promise<Package | undefined> {
    // Simulo una llamada a la API con un retraso
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Primero mapeo los datos mock a la estructura del dominio (front)
    // con el objetivo de que la búsqueda se haga sobre los campos
    // que el dominio (front) conoce y utiliza, en este caso el trackingCode
    // Logrando así desacoplar la búsqueda del formato de la api (backend)
    const packages = mapPackagesFromApi(packagesMock);
    // Retorno el paquete encontrado o undefined si no se encuentra
    return packages.find((pkg) => pkg.trackingCode === trackingCode);
  }

  async getPackagesByCourierId(courierId: string): Promise<Package[]> {
    // Simulo una llamada a la API con un retraso
    await new Promise((resolve) => setTimeout(resolve, 500));
    const packages = mapPackagesFromApi(packagesMock);
    // Retorno los paquetes mockeados mapeados a la estructura del dominio (front)
    return packages.filter((pkg) => pkg.courierId === courierId);
  }
  async getPackageById(id: string): Promise<Package | undefined> {
    // Simulo una llamada a la API con un retraso
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Retorno el paquete mockeado mapeado a la estructura del dominio (front)
    const packages = mapPackagesFromApi(packagesMock);
    return packages.find((pkg) => pkg.id === id);
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
import { packagesMock } from "@/data/packages-mock";
import { mapPackagesFromApi } from "@/mappers/package-mapper";
import { Package } from "@/types/domain/Package";
import { PackageStatus } from "@/types/PackageStatus";
import { PackageService } from "./PackageService";

// Definimos los payloads que necesita el contrato (pueden migrarse a un archivo de tipos si prefieren)
export interface UpdatePackagePayload {
  status?: PackageStatus;
  courierId?: string;
}

// Esta clase simula el comportamiento de un servicio real, pero usando datos mockeados en memoria.
export class MockPackageService implements PackageService {
  async getPackages(): Promise<Package[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mapPackagesFromApi(packagesMock);
  }

  // Implementamos el método de búsqueda por código de seguimiento, simulando una consulta a la base de datos.
  async getPackageByTrackingCode(trackingCode: string): Promise<Package | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const packages = mapPackagesFromApi(packagesMock);
    return packages.find((pkg) => pkg.trackingCode === trackingCode);
  }

  // Método adicional para obtener paquetes por ID de courier, útil para la funcionalidad de "Mi Ruta"
  async getPackagesByCourierId(courierId: string): Promise<Package[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const packages = mapPackagesFromApi(packagesMock);
    return packages.filter((pkg) => pkg.courierId === courierId);
  }

  // Método adicional para obtener un paquete por su ID, útil para detalles específicos o actualizaciones
  async getPackageById(id: string): Promise<Package | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const packages = mapPackagesFromApi(packagesMock);
    return packages.find((pkg) => pkg.id === id);
  }

  // IMPLEMENTACIÓN DE ACTUALIZACIÓN EN MEMORIA
  // Esto permite que al tocar "AGREGAR A MI RUTA" el estado cambie de verdad en el array falso
  async updatePackage(id: string, data: { status?: any; courierId?: string }): Promise<Package> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const pkgIndex = packagesMock.findIndex((p) => p.id === id);
    
    if (pkgIndex === -1) {
      throw new Error(`Package with ID ${id} not found.`);
    }

    // Mapeamos las actualizaciones del front al formato snake_case del mock/back
    const updateData: Record<string, any> = {};
    if (data.status) updateData.status = data.status;
    if (data.courierId) updateData.courier_id = data.courierId;

    packagesMock[pkgIndex] = {
      ...packagesMock[pkgIndex],
      ...updateData,
      updated_at: new Date().toISOString()
    };

    const updatedPackagesList = mapPackagesFromApi(packagesMock);
    return updatedPackagesList.find((p) => p.id === id)!;
  }
}
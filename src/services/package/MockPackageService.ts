import { packagesMock } from "@/data/packages-mock";
import {
  mapPackageFromApi,
  mapPackagesFromApi,
} from "@/mappers/package-mapper";
import { PackageService } from "@/services/package/PackageService";
import { Package } from "@/types/domain/Package";
import { UpdatePackageDto } from "@/types/dtos/UpdatePackageDto";

// Esta clase simula el comportamiento de un servicio real, pero usando datos mockeados en memoria.
export class MockPackageService implements PackageService {
  async getPackages(): Promise<Package[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mapPackagesFromApi(packagesMock);
  }

  // Implementamos el método de búsqueda por código de seguimiento, simulando una consulta a la base de datos.
  async getPackageByTrackingCode(
    trackingCode: string,
  ): Promise<Package | null> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const packages = mapPackagesFromApi(packagesMock);
    return packages.find((pkg) => pkg.trackingCode === trackingCode) || null;
  }

  // Método adicional para obtener paquetes por ID de courier, útil para la funcionalidad de "Mi Ruta"
  async getPackagesByCourierId(courierId: string): Promise<Package[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const packages = mapPackagesFromApi(packagesMock);
    return packages.filter((pkg) => pkg.courierId === courierId);
  }

  // Método adicional para obtener un paquete por su ID, útil para detalles específicos o actualizaciones
  async getPackageById(id: string): Promise<Package | null> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const packages = mapPackagesFromApi(packagesMock);
    return packages.find((pkg) => pkg.id === id) || null;
  }

  // IMPLEMENTACIÓN DE ACTUALIZACIÓN DE PAQUETES MOCK
  // Esto permite que al tocar "AGREGAR A MI RUTA" el estado cambie de verdad en paquetes mock
  async updatePackage(
    id: string,
    data: UpdatePackageDto,
  ): Promise<Package | null> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const pkgIndex = packagesMock.findIndex((p) => p.id === id);

    if (pkgIndex === -1) {
      throw new Error(`Paquete con id: "${id}" no encontrado.`);
    }

    // Mapeamos las actualizaciones del front al formato snake_case del mock/back
    const updateData: UpdatePackageDto = {};
    if (data.status !== undefined) updateData.status = data.status;
    if (data.courierId !== undefined) updateData.courierId = data.courierId;
    // Si desde el modal de firma mandamos la hora de entrega
    if (data.deliveredAt !== undefined)
      updateData.deliveredAt = data.deliveredAt;

    packagesMock[pkgIndex] = {
      ...packagesMock[pkgIndex],
      ...updateData,
      updatedAt: new Date().toISOString(), // Mantiene el registro de última modificación general
    };

    const updatedMockPackage = packagesMock[pkgIndex];
    return mapPackageFromApi(updatedMockPackage);
  }
}

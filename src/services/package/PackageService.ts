import { Package } from "@/types/domain/Package";
import { UpdatePackageDto } from "@/types/dtos/UpdatePackageDto";

export interface PackageService {

  getPackageById(id: string): Promise<Package | null>;

  getPackageByTrackingCode(trackingCode: string): Promise<Package | null>;

  getPackagesByCourierId(courierId: string, options?: { signal?: AbortSignal }): Promise<Package[]>;

  updatePackage(id: string, data: UpdatePackageDto): Promise<Package | null>;
}

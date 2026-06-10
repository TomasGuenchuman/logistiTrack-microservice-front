import { Package } from "@/types/domain/Package";
import { UpdatePackageDto } from "@/types/dtos/UpdatePackageDto";

export interface PackageService {
  getPackages(): Promise<Package[]>;

  getPackageById(id: string): Promise<Package | null>;

  getPackageByTrackingCode(trackingCode: string): Promise<Package | null>;

  updatePackage(id: string, data: UpdatePackageDto): Promise<Package | null>;
}

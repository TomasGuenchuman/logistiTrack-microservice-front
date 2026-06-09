import { Package } from "@/types/domain/Package";

export interface PackageService {
  getPackages(): Promise<Package[]>;

  getPackageById(id: string): Promise<Package | null>;

  getPackageByTrackingCode(trackingCode: string): Promise<Package | null>;
}

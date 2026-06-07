import { Package } from "@/types/domain/Package";

export interface PackageService {
  getPackages(): Promise<Package[]>;

  getPackageByTrackingCode(trackingCode: string): Promise<Package | undefined>;
}
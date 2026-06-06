import { Package } from "@/types/domain/Package";

export type PackageViewModel = {
  // entidad real que viene del backend
  package: Package;

  // campos solo para la UI
  eta?: string;
};

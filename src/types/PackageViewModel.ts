import { Package } from "@/types/Package";

export type PackageViewModel = {
  // entidad real que viene del backend
  package: Package;

  // campos solo para la UI
  eta?: string;
};

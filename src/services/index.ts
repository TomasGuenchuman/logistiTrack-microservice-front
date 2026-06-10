import { ApiPackageService } from "./package/ApiPackageService";

// Acá implementamos un único punto de acceso,
// las pantallas no necesitan conocer las implementaciones específicas de los servicios.
// Podemos cambiar la implementación del servicio (mock, api, etc.) sin afectar a las pantallas.

export const packageService = new ApiPackageService();

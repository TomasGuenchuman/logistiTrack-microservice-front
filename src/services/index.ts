import { ApiPackageService } from "./package/ApiPackageService";
import { ApiVerificationService } from "./verification/ApiVerificationService";

// Acá implementamos un único punto de acceso,
// las pantallas no necesitan conocer las implementaciones específicas de los servicios.
// Podemos cambiar la implementación del servicio (mock, api, etc.) sin afectar a las pantallas.


// Exportamos la instancia del servicio de paquetes para que pueda ser utilizada
export const packageService = new ApiPackageService();

// Exportamos la instancia del servicio de verificación para que pueda ser utilizada
export const verificationService = new ApiVerificationService();

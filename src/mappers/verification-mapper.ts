import { CreateVerificationDto } from "@/services/verification/VerificationService";

// Estructura exacta que exige tu CreateVerificationDto de NestJS
export interface VerificationApiRequest {
  orderId: string;       // En camelCase como el DTO
  signatureData: string; // En camelCase como el DTO
  verifiedBy: string;    // Ojo: requiere un UUID v4
  qrHash: string;        // Obligatorio según el DTO
  status?: string;       // Opcional
}

export const mapVerificationToApi = (domain: CreateVerificationDto): VerificationApiRequest => {
  console.log("====== [2. MAPPER] Traduciendo datos de Dominio a formato API ======");
  console.log("Datos de entrada (Front):")
  console.log("Courier ID:", domain.courierId);
  console.log("Package ID:", domain.packageId);
  console.log("Recipient DNI:", domain.recipientDni);

  return {
    orderId: domain.packageId,
    signatureData: domain.signature,
    
    //Mapeamos el ID real del chofer al campo que NestJS va a validar
    verifiedBy: domain.courierId, 
    
    // El qrHash sigue siendo obligatorio en tu DTO, mandamos el temporal por ahora
    qrHash: `TEMP_HASH_${domain.packageId}`, 
    status: "SUCCESS",
  };
};
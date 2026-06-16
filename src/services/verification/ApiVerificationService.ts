import { apiClient } from "@/api/apiClient";
import { mapVerificationToApi } from "@/mappers/verification-mapper";
import { CreateVerificationDto, VerificationService } from "./VerificationService";

export class ApiVerificationService implements VerificationService {
  async createVerification(data: CreateVerificationDto): Promise<void> {
    // Pasamos el DTO del front por el mapper para adaptarlo a la DB de NestJS
    const apiBody = mapVerificationToApi(data);
    
    console.log("====== [3. HTTP SERVICE] Disparando POST a /verifications ======");
    console.log("Destino: /verifications");
    console.log("Order ID:", apiBody.orderId);
    console.log("Verified By:", apiBody.verifiedBy);
    console.log("QR Hash:", apiBody.qrHash);

    // Enviamos el JSON mapeado al endpoint del API Gateway
    await apiClient.post("/verifications", apiBody);

    console.log("====== [4. HTTP SERVICE] ¡Respuesta 201/200 del Backend recibida con éxito! ======");
  }
}
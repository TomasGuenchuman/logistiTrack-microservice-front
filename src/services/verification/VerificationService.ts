export interface CreateVerificationDto {
  packageId: string;
  recipientDni: string;
  signature: string; // El string base64 de la firma
  courierId: string; // El ID del courier que realiza la verificación
}

export interface VerificationService {
  createVerification(data: CreateVerificationDto): Promise<void>;
}
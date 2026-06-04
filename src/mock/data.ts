import type { PackageViewModel } from "@/types/domain/PackageViewModel";

export const pendingPackages: PackageViewModel[] = [
  {
    package: {
      id: "1",
      trackingCode: "#TRK-8492",
      address: "Av. Maipú 1234, Ushuaia",
      addressDetail: "Piso 2, Depto B • Carlos Giménez",
      recipientName: "Carlos Giménez",
      recipientDocument: "12345678",
      status: "PENDING",
      createdAt: "2024-06-01T10:00:00Z",
      updatedAt: "2024-06-01T10:00:00Z",
    },
    eta: "14:30",
  },
  {
    package: {
      id: "2",
      trackingCode: "#TRK-9011",
      address: "San Martín 450, Centro",
      addressDetail: 'Planta Baja • Local "El Sol"',
      recipientName: "Local El Sol",
      recipientDocument: "98765432",
      status: "PENDING",
      createdAt: "2024-06-01T11:00:00Z",
      updatedAt: "2024-06-01T11:00:00Z",
    },
    eta: "15:15",
  },
];

export const inTransitPackages: PackageViewModel[] = [
  {
    package: {
      id: "3",
      trackingCode: "#TRK-8492",
      address: "Av. Maipú 1234, Ushuaia",
      addressDetail: "Piso 2, Depto B - Timbre Azul",
      recipientName: "Juan Pérez",
      recipientDocument: "34567890",
      status: "IN_TRANSIT",
      createdAt: "2024-06-01T10:00:00Z",
      updatedAt: "2024-06-01T12:00:00Z",
    },
    eta: "14:30",
  },
];

export const deliveredPackages: PackageViewModel[] = [
  {
    package: {
      id: "4",
      trackingCode: "#TRK-7301",
      address: "Gobernador Paz 870",
      addressDetail: "Casa 2 • Portón negro",
      recipientName: "María López",
      recipientDocument: "23456789",
      status: "DELIVERED",
      deliveredAt: "2024-05-30T13:45:00Z",
      createdAt: "2024-05-30T09:00:00Z",
      updatedAt: "2024-05-30T14:00:00Z",
    },
    eta: "13:45",
  },
  {
    package: {
      id: "5",
      trackingCode: "#TRK-5520",
      address: "Kuanip 1200",
      addressDetail: "Local comercial",
      recipientName: "Ferretería Austral",
      recipientDocument: "34567890",
      status: "DELIVERED",
      deliveredAt: "2024-05-30T14:10:00Z",
      createdAt: "2024-05-30T09:00:00Z",
      updatedAt: "2024-05-30T14:00:00Z",
    },
    eta: "14:10",
  },
];

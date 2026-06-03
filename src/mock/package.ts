import { PackageStatus } from "@/types/PackageStatus";

type Package = {
  id: string;
  code: string;
  address: string;
  detail: string;
  eta?: string;
  client: string;
  deliveredAt?: string;
  status: PackageStatus;
};

export const pendingPackages: Package[] = [
  {
    id: "1",
    code: "#TRK-8492",
    address: "Av. Maipú 1234, Ushuaia",
    detail: "Piso 2, Depto B • Carlos Giménez",
    eta: "14:30",
    client: "Carlos Giménez",
    status: "PENDING",
  },
  {
    id: "2",
    code: "#TRK-9011",
    address: "San Martín 450, Centro",
    detail: 'Planta Baja • Local "El Sol"',
    eta: "15:15",
    client: "Local El Sol",
    status: "PENDING",
  },
];

export const inTransitPackages: Package[] = [
  {
    id: "3",
    code: "#TRK-8492",
    address: "Av. Maipú 1234, Ushuaia",
    detail: "Piso 2, Depto B - Timbre Azul",
    client: "Juan Pérez",
    status: "IN_TRANSIT",
  },
];

export const deliveredPackages: Package[] = [
  {
    id: "4",
    code: "#TRK-7301",
    address: "Gobernador Paz 870",
    detail: "Casa 2 • Portón negro",
    client: "María López",
    status: "DELIVERED",
    deliveredAt: "13:45",
  },
  {
    id: "5",
    code: "#TRK-5520",
    address: "Kuanip 1200",
    detail: "Local comercial",
    client: "Ferretería Austral",
    status: "DELIVERED",
    deliveredAt: "14:10",
  },
];

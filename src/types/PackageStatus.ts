// Si bien en el back tenemos un enum, en el front lo representamos como un tipo
// de unión de literales para facilitar su uso en funciones y componentes,
// sabiendo que estamos habilitados a usar estos literales directamente
// porque el back siempre nos enviará estos valores literales.
export type PackageStatus = "PENDING" | "IN_TRANSIT" | "DELIVERED";

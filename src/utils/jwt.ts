import { AuthUser } from "@/context/AuthContext";
import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  sub: string;
  email: string;
  sessionId: string;
  iat: number;
  exp: number;
};

export function getUserFromToken(token: string): AuthUser {
  const payload = jwtDecode<JwtPayload>(token);

  return {
    id: payload.sub,
    email: payload.email,
  };
}

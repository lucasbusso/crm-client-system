import decode from "jwt-decode";
import { Settings, DateTime } from "luxon";

interface TokenJWT {
  _id: string;
  email: string;
  name: string;
  iat: number;
  exp: number;
  role: "user" | "admin";
}

export const tokenDecode = <T>(token: string): T => {
  const createDecode: T = decode(token);
  return createDecode;
};

export const expirationTokenAuth = (token: string): boolean => {
  Settings.defaultZone = "America/Buenos_Aires";
  Settings.defaultLocale = "es";

  const { exp } = tokenDecode<TokenJWT>(token);
  const now = DateTime.now().toMillis();

  return exp * 1000 <= now;
};

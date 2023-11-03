export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegistrationData {
  firstName: string;
  lastName: string;
  ownBusiness: string;
  role: "admin" | "user";
  email: string;
  password: string;
}

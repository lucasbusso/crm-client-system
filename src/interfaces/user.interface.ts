export type User = {
  firstName: string;
  lastName: string;
  ownBusiness: string;
  email: string;
  password: string;
  role: "user" | "admin";
};

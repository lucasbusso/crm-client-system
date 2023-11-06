export type Client = {
  _id: string;
  firstName: string;
  lastName: string;
  businessName: string;
  email: string;
  phone: string;
  antiquity: string;
  debt: number;
  userId: string;
  role: "cliente" | "proveedor";
  isActive: boolean;
  updatedAt: string;
  createdAt: string;
};

import { ReactNode } from "react";
type InputType = "email" | "number" | "text" | "password";

export interface ChildrenProps {
  children: ReactNode;
}

export interface CartItemProps {
  id: number;
  title: string;
  price: number;
  newPrice: number;
  quantity: number;
  image: string;
}

export interface RegisterProps {
  phone: string;
  email: string;
  name: string;
  password: string;
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface FormField {
  field: keyof RegisterProps | LoginProps;
  title: string;
  type: InputType;
}

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

export interface CheckoutProps {
  phone: string;
  email: string;
  name: string;
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

export interface ProductProps {
  title: string;
  id: string;
  price: number;
  image: string;
  newPrice?: number;
  quantity: number;
}

export interface PaginatedItemsProps {
  itemsPerPage: number;
  filteredProducts: ProductProps[];
}

export interface Location {
  code: string;
  name: string;
}

export interface OptionProps {
  title: string;
  selected: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  list: Location[];
  option: string;
  htmlFor: string;
}

export type OrderProps = {
  province: string;
  district: string;
  ward: string;
  address: string;
  shippingMethod: string;
  shippingFee: number;
};

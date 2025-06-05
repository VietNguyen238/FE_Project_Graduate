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
  phone: string;
  password: string;
}

export interface FormField {
  field: keyof RegisterProps | LoginProps;
  title: string;
  type: InputType;
}

export interface ProductProps {
  _id: string;
  nameProduct: string;
  price: number;
  imageUrl: string;
  newPrice?: number;
  quantity: number;
  category?: string;
  description?: string;
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

export type ShippingProps = {
  province: string;
  district: string;
  ward: string;
  address: string;
  shippingMethod: string;
  shippingFee: number;
};

interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  products: string[];
  isActive: boolean;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductDetailProps {
  _id: string;
  nameProduct: string;
  price: number;
  newPrice?: number;
  imageUrl: string[];
  categoryId?: Category;
  quantity: number;
  description?: string;
  color?: { colorProduct: string }[];
}

export interface ReviewProps {
  _id: string;
  userId: {
    _id: string;
    name: string;
    imageUrl: string;
  };
  productId: string;
  image: string;
  comment: string;
  rating: number;
  createdAt: string;
}

export interface UserProps {
  name: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  sex: string;
  image: string;
  admin: boolean;
  addressUserId: AddressProps[];
  orderId: string[];
}

export interface AddressProps {
  province: string;
  district: string;
  ward: string;
  address: string;
}

export interface PaymentProps {
  id: string;
  value: string;
  title: string;
  description: string;
  icon: string;
}

export interface PaymentCartProps {
  id: string;
  icon: string;
  title: string;
  description: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  paymentMethod: string;
}

export interface OrderProps {
  userId: UserProps;
  orders: Array<{
    productId: ProductDetailProps[];
    nameProduct: string;
    price: number;
    newPrice: number;
    quantity: number;
  }>;
  freeship: number;
  province: string;
  district: string;
  ward: string;
  address: string;
  status: string;
  paymentMethod: string;
  shippingMethod: string;
  shippingFee: number;
  total: number;
  note: string;
}

import { ReactNode } from "react";

export interface ChildrenProps {
  children: ReactNode;
}

export interface CartItem {
  id: number;
  title: string;
  price: number;
  newPrice: number;
  quantity: number;
  image: string;
}

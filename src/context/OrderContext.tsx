import {
  createContext,
  ReactNode,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { OrderProps, UserProps } from "../types";

interface OrderContextProps {
  order: OrderProps;
  setOrder: Dispatch<SetStateAction<OrderProps>>;
}

const OrderContext = createContext<OrderContextProps | undefined>(undefined);

const initialOrderState: OrderProps = {
  _id: "",
  userId: { _id: "", name: "" },
  orders: [],
  province: "",
  district: "",
  ward: "",
  address: "",
  status: "",
  paymentMethod: "",
  shippingMethod: "",
  shippingFee: 0,
  total: 0,
  freeship: 0,
  note: "",
  createdAt: new Date().toISOString(),
};

export function OrderProvider({ children }: { children: ReactNode }) {
  const [order, setOrder] = useState<OrderProps>(() => {
    const savedOrder = localStorage.getItem("order");
    return savedOrder ? JSON.parse(savedOrder) : initialOrderState;
  });

  useEffect(() => {
    localStorage.setItem("order", JSON.stringify(order));
  }, [order]);

  return (
    <OrderContext.Provider
      value={{
        order,
        setOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrderContext() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
}

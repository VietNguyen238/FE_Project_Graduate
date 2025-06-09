import { useEffect, useState } from "react";
import ButtonOrder from "../components/ui/ButtonOrder";
import Title from "../components/ui/Title";
import { payments } from "../constants";
import PaymentCart from "../components/ui/PaymentCart";
import { useSelector } from "react-redux";
import { useOrderContext } from "../context/OrderContext";
import { useNavigate } from "react-router-dom";
import { useTitleContext } from "../context/TitleContext";

export default function Payment() {
  const [paymentMethod, setPaymentMethod] = useState<string>("cod");
  const cart = useSelector((state: any) => state.cart.items);
  const { order, setOrder } = useOrderContext();
  const navigate = useNavigate();

  const { setTitle } = useTitleContext();

  useEffect(() => {
    setTitle("Thanh toán");
  }, [setTitle]);

  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentMethod(e.target.value);
  };

  const totalPrice = cart.reduce(
    (
      acc: number,
      item: { productId: { newPrice: number; price: number }; quantity: number }
    ) =>
      acc +
      item.quantity *
        (item.productId.newPrice === 0
          ? item.productId.price
          : item.productId.newPrice),
    0
  );

  const freeship =
    totalPrice >= 500000 ? 35000 : totalPrice >= 300000 ? 15000 : 0;
  const charged =
    order.shippingFee - freeship <= 0 ? 0 : order.shippingFee - freeship;
  const total = totalPrice + charged;

  const handleOrder = async () => {
    setOrder({
      ...order,
      shippingFee: charged,
      paymentMethod: paymentMethod,
      total: total,
      orders: cart.map(
        (item: {
          productId: {
            _id: string;
            nameProduct: string;
            price: number;
            newPrice: number;
          };
          quantity: number;
        }) => ({
          productId: item.productId._id,
          nameProduct: item.productId.nameProduct,
          price: item.productId.price,
          newPrice: item.productId.newPrice,
          quantity: item.quantity,
        })
      ),
    });
    navigate("/checkout/check");
  };

  return (
    <div className="flex justify-center items-center py-8">
      <div className="w-full max-w-2xl px-4">
        <Title title="Đặt hàng - Hình thức thanh toán" />
        <div className="container mx-auto bg-white p-6 shadow-md">
          <section className="space-y-4">
            {payments.map((item) => (
              <PaymentCart
                key={item.id}
                id={item.id}
                icon={item.icon}
                title={item.title}
                description={item.description}
                value={item.value}
                onChange={handlePaymentMethodChange}
                paymentMethod={paymentMethod}
              />
            ))}
            <ButtonOrder onClick={handleOrder} />
          </section>
        </div>
      </div>
    </div>
  );
}

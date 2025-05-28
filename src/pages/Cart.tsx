import Button from "../components/ui/Button";
import CartCard from "../components/ui/CartCard";
import ProgressBar from "../components/ui/ProgressBar";
import Title from "../components/ui/Title";
import { formatPrice } from "../components/utils/format_price";
import { useEffect, useState } from "react";

interface CartItem {
  id: number;
  title: string;
  price: number;
  newPrice: number;
  quantity: number;
  image: string;
}

export default function Cart() {
  const [itemCart, setItemCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      setItemCart(JSON.parse(cartData));
    }
  }, []);

  const totalProduct = itemCart.reduce(
    (prev, item) =>
      prev +
      (item.newPrice == 0
        ? item.price * item.quantity
        : item.newPrice * item.quantity),
    0
  );

  return (
    <div className="flex justify-center mb-8 mt-3">
      <div className="w-[600px]">
        <Title title="Giỏ hàng" />
        {itemCart.length > 0 ? (
          itemCart.map((item, index) => (
            <div className="">
              <CartCard
                key={index}
                title={item.title}
                image={item.image}
                newPrice={item.newPrice}
                color="blue"
                quantities={item.quantity}
                price={item.price}
              />
              <div className="p-4 bg-white font-medium">
                <ProgressBar totalProduct={300000} />
                <div className="mt-2">
                  Tạm tính:{" "}
                  <span className="text-red-600 text-h3 font-bold">
                    {formatPrice(totalProduct)}đ
                  </span>
                </div>
                <div className="flex gap-4 mt-3">
                  <Button
                    title="Nhận tại cửa hàng"
                    text_color="bg-[#ee8744]"
                    bg_color="text-[#ffffff]"
                  />
                  <Button
                    title="Đặt hàng"
                    bg_color="bg-[#ee4444]"
                    text_color="text-[#ffffff]"
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-h4 text-title_color flex justify-center mb-40">
            Chưa có sản phẩm nào trong giỏ hàng
          </div>
        )}
      </div>
    </div>
  );
}

import Button from "../components/ui/Button";
import CartCard from "../components/ui/CartCard";
import ProgressBar from "../components/ui/ProgressBar";
import Title from "../components/ui/Title";
import { formatPrice } from "../components/utils/format_price";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

interface CartItem {
  id: number;
  title: string;
  price: number;
  newPrice: number;
  quantity: number;
  image: string;
  color: string;
}

export default function Cart() {
  const [itemCart, setItemCart] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  const totalProduct = useMemo(() => {
    return itemCart.reduce((total, item) => {
      const itemPrice = item.newPrice > 0 ? item.newPrice : item.price;
      return total + itemPrice * item.quantity;
    }, 0);
  }, [itemCart]);

  useEffect(() => {
    const loadCartData = () => {
      const cartData = localStorage.getItem("cart");
      if (cartData) {
        try {
          const parsedData = JSON.parse(cartData);
          if (Array.isArray(parsedData)) {
            setItemCart(parsedData);
          }
        } catch (error) {
          console.error("Error parsing cart data:", error);
          setItemCart([]);
        }
      }
    };
    loadCartData();
  }, []);

  useEffect(() => {
    if (itemCart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(itemCart));
    }
  }, [itemCart]);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    setItemCart((prevItemCart) =>
      prevItemCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleDelete = (id: number) => {
    setItemCart((prevItemCart) =>
      prevItemCart.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="flex justify-center mb-8 mt-3">
      <div className="w-[600px]">
        <Title title="Giỏ hàng" />
        {itemCart.length > 0 ? (
          itemCart.map((item, index) => (
            <div key={index}>
              <CartCard
                id={item.id}
                title={item.title}
                image={item.image}
                newPrice={item.newPrice}
                color={item.color}
                quantities={item.quantity}
                price={item.price}
                onQuantityChange={handleQuantityChange}
                onDelete={handleDelete}
              />
            </div>
          ))
        ) : (
          <div className="text-h4 text-title_color flex justify-center mb-40">
            Chưa có sản phẩm nào trong giỏ hàng
          </div>
        )}
        {itemCart.length > 0 && (
          <div className="p-4 bg-white font-medium">
            <ProgressBar totalProduct={totalProduct} />
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
                onClick={() => navigate("/checkout")}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

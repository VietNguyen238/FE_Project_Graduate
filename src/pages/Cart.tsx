import Button from "../components/ui/Button";
import CartCard from "../components/ui/CartCard";
import ProgressBar from "../components/ui/ProgressBar";
import Title from "../components/ui/Title";
import { formatPrice } from "../components/utils/format_price";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCart, getCart, updateUserCart } from "../services/cartService";
import { useDispatch, useSelector } from "react-redux";

interface CartItem {
  _id: string;
  productId: {
    _id: string;
    nameProduct: string;
    price: number;
    newPrice: number;
    imageUrl: string;
    color: string;
  };
  quantity: number;
}

export default function Cart() {
  const cart = useSelector((state: any) => state.cart.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalProduct = useMemo(() => {
    if (!cart || !Array.isArray(cart)) return 0;
    return cart.reduce((total: number, item: CartItem) => {
      const itemPrice =
        item.productId.newPrice > 0
          ? item.productId.newPrice
          : item.productId.price;
      return total + itemPrice * item.quantity;
    }, 0);
  }, [cart]);

  const handleQuantityChange = async (id: string, newQuantity: number) => {
    const cartItem = cart.find((item: CartItem) => item.productId._id === id);
    if (cartItem) {
      await updateUserCart({ quantity: newQuantity }, dispatch, cartItem._id);
    }
  };

  const handleDelete = async (id: string) => {
    const cartItem = cart.find((item: CartItem) => item.productId._id === id);
    if (cartItem) {
      await deleteCart(cartItem._id, dispatch);
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      await getCart(dispatch);
    };
    fetchCart();
  }, [dispatch]);

  return (
    <div className="flex justify-center mb-8 mt-3">
      <div className="w-[600px]">
        <Title title="Giỏ hàng" />
        {cart && Array.isArray(cart) && cart.length > 0 ? (
          cart.map((item: CartItem) => (
            <div key={item._id}>
              <CartCard
                id={item.productId._id}
                title={item.productId.nameProduct}
                image={item.productId.imageUrl}
                newPrice={item.productId.newPrice}
                color={item.productId.color}
                quantities={item.quantity}
                price={item.productId.price}
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
        {cart && Array.isArray(cart) && cart.length > 0 && (
          <div className="p-4 bg-white font-medium">
            <ProgressBar totalProduct={totalProduct} />
            <div className="mt-2">
              Tạm tính:{" "}
              <span className="text-red-600 text-h3 font-bold">
                {formatPrice(totalProduct)}₫
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

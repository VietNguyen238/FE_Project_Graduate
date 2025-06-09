import Button from "../components/ui/Button";
import CartCard from "../components/ui/CartCard";
import ProgressBar from "../components/ui/ProgressBar";
import Title from "../components/ui/Title";
import { formatPrice } from "../components/utils/format_price";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCart, getCart, updateUserCart } from "../services/cartService";
import { useDispatch, useSelector } from "react-redux";
import { useOrderContext } from "../context/OrderContext";

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
  const { order, setOrder } = useOrderContext();
  console.log(order);
  console.log(cart);
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

  const handleStore = () => {
    navigate("/checkout/takeaway");
    setOrder({
      ...order,
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
      shippingFee: 0,
      total: totalProduct,
      paymentMethod: "store",
      shippingMethod: "",
      address: "",
      district: "",
      ward: "",
      province: "",
    });
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
          <div className="bg-white p-4 shadow text-h4">
            <div className="text-center text-gray">
              Chưa có sản phẩm nào trong giỏ hàng
            </div>
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
                onClick={handleStore}
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

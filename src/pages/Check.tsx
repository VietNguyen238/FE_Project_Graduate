import axios from "axios";
import ButtonOrder from "../components/ui/ButtonOrder";
import Title from "../components/ui/Title";
import { useOrderContext } from "../context/OrderContext";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { formatPrice } from "../components/utils/format_price";
import { Link, useNavigate } from "react-router-dom";
import { addOrder } from "../services/orderService";
import { useDispatch } from "react-redux";

export default function Check() {
  const [note, setNote] = useState<string>("");
  const { order, setOrder } = useOrderContext();
  const user = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setOrder({ ...order, note: note, status: "waitForConfirmation" });
  }, [note]);

  const payment = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/v1/payment/create_payment?amount=${order.total}`
      );

      window.location.href = data.paymentUrl;
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  const cod = async () => {
    await addOrder(order, dispatch);
  };

  const handleOrder = () => {
    if (order.paymentMethod === "cod") {
      cod();
      navigate("/");
    } else if (order.paymentMethod === "vnpay") {
      payment();
    }
  };

  const paymentMethod = (() => {
    switch (order.paymentMethod) {
      case "cod":
        return "Thanh toán khi nhận hàng";
      case "vnpay":
        return "Thanh toán trực tuyến";
      case "store":
        return "Nhận tại cửa hàng";
      default:
        return "Chưa chọn phương thức vận chuyển";
    }
  })();

  return (
    <div className="flex justify-center mb-8 mt-3">
      <div className="w-[600px]">
        <Title title="Đặt hàng - Kiểm tra thông tin" />
        <div className="bg-white p-6 shadow">
          <div>
            <div className="text-h3 font-medium mb-4">Kiểm tra thông tin</div>
            <div className="mb-1 grid grid-cols-5">
              <span className="w-36 text-h4 font-medium">Điện thoại:</span>
              <span className="ml-2 text-h4 col-span-4">{user.phone}</span>
            </div>
            <div className="mb-1 grid grid-cols-5">
              <span className="w-36 text-h4 font-medium">Họ tên:</span>
              <span className="ml-2 text-h4 col-span-4">{user.name}</span>
            </div>
            <div className="mb-1 grid grid-cols-5">
              <span className="w-36 text-h4 font-medium">Email:</span>
              <span className="ml-2 text-h4 col-span-4">{user.email}</span>
            </div>
            <div className="mb-1 grid grid-cols-5">
              <span className="w-36 text-h4 font-medium">Thành phố:</span>
              <span className="ml-2 text-h4 col-span-4">
                {order.ward}, {order.district}, {order.province}
              </span>
            </div>
            <div className="mb-4 grid grid-cols-5">
              <span className="w-36 text-h4 font-medium">Địa chỉ:</span>
              <span className="ml-2 text-h4 col-span-4">{order.address}</span>
            </div>
            <div className="text-h3 font-medium mb-4 mt-6">
              Thông tin đơn hàng
            </div>
            <table className="w-full border border-gray mb-4 text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-2 border border-gray text-left font-medium">
                    Sản phẩm
                  </th>
                  <th className="p-2 border border-gray text-right font-medium">
                    SL
                  </th>
                  <th className="p-2 border border-gray text-right font-medium">
                    Giá
                  </th>
                  <th className="p-2 border border-gray text-right font-medium">
                    Tổng
                  </th>
                </tr>
              </thead>
              {order.orders.map((item, index) => (
                <tbody key={index}>
                  <tr>
                    <td className="p-2 border border-gray">
                      <Link
                        to={`/product/${item.productId}`}
                        className="text-blue-600 hover:underline"
                      >
                        {item.nameProduct}
                      </Link>
                    </td>
                    <td className="p-2 border border-gray text-right">
                      {item.quantity}
                    </td>
                    <td className="p-2 border border-gray text-right">
                      {formatPrice(
                        item.newPrice == 0 ? item.price : item.newPrice
                      )}
                      ₫
                    </td>
                    <td className="p-2 border border-gray text-right">
                      {formatPrice(
                        (item.newPrice == 0 ? item.price : item.newPrice) *
                          item.quantity
                      )}
                      ₫
                    </td>
                  </tr>
                </tbody>
              ))}
              <tfoot>
                <tr className="bg-gray-50">
                  <th
                    colSpan={3}
                    className="p-2 border border-gray text-left font-medium"
                  >
                    Phí vận chuyển:
                  </th>
                  <td className="p-2 border border-gray text-right">
                    {formatPrice(order.shippingFee)}₫
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <th
                    colSpan={3}
                    className="p-2 border border-gray text-left font-medium"
                  >
                    Tổng cộng:
                  </th>
                  <td className="p-2 border border-gray text-right font-medium">
                    {formatPrice(order.total)}₫
                  </td>
                </tr>
              </tfoot>
            </table>
            <div className="mb-1 grid grid-cols-5">
              <span className="w-36 text-h4 font-medium">Thanh toán:</span>
              <span className="ml-2 text-h4 col-span-4">{paymentMethod}</span>
            </div>
            <div className="mb-2 grid grid-cols-5">
              <span className="w-36 text-h4 font-medium">Vận chuyển:</span>
              <span className="ml-2 text-h4 col-span-4">
                {order.shippingMethod}
              </span>
            </div>
            <div className="mb-4 grid grid-cols-5">
              <span className="w-36 text-h4 font-medium">Giảm giá:</span>
              <button className="ml-2 col-span-4 w-[150px] text-h4 px-3 py-1 border border-blue-400 text-blue-500 rounded hover:bg-blue-50 text-sm">
                Chọn mã giảm giá
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-h4 font-medium mb-1">Ghi chú</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full border border-gray rounded p-2 min-h-[60px] focus:outline-blue-400"
                placeholder="Ghi chú cho nhân viên bán hàng hoặc cho nhân viên vận chuyển"
              />
            </div>
            <ButtonOrder
              onClick={handleOrder}
              isPayment={order.paymentMethod == "vnpay" && true}
              isOrder={order.paymentMethod == "cod" && true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

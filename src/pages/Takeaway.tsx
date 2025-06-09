import ButtonOrder from "../components/ui/ButtonOrder";
import Title from "../components/ui/Title";
import { useOrderContext } from "../context/OrderContext";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { formatPrice } from "../components/utils/format_price";
import { Link, useNavigate } from "react-router-dom";
import { addOrder } from "../services/orderService";
import { useDispatch } from "react-redux";
import { actionPaymentMethod } from "../constants/action";
import { useTitleContext } from "../context/TitleContext";
import { UserProps } from "../types";

const getTomorrowDate = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const day = String(tomorrow.getDate()).padStart(2, "0");
  const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
  const year = tomorrow.getFullYear();

  return `${day}/${month}/${year}`;
};

export default function Takeaway() {
  const [note, setNote] = useState<string>("");
  const { order, setOrder } = useOrderContext();
  const user = useSelector(
    (state: { user: { user: UserProps } }) => state.user.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pickupDate] = useState(getTomorrowDate());
  const [pickupTime, setPickupTime] = useState("10:00");
  const { setTitle } = useTitleContext();

  useEffect(() => {
    setTitle("Takeaway");
  }, [setTitle]);

  useEffect(() => {
    if (order) {
      setOrder({ ...order, note: note, status: "waitForConfirmation" });
    }
  }, []);

  const handleOrder = async () => {
    try {
      if (order) {
        const orderData = {
          ...order,
          note: note,
          status: "waitForConfirmation",
          pickupDate: pickupDate,
          pickupTime: pickupTime,
        };

        await addOrder(orderData, dispatch);
        navigate("/");
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const paymentMethod = actionPaymentMethod(order.paymentMethod);

  if (!order || !order.paymentMethod) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center mb-8 mt-3">
      <div className="w-[600px]">
        <Title title="Đặt hàng nhận tại Nshop" />
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
            <div className="mb-4">
              <label className="block text-h4 font-medium mb-4 mt-6">
                Hẹn lấy ngày
              </label>
              <div className="flex items-center mb-4">
                <input
                  type="radio"
                  id="tomorrowPickup"
                  name="pickupDate"
                  value={pickupDate}
                  checked
                  readOnly
                  className="mr-2"
                />
                <label htmlFor="tomorrowPickup" className="text-h4">
                  Ngày mai {pickupDate}
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-h4 font-medium mb-4 mt-6">
                Thời gian lấy hàng
              </label>
              <input
                type="time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="w-full border border-gray rounded py-1 px-2 focus:outline-blue-400"
              />
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
              {order.orders &&
                order.orders.map((item, index) => (
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
            <ButtonOrder onClick={handleOrder} isOrder={true} />
          </div>
        </div>
      </div>
    </div>
  );
}

import { useSelector } from "react-redux";
import Title from "../../components/ui/Title";
import { useEffect, useState } from "react";
import { getAllOrder, updateUserOrder } from "../../services/orderService";
import { useDispatch } from "react-redux";
import { formatDate } from "../../components/utils/formatDate";
import { formatPrice } from "../../components/utils/format_price";
import { colorShipping, statusShipping } from "../../constants";
import { OrderProps } from "../../types";
import InputSearchAdmin from "../../components/ui/InputSearchAdmin";
import { useTitleContext } from "../../context/TitleContext";

export default function OrderAdmin() {
  const dispatch = useDispatch();
  const order = useSelector(
    (state: { order: { orders: OrderProps[] } }) => state.order.orders
  );
  const [searchQuery, setSearchQuery] = useState("");
  const { setTitle } = useTitleContext();

  useEffect(() => {
    setTitle("Danh sách đơn hàng");
  }, [setTitle]);

  useEffect(() => {
    getAllOrder(dispatch);
  }, [order]);
  console.log(order);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    await updateUserOrder({ status: newStatus }, dispatch, orderId);
  };

  const filteredOrders = Array.isArray(order)
    ? order
        .filter((item: OrderProps) =>
          item._id?.slice(-6).toUpperCase().includes(searchQuery.toUpperCase())
        )
        .sort(
          (a: OrderProps, b: OrderProps) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
    : [];
  return (
    <div>
      <Title title="Danh sách đơn hàng" />
      <div className="bg-white p-6">
        <div className="mb-4">
          <InputSearchAdmin
            onSearch={setSearchQuery}
            placeholder="Tìm kiếm theo mã đơn hàng..."
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Mã đơn hàng</th>
                <th className="px-4 py-2 text-left">Khách hàng</th>
                <th className="px-4 py-2 text-left">Ngày đặt hàng</th>
                <th className="px-4 py-2 text-left">Tổng tiền</th>
                <th className="px-4 py-2 text-left">Trạng thái</th>
                <th className="px-4 py-2 text-left">Phương thức thanh toán</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((item: OrderProps) => (
                <tr key={item._id} className="border-t">
                  <td className="px-4 py-2">
                    {item._id ? item._id.slice(-6).toUpperCase() : "N/A"}
                  </td>
                  <td className="px-4 py-2">{item.userId?.name}</td>
                  <td className="px-4 py-2">{formatDate(item.createdAt)}</td>
                  <td className="px-4 py-2 font-medium">
                    {formatPrice(item.total)}₫
                  </td>
                  <td className="px-4 py-2">
                    <select
                      value={item.status}
                      onChange={(e) =>
                        handleStatusChange(item._id, e.target.value)
                      }
                      className={`px-2 py-1 rounded-full text-sm border-none outline-none ${
                        colorShipping[item.status as keyof typeof colorShipping]
                      }`}
                    >
                      {Object.entries(statusShipping).map(([key, value]) => (
                        <option
                          key={key}
                          value={key}
                          className="text-black bg-white shadow border-none"
                        >
                          {value}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-2">
                    {item.paymentMethod === "cod"
                      ? "Thanh toán khi nhận hàng"
                      : item.paymentMethod === "vnpay"
                      ? "Thanh toán online"
                      : item.paymentMethod === "store" &&
                        "Thanh toán tại cửa hàng"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import { useSelector } from "react-redux";
import Title from "../../components/ui/Title";
import { useEffect } from "react";
import { getAllOrder } from "../../services/orderService";
import { useDispatch } from "react-redux";
import { formatDate } from "../../components/utils/formatDate";
import { formatPrice } from "../../components/utils/format_price";
import { colorShipping, statusShipping } from "../../constants";
import { OrderProps } from "../../types";

export default function OrderAdmin() {
  const dispatch = useDispatch();
  const order = useSelector((state: any) => state.order.orders);

  useEffect(() => {
    getAllOrder(dispatch);
  }, [order]);

  return (
    <div>
      <Title title="Danh sách đơn hàng" />
      <div className="bg-white p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Mã đơn hàng</th>
                <th className="px-4 py-2 text-left">Khách hàng</th>
                <th className="px-4 py-2 text-left">Ngày đặt</th>
                <th className="px-4 py-2 text-left">Tổng tiền</th>
                <th className="px-4 py-2 text-left">Trạng thái</th>
                <th className="px-4 py-2 text-left">Phương thức thanh toán</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(order) &&
                order.map((item: OrderProps) => (
                  <tr key={item._id} className="border-b">
                    <td className="px-4 py-2">
                      {item._id.slice(-6).toUpperCase()}
                    </td>
                    <td className="px-4 py-2">{item.userId?.name}</td>
                    <td className="px-4 py-2">{formatDate(item.createdAt)}</td>
                    <td className="px-4 py-2">{formatPrice(item.total)}</td>
                    <td className="px-4 py-2">
                      <span
                        className="px-2 py-1 rounded-full text-sm"
                        style={{
                          backgroundColor:
                            colorShipping[
                              item.status as keyof typeof colorShipping
                            ],
                        }}
                      >
                        {
                          statusShipping[
                            item.status as keyof typeof statusShipping
                          ]
                        }
                      </span>
                    </td>
                    <td className="px-4 py-2">{item.paymentMethod}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import { useEffect } from "react";
import Title from "../components/ui/Title";
import { getOrder } from "../services/orderService";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { formatDate } from "../components/utils/formatDate";
import { colorShipping, statusShipping } from "../constants";
import { formatPrice } from "../components/utils/format_price";

export default function Order() {
  const dispatch = useDispatch();
  const order = useSelector((state: any) => state.order.orders);

  useEffect(() => {
    const fetchOrder = async () => {
      await getOrder(dispatch);
    };

    fetchOrder();
  }, []);

  const sortedOrders = Array.isArray(order)
    ? [...order].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    : [];

  return (
    <div className="flex justify-center mb-8 mt-3">
      <div className="w-[600px]">
        <Title title="Đơn hàng" />
        <div className="bg-white p-4 shadow text-h4">
          {sortedOrders && sortedOrders.length > 0 ? (
            sortedOrders.map((item: any, index: number) => (
              <div
                key={index}
                className={`flex justify-between items-center ${
                  index !== sortedOrders.length - 1 &&
                  "mb-2 pb-2 border-b border-zinc-300"
                }`}
              >
                <div className="flex flex-col">
                  <p className="font-medium mb-2 flex justify-start items-center gap-4">
                    Đơn hàng #
                    {item._id ? item._id.slice(-6).toUpperCase() : "N/A"}
                    <span
                      className={`rounded-full px-2 py-0.5 text-h5 text-center ${
                        colorShipping[item.status as keyof typeof colorShipping]
                      }`}
                    >
                      {
                        statusShipping[
                          item.status as keyof typeof statusShipping
                        ]
                      }
                    </span>
                  </p>
                  <div className="flex gap-2 text-h4 text-gray">
                    <p>{formatDate(item.createdAt)}</p>|
                    <p>
                      Tổng cộng:
                      <span className="font-medium text-title_color">
                        {" "}
                        {formatPrice(item.total)}₫
                      </span>
                    </p>
                  </div>
                </div>
                <div>
                  <p>
                    <a
                      href={`/orders/${item._id}`}
                      className="text-blue-600 bg-blue-100 px-2 py-1 rounded text-xs"
                    >
                      Xem chi tiết
                    </a>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray">Không có đơn hàng nào</p>
          )}
        </div>
      </div>
    </div>
  );
}

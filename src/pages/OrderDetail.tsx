import { useEffect, useState } from "react";
import Title from "../components/ui/Title";
import { getIdOrder } from "../services/orderService";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { colorShipping, statusShipping } from "../constants";
import { formatDate } from "../components/utils/formatDate";
import { formatPrice } from "../components/utils/format_price";
import { getAddress } from "../services/addressService";

export default function OrderDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const order = useSelector((state: any) => state.order.orders);

  useEffect(() => {
    const fetchOrder = async () => {
      if (id) {
        setIsLoading(true);
        try {
          await getIdOrder(id, dispatch);
          await getAddress(dispatch);
        } catch (error) {
          console.error("Error fetching order:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchOrder();
  }, [id, dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg">Order not found</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center mb-8 mt-3">
      <div className="w-[600px] space-y-4">
        <Title
          title={`Đơn hàng #${order._id?.slice(-6)?.toUpperCase() || "N/A"}`}
        />
        <div className="bg-white p-6 shadow space-y-4 text-h4">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="grid grid-cols-5">
                <p className="text-title_color font-medium">Mã đơn hàng:</p>
                <p className="font-semibold col-span-4">
                  {order._id.slice(-6).toUpperCase()}
                </p>
              </div>
              <div className="grid grid-cols-5 items-center">
                <p className="text-title_color font-medium">Trạng thái:</p>
                <p>
                  <span
                    className={`rounded-full px-2 py-0.5 text-h5 text-center ${
                      colorShipping[order.status as keyof typeof colorShipping]
                    }`}
                  >
                    {
                      statusShipping[
                        order.status as keyof typeof statusShipping
                      ]
                    }
                  </span>
                </p>
              </div>
              <div className="grid grid-cols-5">
                <p className="text-title_color font-medium">Ngày tạo:</p>
                <p className="col-span-4">{formatDate(order.createdAt)}</p>
              </div>
            </div>
            <hr className="my-4" />
            <h2 className="text-lg font-semibold">Thông tin đơn hàng</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 font-medium text-title_color p-2 text-left">
                    Sản phẩm
                  </th>
                  <th className="border border-gray-300 font-medium text-title_color p-2 text-right w-16">
                    SL
                  </th>
                  <th className="border border-gray-300 font-medium text-title_color p-2 text-right w-24">
                    Giá
                  </th>
                  <th className="border border-gray-300 font-medium text-title_color p-2 text-right w-24">
                    Tổng
                  </th>
                </tr>
              </thead>
              {order.orders.map((item: any, index: number) => (
                <tbody key={index}>
                  <tr>
                    <td className="border border-gray-300 p-2">
                      <Link
                        to={`/product/${item.productId._id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {item.productId.nameProduct}
                      </Link>
                    </td>
                    <td className="border border-gray-300 p-2 text-right">
                      {item.quantity}
                    </td>
                    <td className="border border-gray-300 p-2 text-right">
                      {formatPrice(item.productId.price)}₫
                    </td>
                    <td className="border border-gray-300 p-2 text-right">
                      {formatPrice(item.quantity * item.productId.price)}₫
                    </td>
                  </tr>
                </tbody>
              ))}
              <tfoot>
                <tr>
                  <th
                    colSpan={3}
                    className="border border-gray-300 p-2 text-left font-normal"
                  >
                    Phí vận chuyển:
                  </th>
                  <td className="border border-gray-300 p-2 text-right col-span-4">
                    24.000₫
                  </td>
                </tr>
                <tr>
                  <th
                    colSpan={3}
                    className="border border-gray-300 p-2 text-left font-semibold"
                  >
                    Tổng cộng:
                  </th>
                  <td className="border border-gray-300 p-2 text-right font-semibold">
                    {formatPrice(order.total)}₫
                  </td>
                </tr>
              </tfoot>
            </table>
            <hr className="my-4" />
            <div className="space-y-2">
              <div className="grid grid-cols-5 items-start">
                <p className="text-title_color font-medium">Thanh toán:</p>
                <div className="col-span-4">
                  <p className="">Thanh toán trực tuyến</p>
                  <a
                    href="/checkout/processing/?order_id=163832&order_key=wc_order_63k6T5BFnFcAS"
                    className="flex items-center text-red-600 hover:underline mt-1 text-sm"
                  ></a>
                </div>
              </div>
              <div className="grid grid-cols-5">
                <p className="text-title_color font-medium">Vận chuyển:</p>
                <p className="col-span-4">Giao hàng nhanh</p>
              </div>
            </div>
            <hr className="my-4" />
            <h2 className="text-lg font-semibold">Thông tin khách hàng</h2>
            <div className="space-y-2">
              <div className="grid grid-cols-5">
                <p className="text-title_color font-medium">Điện thoại:</p>
                <p className="col-span-4">{order.userId.phone}0987654321</p>
              </div>
              <div className="grid grid-cols-5">
                <p className="text-title_color font-medium">Họ tên:</p>
                <p className="col-span-4">{order.userId.name}</p>
              </div>
              <div className="grid grid-cols-5">
                <p className="text-title_color font-medium">Email:</p>
                <p className="col-span-4">{order.userId.email}</p>
              </div>
              <div className="grid grid-cols-5">
                <p className="text-title_color font-medium">Thành phố:</p>
                <p className="col-span-4">
                  {order.ward}, {order.district}, {order.province}
                </p>
              </div>
              <div className="grid grid-cols-5">
                <p className="text-title_color font-medium">Địa chỉ:</p>
                <p className="col-span-4">{order.address}</p>
              </div>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Ghi chú</h2>
            </div>
            <div className="mt-2">{order.note || "Chưa có ghi chú"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

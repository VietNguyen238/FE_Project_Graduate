import { useSelector } from "react-redux";
import DashboardCard from "../../components/ui/DashboardCard";
import Title from "../../components/ui/Title";
import { useEffect } from "react";
import { getAllProduct } from "../../services/productService";
import { useDispatch } from "react-redux";
import { formatPrice } from "../../components/utils/format_price";
import { getAllOrder } from "../../services/orderService";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { useTitleContext } from "../../context/TitleContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.product.items);
  const orders = useSelector((state: any) => state.order.orders) || [];

  const totalOrder = orders.reduce(
    (total: number, order: { total: number; status: string }) =>
      total + (order?.status === "received" ? order?.total || 0 : 0),
    0
  );

  const totalProductOrder = orders.reduce(
    (
      total: number,
      order: { orders: Array<{ quantity: number }>; status: string }
    ) =>
      total +
      (order?.status === "received"
        ? order?.orders?.reduce(
            (orderTotal, item) => orderTotal + (item?.quantity || 0),
            0
          ) || 0
        : 0),
    0
  );

  const { setTitle } = useTitleContext();

  useEffect(() => {
    setTitle("Bảng điều khiển");
  }, [setTitle]);

  const getLast6Months = () => {
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      months.push(date.toLocaleString("vi-VN", { month: "long" }));
    }
    return months;
  };

  const getMonthlySales = () => {
    const monthlySales = new Array(6).fill(0);
    const currentDate = new Date();

    orders.forEach((order: any) => {
      if (!order?.createdAt || order?.status !== "received") return;
      const orderDate = new Date(order.createdAt);
      const monthDiff =
        (currentDate.getMonth() - orderDate.getMonth() + 12) % 12;

      if (monthDiff < 6) {
        monthlySales[5 - monthDiff] += order.total || 0;
      }
    });

    return monthlySales;
  };

  // Tính toán dữ liệu cho biểu đồ theo ngày
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(
        date.toLocaleDateString("vi-VN", { weekday: "short", day: "numeric" })
      );
    }
    return days;
  };

  const getDailySales = () => {
    const dailySales = new Array(7).fill(0);
    const currentDate = new Date();

    orders.forEach((order: any) => {
      if (!order?.createdAt || order?.status !== "received") return;
      const orderDate = new Date(order.createdAt);
      const dayDiff = Math.floor(
        (currentDate.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (dayDiff < 7) {
        dailySales[6 - dayDiff] += order.total || 0;
      }
    });

    return dailySales;
  };

  const monthlyChartData = {
    labels: getLast6Months(),
    datasets: [
      {
        label: "Doanh số bán hàng theo tháng",
        data: getMonthlySales(),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderColor: "rgb(53, 162, 235)",
        borderWidth: 1,
      },
    ],
  };

  const dailyChartData = {
    labels: getLast7Days(),
    datasets: [
      {
        label: "Doanh số bán hàng theo ngày",
        data: getDailySales(),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Biểu đồ doanh số bán hàng",
      },
    },
  };

  useEffect(() => {
    getAllProduct(dispatch);
    getAllOrder(dispatch);
  }, []);

  return (
    <div>
      <Title title="Bảng điều khiển" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <DashboardCard
          title="Tổng số sản phẩm"
          value={formatPrice(products.length)}
        />
        <DashboardCard
          title="Số sản phẩm đã bán"
          value={formatPrice(totalProductOrder)}
          unit=" sản phẩm"
        />
        <DashboardCard
          title="Tổng doanh số"
          value={formatPrice(totalOrder)}
          isUnit
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 shadow">
          <Bar options={chartOptions} data={monthlyChartData} />
        </div>
        <div className="bg-white p-4 shadow">
          <Line options={chartOptions} data={dailyChartData} />
        </div>
      </div>
    </div>
  );
}

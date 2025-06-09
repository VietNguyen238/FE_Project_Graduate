import { Button, Result } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useOrderContext } from "../context/OrderContext";
import { addOrder } from "../services/orderService";
import { useDispatch } from "react-redux";
import { useTitleContext } from "../context/TitleContext";

function CheckPayment() {
  const searchParams = new URLSearchParams(useLocation().search);
  const [status, setStatus] = useState<"success" | "error">("error");
  const [title, setTitles] = useState<string>("");
  const { order } = useOrderContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { setTitle } = useTitleContext();

  useEffect(() => {
    setTitle("Kiểm tra thanh toán");
  }, [setTitle]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `http://localhost:3000/api/v1/payment/check_payment?${searchParams.toString()}`
      );
      if (data.data.vnp_ResponseCode == "00") {
        setStatus("success");
        setTitles("Thanh toán thành công");
        await addOrder(order, dispatch);
      } else if (data.data.vnp_ResponseCode == "24") {
        setStatus("error");
        setTitles("Khách hàng hủy thanh toán");
      }
    })();
  }, []);

  return (
    <div>
      <Result
        status={status}
        title={title}
        subTitle="Cảm ơn bạn đã sử dụng dịch vụ."
        extra={[
          <Button type="primary" key="console" onClick={() => navigate("/")}>
            Về trang chủ
          </Button>,
        ]}
      />
    </div>
  );
}

export default CheckPayment;

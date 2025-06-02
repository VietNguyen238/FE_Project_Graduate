import { Button, Result } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function CheckPayment() {
  const searchParams = new URLSearchParams(useLocation().search);
  const [status, setStatus] = useState<"success" | "error">("error");
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/v1/payment/check_payment?${searchParams.toString()}`
        );
        if (data.data.vnp_ResponseCode == "00") {
          setStatus("success");
          setTitle("Thanh toán thành công");
        } else if (data.data.vnp_ResponseCode == "24") {
          setStatus("error");
          setTitle("Khách hàng hủy thanh toán");
        }
      } catch (error) {}
    })();
  }, [searchParams]);

  return (
    <div>
      <Result
        status={status}
        title={title}
        subTitle="Cảm ơn bạn đã sử dụng dịch vụ."
        extra={[
          <Button type="primary" key="console">
            Về trang chủ
          </Button>,
        ]}
      />
    </div>
  );
}

export default CheckPayment;

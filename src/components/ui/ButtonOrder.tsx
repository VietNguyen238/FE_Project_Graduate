import { useNavigate } from "react-router-dom";
import { assetsSvg } from "../../constants/assets";

interface Props {
  isPayment?: boolean;
  isOrder?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ButtonOrder({
  onClick,
  isOrder = false,
  isPayment = false,
}: Props) {
  const navigate = useNavigate();

  return (
    <div className="mt-8 flex justify-between">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex items-center justify-center gap-1 hover:bg-zinc-100 rounded-md border border-gray bg-white px-3 py-1 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <span>
          <img
            src={assetsSvg.ic_arown_left}
            alt="ic_arown_left"
            className="h-ic w-ic py-[5px]"
          />
        </span>{" "}
        <span>Quay lại</span>
      </button>
      <button
        onClick={onClick}
        type="button"
        className="ml-3 inline-flex items-center justify-center gap-1 rounded-md border border-transparent bg-blue-600 px-3 py-1 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {isPayment ? (
          <span>Thanh toán</span>
        ) : isOrder ? (
          <span>Đặt hàng</span>
        ) : (
          <span>Tiếp tục</span>
        )}
        <span>
          <img
            src={assetsSvg.ic_arown_right}
            alt="ic_arown_right"
            className="h-ic w-ic py-[5px]"
          />
        </span>{" "}
      </button>
    </div>
  );
}

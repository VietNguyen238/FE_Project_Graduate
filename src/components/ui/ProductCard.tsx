import { formatPrice } from "../utils/format_price";
import { useNavigate } from "react-router-dom";
import { ProductProps } from "../../types";

export default function ProductCard({
  nameProduct,
  imageUrl,
  newPrice,
  price,
  quantity,
  _id,
}: ProductProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/product/${_id}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col justify-center items-center bg-white rounded-lg cursor-pointer hover:scale-105 shadow-md`}
    >
      <div className="relative">
        <img
          className="h-[178px] w-[178px] rounded-t-lg"
          src={imageUrl}
          alt={imageUrl}
        />
        {quantity <= 0 && (
          <>
            <div className="absolute inset-0 bg-black bg-opacity-5 rounded-t-lg" />
            <div className="absolute text-white top-[30%] left-[22%] line text-center px-4 py-7 rounded-full bg-opacity-30 font-medium bg-black">
              Hết hàng
            </div>
          </>
        )}
      </div>
      <div className="p-2 w-full">
        <div className="line-clamp-2 text-sm h-[40px] text-h5">
          {nameProduct}
        </div>
        {newPrice && newPrice > 0 ? (
          <div className="flex justify-between font-medium mt-1">
            <div className="text-h4">{formatPrice(newPrice).trim()}₫</div>
            <div className="text-h4 line-through text-gray">
              {formatPrice(price).trim()}₫
            </div>
          </div>
        ) : (
          <div className="flex text-h4 font-medium mt-1">
            {formatPrice(price).trim()}₫
          </div>
        )}
      </div>
    </div>
  );
}

import { formatPrice } from "../../config/format_price";

interface Props {
  title: string;
  image: string;
  newPrice: number;
  price: number;
  quantity: number;
}

export default function ProductCard({
  title,
  image,
  newPrice,
  price,
  quantity,
}: Props) {
  return (
    <div className="bg-white rounded-lg cursor-pointer hover:scale-105 shadow-md">
      <div className="relative">
        <img
          className="h-[178px] w-[178px] rounded-t-lg"
          src={image}
          alt={image}
        />
        {quantity <= 0 && (
          <div className="absolute text-white top-[30%] left-[22%] line text-center px-4 py-7 rounded-full bg-opacity-50 font-medium bg-black">
            Hết hàng
          </div>
        )}
      </div>
      <div className="p-2">
        <div className="line-clamp-2 text-sm mt-2 h-[42px] text-h5">
          {title}
        </div>
        {newPrice > 0 ? (
          <div className="flex justify-between font-medium mt-1">
            <div className="text-h4">{formatPrice(newPrice)}đ</div>
            <div className="text-h4 line-through text-gray">
              {formatPrice(price)}đ
            </div>
          </div>
        ) : (
          <div className="text-h4 font-medium mt-1">{formatPrice(price)}đ</div>
        )}
      </div>
    </div>
  );
}

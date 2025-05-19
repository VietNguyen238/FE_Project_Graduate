import React from "react";
import { formatPrice } from "../../config/format_price";

interface Props {
  title: string;
  image: string;
  newPrice: number;
  price: number;
}

export default function ProductCard({ title, image, newPrice, price }: Props) {
  return (
    <div className="bg-white rounded-lg cursor-pointer">
      <img
        className="h-[178px] w-[178px] rounded-t-lg"
        src={`./src/assets/images/${image}.jpg`}
        alt={image}
      />
      <div className="p-2">
        <div className="line-clamp-2 text-sm mt-2 text-h5">{title}</div>
        <div className="flex gap-5 font-medium">
          {newPrice > 0 && (
            <div className="text-h4">{formatPrice(newPrice)}đ</div>
          )}
          <div className="text-h4">{formatPrice(price)}đ</div>
        </div>
      </div>
    </div>
  );
}

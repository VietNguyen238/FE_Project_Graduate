import { useState } from "react";
import { assetsSvg } from "../../constants/assets";
import { formatPrice } from "../utils/format_price";

interface Props {
  title: string;
  color: string;
  quantities: number;
  price: number;
  newPrice: number;
  image: string;
  id: string;
  onQuantityChange: (id: string, newQuantity: number) => void;
  onDelete: (id: string) => void;
}

export default function CartCard({
  title,
  color,
  newPrice,
  quantities = 1,
  price,
  image,
  id,
  onQuantityChange,
  onDelete,
}: Props) {
  const [quantity, setQuantity] = useState(quantities);

  const handelMinus = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(id, newQuantity);
    }
  };

  const handelPlus = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(id, newQuantity);
  };

  return (
    <>
      <div className="bg-white p-4">
        <div className="mb-3 flex justify-between items-start">
          <div className="flex items-center justify-start gap-2">
            <img
              className="h-[50px] w-[50px] bg-cover"
              src={image}
              alt={image}
            />

            <div className="">
              <div className="text-h3 text-title_color font-medium">
                {title}
              </div>
              <div className="text-h5 text-gray">màu sắc: {color}</div>
            </div>
          </div>
          <img
            className="h-ic w-ic p-1 cursor-pointer"
            src={assetsSvg.ic_close}
            alt="ic_close"
            onClick={() => onDelete(id)}
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <div className="text-h3">
              Giá:{" "}
              <span className="font-medium text-h4">
                {newPrice == 0 ? formatPrice(price) : formatPrice(newPrice)}₫
              </span>
            </div>
            <div className="text-h3">
              Tạm tính:{" "}
              <span className="font-medium text-h4">
                {formatPrice((newPrice == 0 ? price : newPrice) * quantity)}₫
              </span>{" "}
            </div>
          </div>
          <div className="flex items-center border border-text border-opacity-30 h-[30px]">
            <img
              src={assetsSvg.ic_minus_dark}
              alt="ic_minus_dark"
              className={`p-2 border-r border-text border-opacity-30 h-[30px] w-[30px] ${
                quantity <= 1
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={handelMinus}
            />

            <div className="px-4">{quantity}</div>
            <img
              src={assetsSvg.ic_plus_dark}
              alt="ic_plus_dark"
              className="p-2 border-l border-text border-opacity-30 h-[30px] w-[30px]"
              onClick={handelPlus}
            />
          </div>
        </div>
      </div>
      <div className="px-4 bg-white">
        <hr className="border border-zinc-200"></hr>
      </div>
    </>
  );
}

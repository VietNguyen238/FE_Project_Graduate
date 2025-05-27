import { useState } from "react";
import Button from "../components/ui/Button";
import { assetsImage, assetsSvg } from "../constants/assets";
import Freeship from "../components/ui/Freeship";

const colorProducts = [
  { colorProduct: "xanh" },
  { colorProduct: "đỏ" },
  { colorProduct: "vàng" },
];

const colorClassMap = {
  xanh: "bg-green-500 text-white",
  đỏ: "bg-red-500 text-white",
  vàng: "bg-yellow-500 text-white",
};

const images = [
  { src: assetsImage.im_arduino },
  { src: assetsImage.im_cam_bien },
  { src: assetsImage.im_den_led },
];

export default function ProductDetail() {
  const [image, setImage] = useState(assetsImage.im_arduino);
  const [color, setColor] = useState("");
  const [isShow, setIsShow] = useState(false);

  const handlePrevious = () => {
    const currentIndex = images.findIndex((img) => img.src === image);
    const previousIndex = (currentIndex - 1 + images.length) % images.length;
    setImage(images[previousIndex].src);
  };

  const handleNext = () => {
    const currentIndex = images.findIndex((img) => img.src === image);
    const nextIndex = (currentIndex + 1) % images.length;
    setImage(images[nextIndex].src);
  };

  return (
    <div>
      <div className="p-4 shadow grid grid-cols-12 bg-white">
        <div className="col-span-5 mr-4">
          <div className="h-[354px] w-full relative">
            <img
              src={image}
              alt="im_arduino"
              className="aspect-square w-full"
            />
            <button
              onClick={handlePrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 hover:bg-white/25 p-2 rounded-full"
            >
              <img
                className="h-ic w-ic p-1"
                src={assetsSvg.ic_arows_left}
                alt="ic_arows_left"
              />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-white/25 p-2 rounded-full"
            >
              <img
                className="h-ic w-ic p-1"
                src={assetsSvg.ic_arows_right}
                alt="ic_arows_right"
              />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {images.map((item, index) => (
              <img
                onMouseEnter={() => setImage(item.src)}
                key={index}
                src={item.src}
                alt={item.src}
                className="col-span-1 w-full aspect-square object-cover cursor-pointer"
              />
            ))}
          </div>
        </div>
        <div className="col-span-7 text-title_color">
          <div className="text-h2 font-medium">
            Mạch điều khiển máy in 3D RAMPS 1.6
          </div>
          <div className="text-h4 text-gray">
            Driver circuit 3D printer RAMPS 1.6
          </div>
          <div className="text-h2 font-bold text-rose-600 mt-2">149.000₫</div>
          <div className="text-h4  mt-2">
            Mã sản phẩm: <span className="font-medium">7JXU</span>
          </div>
          <div className="mt-2 w-[145px]">
            <Button
              icon={assetsSvg.ic_cart}
              bg_color="bg-red-500"
              text_color="text-white"
              title="Mua hàng"
              disabled={true}
            />
          </div>
          <div className="text-red-600 font-medium mt-2">
            Sản phẩm hiện đang hết hàng.
          </div>
          <div className="text-h4 mt-3">
            Mạch điều khiển máy in 3D RAMPS 1.6 Chân I2C và SPI có sẵn để mở
            rộng thêm, Có led báo trạng thái hoạt động, Tích hợp cầu chì tự phục
            hồi 5A bảo vệ toàn bộ mạch
          </div>
          <div className="text-h4 font-bold mt-6">SẢN PHẨM CÙNG LOẠI</div>
          <div className="text-h4 mt-2 flex gap-4">
            {colorProducts.map((item, index) => (
              <div
                key={index}
                onClick={() => setColor(item.colorProduct)}
                className={`px-3 shadow rounded cursor-pointer py-1 ${
                  color === item.colorProduct
                    ? colorClassMap[
                        item.colorProduct as keyof typeof colorClassMap
                      ]
                    : ""
                }`}
              >
                {" "}
                {item.colorProduct}{" "}
              </div>
            ))}
          </div>
          <div className="text-h4 font-bold mt-6">
            DỊCH VỤ & KHUYẾN MÃI LIÊN QUAN
          </div>
          <div className="mt-2 text-caption text-title_color flex gap-2 bg-zinc-200 px-2 py-1 border border-zinc-300">
            <img
              className="h-ic w-ic"
              src={assetsImage.im_membership}
              alt="im_membership"
            />
            Cộng thêm 14 điểm tích lũy
          </div>
          <div
            className="mt-2 text-caption text-title_color flex gap-2 bg-zinc-200 px-2 py-1 border border-zinc-300 cursor-pointer"
            onClick={() => setIsShow(!isShow)}
          >
            <img className="h-ic w-ic" src={assetsImage.im_car} alt="im_car" />
            <div className="">
              <span>
                Đơn hàng có giá trị từ 300.000 (đ), miễn phí vận chuyển [ tối đa
                15.000 (đ) ].
              </span>
              <span>
                Đơn hàng có giá trị từ 500.000 (đ), miễn phí vận chuyển [ tối đa
                35.000 (đ) ].
              </span>
              <span>Xem thêm các khuyến mãi vận chuyển khác.</span>
            </div>
          </div>
        </div>
      </div>
      {isShow && <Freeship isOpen={isShow} onClose={() => setIsShow(false)} />}
      <div className="p-4 shadow mt-4 bg-white">
        <div className="font-medium text-h3">Chi tiết sản phẩm</div>
        <div className="text-h3"></div>
      </div>
      <div className="p-4 shadow mt-4 bg-white">
        <div className="font-medium text-h3">Sản phẩm liên quan</div>
      </div>
      <div className=""></div>
    </div>
  );
}

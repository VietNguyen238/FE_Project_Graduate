import { Line } from "rc-progress";
import { assetsSvg } from "../../constants/assets";

interface Props {
  totalProduct: number;
}

export default function ProgressBar({ totalProduct }: Props) {
  const percent = totalProduct / (500000 / 100);
  const reamainingPrice = 300000 - totalProduct;

  return (
    <div className="">
      <div className="flex justify-end gap-[22%]">
        <div className="text-caption text-title_color">Freeship 15k</div>
        <div className="text-caption text-title_color">Freeship 35k</div>
      </div>
      <div className="relative my-2">
        <Line
          percent={percent}
          strokeWidth={1}
          strokeColor="#1e8ae2"
          className="mx-2 py-1 bg-[#ecf1f5]"
          trailColor="#ecf1f5"
        />
        <div className="absolute bottom-[-5px] h-[24px] w-[24px] rounded-full bg-[#1e8ae2] border border-transparent"></div>
        <div
          className={`absolute bottom-[-5px] right-[38%] h-[24px] w-[24px] rounded-full ${
            totalProduct >= 300000 ? "bg-[#1e8ae2]" : "bg-[#ecf1f5]"
          } p-1 border border-transparent`}
        >
          {totalProduct >= 300000 && (
            <img src={assetsSvg.ic_tick} alt="ic_tick" />
          )}
        </div>
        <div
          className={`absolute bottom-[-5px] right-0 h-[24px] w-[24px] rounded-full ${
            totalProduct >= 500000 ? "bg-[#1e8ae2]" : "bg-[#ecf1f5]"
          } p-1 border border-transparent`}
        >
          {totalProduct >= 500000 && (
            <img src={assetsSvg.ic_tick} alt="ic_tick" />
          )}
        </div>
      </div>
      <div className="text-h5 text-title_color flex justify-center w-full">
        {totalProduct >= 300000
          ? "Đơn hàng đã đủ điều kiện Freeship"
          : `Mua thêm ${reamainingPrice}₫ để được Freeship`}
      </div>
    </div>
  );
}

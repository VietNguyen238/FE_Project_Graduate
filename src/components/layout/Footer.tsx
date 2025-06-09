import { memo } from "react";
import { assetsImage } from "../../constants/assets";

function Footer() {
  return (
    <div className="flex w-full justify-center text-title_color text-h4 p-4">
      <div className="flex bg-white w-page justify-between">
        <div className="">
          <nav className="text-gray">
            <a href="/chinh-sach-bao-hanh/" className="text-link">
              Bảo hành
            </a>{" "}
            <span>|</span>{" "}
            <a href="/chinh-sach-doi-tra/" className="text-link">
              Đổi trả
            </a>{" "}
            <span>|</span>{" "}
            <a href="/chinh-sach-bao-mat/" className="text-link">
              Bảo mật
            </a>{" "}
            <span>|</span>{" "}
            <a href="/dieu-khoan/" className="text-link">
              Điều khoản
            </a>
          </nav>{" "}
          <p>Hộ kinh doanh Linh kiện điện tử Vshop</p>{" "}
          <p>
            <strong>Linh kiện điện tử VShop</strong>: 71 Nguyễn Duy, Khuê Trung,
            Cẩm Lệ, TP. Đà Nẵng – 📞 0389 58 72 53
          </p>{" "}
          <p>
            <strong>VSHOPVN.COM © 2025 - 2025</strong>
          </p>
        </div>
        <div className="flex justify-center items-center gap-2">
          <img
            className="h-[28px]"
            src={assetsImage.im_protect}
            alt="im_protect"
          />
          <img
            className="w-[180px]"
            src={assetsImage.im_dathongbao}
            alt="im_dathongbao"
          />
        </div>
      </div>
    </div>
  );
}

export default memo(Footer);

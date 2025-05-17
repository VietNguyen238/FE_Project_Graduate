import React from "react";

export default function Footer() {
  return (
    <div className="flex w-full justify-center text-title text-h4">
      <div className="flex bg-white m-4 w-page justify-between">
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
          <p>
            Hộ kinh doanh Linh kiện điện tử Nshop / GPĐKKD số: 41X8035261 do
            UBND Quận Tân Phú cấp ngày 08/05/2019
          </p>{" "}
          <p>
            <strong>Điện tử NShop Tân Phú</strong>: 1 Bùi Xuân Phái, Tây Thạnh,
            Tân Phú, TP. HCM – 📞 0902 64 39 78
          </p>{" "}
          <p>
            <strong>Điện tử NShop Quận 9</strong>: 7 Trần Hưng Đạo, Hiệp Phú,
            Quận 9, TP. HCM – 📞 093 27 23 186
          </p>{" "}
          <p>
            <strong>NSHOPVN.COM © 2019 - 2021</strong>
          </p>
        </div>
        <div className="flex justify-center items-center gap-2">
          <img
            className="h-[28px]"
            src="./src/assets/images/im_protect.png"
            alt="im_protect"
          />
          <img
            className="w-[180px]"
            src="./src/assets/images/im_dathongbao.png"
            alt="im_dathongbao"
          />
        </div>
      </div>
    </div>
  );
}

import { assetsSvg } from "../../constants/assets";

interface FreeshipProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Freeship({ isOpen, onClose }: FreeshipProps) {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-4 shadow-lg w-[600px] overflow-y-auto">
        <a className="absolute top-4 right-4 cursor-pointer" onClick={onClose}>
          <img
            className="h-ic w-ic p-1"
            src={assetsSvg.ic_close}
            alt="ic_close"
          />
        </a>
        <div className="h-[700px]">
          <h1 className="text-h3 font-medium mb-4 text-left">
            MIỄN PHÍ VẬN CHUYỂN
            <hr className="text-zinc-300"></hr>
          </h1>
          <div className="text-h4">
            <h2 className="text-xl font-medium mt-3 mb-3">
              QUY ĐỊNH VẬN CHUYỂN
            </h2>
            <figure className="mb-4 text-h4 flex justify-center">
              <table className="table-auto border-collapse border border-gray mx-auto text-center">
                <tbody>
                  <tr className="bg-gray-100 font-medium">
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      Tuyến
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      Khối lượng
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      Nội Thành
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      Huyện/Xã *
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      Thêm 0.5kg (hàng dưới 4kg)
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      Thêm 0.5kg (hàng từ 4kg trở lên)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      Nội tỉnh
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      0-3kg
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      24,000
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      24,000
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      2,500
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      4,000
                    </td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      Nội vùng – Nội vùng tỉnh
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      0-2kg
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      24,000
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      24,000
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      4,000
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      7,000
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      Liên vùng đặc biệt
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      0-2kg
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      24,000
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      24,000
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      5,000
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      7,000
                    </td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      Liên vùng – Liên vùng tỉnh
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      0-2kg
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      24,000
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      24,000
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      5,000
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      7,000
                    </td>
                  </tr>
                </tbody>
              </table>
            </figure>

            <h2 className="text-xl font-medium mt-6 mb-3">
              KHUYẾN MÃI PHÍ VẬN CHUYỂN
            </h2>

            <p className="mb-4">
              📌 Thời gian áp dụng: từ 0h00 ngày 14-07-2023 cho đến khi có thông
              báo mới
            </p>

            <h3 className="text-h2 font-medium mt-4 mb-2">
              GIAO SIÊU TỐC&nbsp;NỘI THÀNH TP. HỒ CHÍ MINH
            </h3>

            <figure className="block mx-auto my-4">
              <img
                loading="lazy"
                decoding="async"
                width="1024"
                height="341"
                src="https://nshopvn.com/wp-content/uploads/2023/07/sieutoc-copy-2-1024x341.jpg"
                alt="sieutoc-copy-2"
                className="wp-image-117945 max-w-full h-auto"
                srcSet="https://nshopvn.com/wp-content/uploads/2023/07/sieutoc-copy-2-1024x341.jpg 1024w, https://nshopvn.com/wp-content/uploads/2023/07/sieutoc-copy-2-300x100.jpg 300w, https://nshopvn.com/wp-content/uploads/2023/07/sieutoc-copy-2-768x256.jpg 768w, https://nshopvn.com/wp-content/uploads/2023/07/sieutoc-copy-2-1536x512.jpg 1536w, https://nshopvn.com/wp-content/uploads/2023/07/sieutoc-copy-2-600x200.jpg 600w, https://nshopvn.com/wp-content/uploads/2023/07/sieutoc-copy-2.jpg 2048w"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </figure>

            <p className="mb-4">
              🚀 Giao siêu tốc trong vòng 01 giờ tất cả các quận nội thành Tp.
              HCM (ngoại trừ các huyện trực thuộc)
            </p>

            <p className="mb-4">
              🛫<span className="font-medium"> Giao nhanh trong ngày </span>
              (hàng được giao đến sau
              <span className="font-medium">từ 03 đến 04 giờ </span>kể từ lúc
              xác nhận đơn)
            </p>

            <ul className="list-disc ml-5">
              <li>
                Đơn hàng có giá trị<span className="font-medium">dưới </span>{" "}
                300.000&nbsp;(đ), phí vận chuyển áp dụng theo phí dịch vụ của
                Ahamove
              </li>
              <li>
                Đơn hàng có giá trị&nbsp;từ 300.000 (đ),{" "}
                <span className="font-medium">miễn phí vận chuyển </span>[ tối
                đa 15.000 (đ) ]
              </li>
              <li>
                Đơn hàng có giá trị&nbsp;từ 500.000 (đ),{" "}
                <span className="font-medium">miễn phí vận chuyển </span>[ tối
                đa 35.000 (đ) ]
              </li>
            </ul>

            <p className="mb-4">
              <div className="font-medium">Lưu ý:</div>{" "}
              <div className="">
                + Với dịch vụ giao trong ngày, NSHOP chỉ nhận và hỗ trợ đặt đơn
                trước 17h, sau 17h quý khách có thể tự book vận chuyển và chuyển
                khoản thanh toán trước.
              </div>
              <div className="">
                + Thông tin nhận chuyển khoản: Số tài khoản 218700559 –&nbsp;Võ
                Thành Nam –&nbsp;ACB – CN. Hồ Chí Minh.
              </div>
            </p>

            <h3 className="text-h2 font-medium mt-4 mb-2">
              GIAO NHANH&nbsp;QUA CÁC HÃNG VẬN CHUYỂN
            </h3>

            <figure className="block mx-auto my-4">
              <img
                loading="lazy"
                decoding="async"
                width="1024"
                height="341"
                src="https://nshopvn.com/wp-content/uploads/2023/07/freeship-toan-quoc-2-1024x341.png"
                alt="freeship-toan-quoc-2"
                className="wp-image-117944 max-w-full h-auto"
                srcSet="https://nshopvn.com/wp-content/uploads/2023/07/freeship-toan-quoc-2-1024x341.png 1024w, https://nshopvn.com/wp-content/uploads/2023/07/freeship-toan-quoc-2-300x100.png 300w, https://nshopvn.com/wp-content/uploads/2023/07/freeship-toan-quoc-2-768x256.png 768w, https://nshopvn.com/wp-content/uploads/2023/07/freeship-toan-quoc-2-1536x512.png 1536w, https://nshopvn.com/wp-content/uploads/2023/07/freeship-toan-quoc-2-600x200.png 600w, https://nshopvn.com/wp-content/uploads/2023/07/freeship-toan-quoc-2.png 2048w"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </figure>

            <p className="mb-4 font-medium">🛫 TOÀN QUỐC</p>

            <ul className="list-disc ml-5">
              <li>
                Đơn hàng có giá trị
                <span className="font-medium"> dưới 300.000(đ)</span>, phí vận
                chuyển áp dụng theo phí dịch vụ vận chuyển thông thường.
              </li>
              <li>
                Đơn hàng có giá trị
                <span className="font-medium">
                  {" "}
                  từ 300.000 (đ), miễn phí vận chuyển{" "}
                </span>
                [ tối đa 15.000 (đ) ].
              </li>
              <li>
                Đơn hàng có giá trị
                <span className="font-medium">
                  trên 500.000 (đ), miễn phí vận chuyển{" "}
                </span>
                [ tối đa 35.000 (đ) ].
              </li>
            </ul>

            <h2 className="text-xl font-medium mt-6 mb-3">QUY ĐỊNH CHUNG</h2>

            <ul className="list-disc mb-4 ml-5">
              <li>
                <span className="font-medium"> Đơn hàng có giá trị</span> được
                hiểu là{" "}
                <span className="font-medium">
                  tổng giá trị tiền quý khách cần thanh toán cho đơn hàng,
                </span>{" "}
                nhưng không bao gồm phí vận chuyển và thuế VAT (nếu có).
              </li>
              <li>
                Đối với dịch vụ giao trong ngày:
                <ul className="list-disc ml-4">
                  <li>
                    Đơn vị vận chuyển chỉ nhận thu hộ tối đa 500.000 đ, vì vậy
                    khi giá trị đơn lớn hơn 500.000 đ quý khách cần chuyển khoản
                    thanh toán trước.
                  </li>
                  <li>
                    Và NSHOP chỉ nhận và hỗ trợ đặt đơn trước 17h, do đó sau 17h
                    quý khách có thể tự book vận chuyển và cũng cần chuyển khoản
                    thanh toán trước.
                  </li>
                </ul>
              </li>
              <li>
                Với các dịch vụ vận chuyển còn lại. Những đơn đặt sau 16h sẽ
                được vận chuyển vào ngày hôm sau.
              </li>
              <li>
                Thông tin nhận chuyển khoản: Số tài khoản 218700559 – Võ Thành
                Nam – ACB - CN. Hồ Chí Minh.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

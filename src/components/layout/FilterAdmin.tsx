import { Link } from "react-router-dom";
import { ChildrenProps } from "../../types";
import { useState } from "react";
import { assetsSvg } from "../../constants/assets";

export default function FilterAdmin({ children }: ChildrenProps) {
  const [current, setCurrent] = useState(0);
  const [subCurrent, setSubCurrent] = useState(0);
  const [showProducts, setShowProducts] = useState(false);

  const menuItems = [
    { path: "/admin", label: "Bảng điều khiển" },
    { path: "/admin/product", label: "Quản lý sản phẩm" },
    { path: "/admin/orders", label: "Đơn hàng" },
  ];
  const productItems = [
    { path: "/admin/product", label: "Danh sách sản phẩm" },
    { path: "/admin/product/add", label: "Thêm sản phẩm" },
  ];

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2 bg-dark_blue text-white sticky h-screen top-[52px]">
        <div className="flex flex-col h-screen">
          {menuItems.map((item, index) => (
            <div key={item.path}>
              <Link
                to={item.path}
                className={`py-2 pl-5 pr-2 flex justify-between hover:bg-[#00417c] group ${
                  current === index && "bg-[#00427e]"
                }`}
                onClick={() => {
                  setCurrent(index);
                  if (item.label === "Quản lý sản phẩm") {
                    setShowProducts(!showProducts);
                  }
                }}
              >
                {item.label}
                {item.label === "Quản lý sản phẩm" &&
                  (showProducts ? (
                    <img
                      src={assetsSvg.ic_arows_down}
                      alt="ic_arows_down"
                      className="h-ic w-ic p-1"
                    />
                  ) : (
                    <img
                      src={assetsSvg.ic_arows_right_light}
                      alt="ic_arows_right_light"
                      className="h-ic w-ic p-1"
                    />
                  ))}
              </Link>
              {item.label === "Quản lý sản phẩm" && showProducts && (
                <div className="flex flex-col group-hover:">
                  {productItems.map((subItem, subIndex) => (
                    <Link
                      key={subItem.path}
                      to={subItem.path}
                      className={`py-2 px-5 bg-[#002445] hover:bg-[#1f4468] pl-10 ${
                        subCurrent === subIndex ? "bg-[#1b5388]" : ""
                      }`}
                      onClick={() => setSubCurrent(subIndex)}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-10 bg-main mx-10">{children}</div>
    </div>
  );
}

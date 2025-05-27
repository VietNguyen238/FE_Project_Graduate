import Title from "../components/ui/Title";
import {
  getProvinces,
  getDistrictsByProvinceCode,
  getWardsByDistrictCode,
} from "sub-vn";
import { useState, useEffect } from "react";
import Option from "../components/ui/Option";
import { formatPrice } from "../components/utils/format_price";
import { assetsSvg } from "../constants/assets";

export default function Shipping() {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [address, setAddress] = useState("");
  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState("express");

  const provinces = getProvinces();
  const districts = selectedProvince
    ? getDistrictsByProvinceCode(selectedProvince)
    : [];
  const wards = selectedDistrict
    ? getWardsByDistrictCode(selectedDistrict)
    : [];

  const selectedProvinceName =
    provinces.find((p) => p.code === selectedProvince)?.name || "";
  const selectedDistrictName =
    districts.find((d) => d.code === selectedDistrict)?.name || "";
  const selectedWardName =
    wards.find((w) => w.code === selectedWard)?.name || "";
  const fullAddress =
    `${address}, ${selectedWardName}, ${selectedDistrictName}, ${selectedProvinceName}`
      .replace(/^,\s*/, "")
      .replace(/,\s*,/g, ",");

  useEffect(() => {
    console.log("=== Thông tin vận chuyển ===");
    console.log("Tỉnh/Thành phố:", selectedProvinceName);
    console.log("Quận/Huyện:", selectedDistrictName);
    console.log("Phường/Xã:", selectedWardName);
    console.log("Địa chỉ chi tiết:", address);
    console.log("Địa chỉ đầy đủ:", fullAddress);
    console.log("========================");
  }, [selectedProvince, selectedDistrict, selectedWard, address]);

  return (
    <div className="flex justify-center items-center py-8">
      <div className="w-full max-w-2xl px-4">
        <Title title="Đặt hàng - Thông tin vận chuyển" />
        <div className="container mx-auto bg-white p-6 shadow-md rounded-lg">
          <div className="space-y-6">
            <Option
              htmlFor="province"
              option="Chọn tỉnh thành..."
              list={provinces}
              onChange={(e) => setSelectedProvince(e.target.value)}
              selected={selectedProvince}
              title="Tỉnh / Thành phố"
            />
            <Option
              htmlFor="district"
              option="Chọn quận huyện..."
              list={districts}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              selected={selectedDistrict}
              title="Quận huyện"
            />
            <Option
              htmlFor="ward"
              option="Chọn Phường xã..."
              list={wards}
              onChange={(e) => setSelectedWard(e.target.value)}
              selected={selectedWard}
              title="Phường xã"
            />
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Địa chỉ
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Nhập địa chỉ"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border py-1 px-2 border-zinc-400  focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
          </div>

          {/* Shipping Method */}
          <div className="mt-8">
            <h3 className="text-base font-medium text-gray-900 mb-4">
              Chọn phương thức vận chuyển
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div
                className={`relative flex items-center rounded-lg border ${
                  selectedShippingMethod === "express"
                    ? "border-blue-500"
                    : "border-gray-300"
                } bg-white p-4 shadow-sm cursor-pointer`}
                onClick={() => setSelectedShippingMethod("express")}
              >
                <div className="flex items-center">
                  <input
                    id="shipping-method-express"
                    name="shipping-method"
                    type="radio"
                    checked={selectedShippingMethod === "express"}
                    onChange={() => setSelectedShippingMethod("express")}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="shipping-method-express"
                    className="ml-3 flex flex-col"
                  >
                    <span className="block text-sm font-medium text-gray-900">
                      Giao hàng nhanh
                    </span>
                    <span className="block text-sm text-gray-500">
                      {address ? `${formatPrice(24000)}đ` : "Chưa nhập địa chỉ"}
                    </span>
                  </label>
                </div>
                <div className="ml-auto">
                  <img src={assetsSvg.ic_shipping} alt="ic_shipping" />
                </div>
              </div>
              {selectedProvinceName === "Thành phố Hồ Chí Minh" && (
                <div
                  className={`relative flex items-center rounded-lg border ${
                    selectedShippingMethod === "super-express"
                      ? "border-blue-500"
                      : "border-gray-300"
                  } bg-white p-4 shadow-sm cursor-pointer`}
                  onClick={() => setSelectedShippingMethod("super-express")}
                >
                  <div className="flex items-center">
                    <input
                      id="shipping-method-super-express"
                      name="shipping-method"
                      type="radio"
                      checked={selectedShippingMethod === "super-express"}
                      onChange={() =>
                        setSelectedShippingMethod("super-express")
                      }
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="shipping-method-super-express"
                      className="ml-3 flex flex-col"
                    >
                      <span className="block text-sm font-medium text-gray-900">
                        Giao siêu tốc (1h)
                      </span>
                      <span className="block text-sm text-gray-500">
                        {`${formatPrice(26000)}đ`}
                      </span>
                    </label>
                  </div>
                  <div className="ml-auto">
                    <img
                      src={assetsSvg.ic_shipping_express}
                      alt="ic_shipping_express"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              &larr; Quay lại
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Tiếp tục &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import Title from "../components/ui/Title";
import {
  getProvinces,
  getDistrictsByProvinceCode,
  getWardsByDistrictCode,
} from "sub-vn";
import { useEffect, useState } from "react";
import Option from "../components/ui/Option";
import InputText from "../components/ui/InputText";
import ButtonOrder from "../components/ui/ButtonOrder";
import { FormAddress } from "../components/utils/validate";
import { ZodError } from "zod";
import ShippingMethodList from "../components/ui/ShippingMethodList";
import { shippingMethods } from "../constants";
import { useNavigate } from "react-router";
import { ShippingProps } from "../types";
import { useSelector } from "react-redux";
import { getAddress, updateUserAddress } from "../services/addressService";
import { useDispatch } from "react-redux";
import { getUser } from "../services/userService";
import { useOrderContext } from "../context/OrderContext";

export default function Shipping() {
  const [formData, setFormData] = useState<ShippingProps>({
    province: "",
    district: "",
    ward: "",
    address: "",
    shippingMethod: "",
    shippingFee: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const address = useSelector((state: any) => state.user.address);
  const user = useSelector((state: any) => state.user.user);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const provinces = getProvinces();
  const districts = formData.province
    ? getDistrictsByProvinceCode(formData.province)
    : [];
  const wards = formData.district
    ? getWardsByDistrictCode(formData.district)
    : [];
  const { setOrder } = useOrderContext();

  const handleChange = (field: keyof ShippingProps, value: string | number) => {
    setFormData((prev) => {
      let newData = { ...prev };
      if (field === "province") {
        newData.district = "";
        newData.ward = "";
      } else if (field === "district") {
        newData.ward = "";
      }
      if (field === "shippingFee") {
        newData.shippingFee = value as number;
      } else if (field === "shippingMethod") {
        newData.shippingMethod = value as string;
      } else {
        newData[field] = value as string;
      }
      return newData;
    });

    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const selectedProvinceName =
        provinces.find((p) => p.code === formData.province)?.name || "";
      const selectedDistrictName =
        districts.find((d) => d.code === formData.district)?.name || "";
      const selectedWardName =
        wards.find((w) => w.code === formData.ward)?.name || "";
      const selectedMethodName =
        shippingMethods.find((m) => m.id === formData.shippingMethod)?.name ||
        "";

      const formattedData = {
        province: selectedProvinceName,
        district: selectedDistrictName,
        ward: selectedWardName,
        address: formData.address,
        userId: user.id,
        shippingFee: formData.shippingFee,
        shippingMethod: selectedMethodName,
      };
      FormAddress.parse(formattedData);
      setErrors({});

      if (address && address.userId) {
        const hasChanges =
          address.province !== formattedData.province ||
          address.district !== formattedData.district ||
          address.ward !== formattedData.ward ||
          address.address !== formattedData.address;
        if (hasChanges) {
          await updateUserAddress(formattedData, dispatch);
        }
      }

      setOrder(formattedData as any);
      navigate("/checkout/payment");
    } catch (error) {
      if (error instanceof ZodError) {
        setErrors(
          error.errors.reduce(
            (acc, err) => ({
              ...acc,
              [err.path[0]]: err.message,
            }),
            {}
          )
        );
      }
    }
  };

  useEffect(() => {
    const fetchAddress = async () => {
      setIsLoading(true);
      try {
        await getAddress(dispatch);
        await getUser(dispatch);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddress();
  }, []);

  useEffect(() => {
    if (address) {
      const provinceCode =
        provinces.find((p) => p.name === address.province)?.code || "";
      const districtsList = provinceCode
        ? getDistrictsByProvinceCode(provinceCode)
        : [];
      const districtCode =
        districtsList.find((d) => d.name === address.district)?.code || "";
      const wardsList = districtCode
        ? getWardsByDistrictCode(districtCode)
        : [];
      const wardCode =
        wardsList.find((w) => w.name === address.ward)?.code || "";

      setFormData((prev) => ({
        ...prev,
        province: provinceCode,
        district: districtCode,
        ward: wardCode,
        address: address.address || "",
        shippingMethod: address.shippingMethod || "",
        shippingFee: address.shippingFee || 0,
      }));
    }
  }, [address]);

  const availableShippingMethods = shippingMethods.filter((method) => {
    if (method.id === "super-express") {
      return formData.province === "79";
    }
    return true;
  });

  const addressFields = [
    {
      id: "province" as keyof ShippingProps,
      title: "Tỉnh / Thành phố",
      option: "Chọn tỉnh thành...",
      list: provinces,
      value: formData.province,
    },
    {
      id: "district" as keyof ShippingProps,
      title: "Quận huyện",
      option: "Chọn quận huyện...",
      list: districts,
      value: formData.district,
    },
    {
      id: "ward" as keyof ShippingProps,
      title: "Phường xã",
      option: "Chọn Phường xã...",
      list: wards,
      value: formData.ward,
    },
  ];
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center py-8">
      <div className="w-full max-w-2xl px-4">
        <Title title="Đặt hàng - Thông tin vận chuyển" />
        <div className="container mx-auto bg-white p-6 shadow-md">
          <div className="space-y-6">
            {addressFields.map((field) => (
              <div key={field.id}>
                <Option
                  htmlFor={field.id}
                  option={field.option}
                  list={field.list}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  selected={field.value}
                  title={field.title}
                />
                {errors[field.id] && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors[field.id]}
                  </p>
                )}
              </div>
            ))}
            <div>
              <InputText
                onChange={(e) => handleChange("address", e.target.value)}
                title="địa chỉ"
                type="text"
                value={formData.address}
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">{errors.address}</p>
              )}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-base font-medium text-gray-900 mb-4">
              Chọn phương thức vận chuyển
            </h3>
            <ShippingMethodList
              methods={availableShippingMethods}
              selectedMethod={formData.shippingMethod}
              onSelect={(methodId) => {
                const selectedMethod = shippingMethods.find(
                  (m) => m.id === methodId
                );
                if (selectedMethod) {
                  handleChange("shippingFee", selectedMethod.price);
                  handleChange("shippingMethod", methodId);
                }
              }}
              address={formData.address}
            />
            {errors.shippingFee && (
              <p className="mt-2 text-sm text-red-600">{errors.shippingFee}</p>
            )}
          </div>
          <ButtonOrder onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

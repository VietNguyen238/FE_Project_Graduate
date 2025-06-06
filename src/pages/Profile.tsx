import Title from "../components/ui/Title";
import { useState, useEffect } from "react";
import { AddressProps } from "../types";
import { useSelector } from "react-redux";
import {
  getProvinces,
  getDistrictsByProvinceCode,
  getWardsByDistrictCode,
} from "sub-vn";
import { getAddress, updateUserAddress } from "../services/addressService";
import { useDispatch } from "react-redux";
import { getUser, updateUser } from "../services/userService";
import InputText from "../components/ui/InputText";
import Button from "../components/ui/Button";
import { FormProfile } from "../components/utils/validate";
import Option from "../components/ui/Option";
import { useNavigate } from "react-router";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state: any) => state.user.user);
  const address = useSelector((state: any) => state.user.address);
  const [formData, setFormData] = useState<AddressProps>({
    province: address.province,
    district: address.district,
    ward: address.ward,
    address: address.address,
  });
  const [name, setName] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const provinces = getProvinces();
  const districts = formData.province
    ? getDistrictsByProvinceCode(formData.province)
    : [];
  const wards = formData.district
    ? getWardsByDistrictCode(formData.district)
    : [];

  const handleChange = (field: keyof AddressProps, value: string) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };
      if (field === "province") {
        newData.district = "";
        newData.ward = "";
      } else if (field === "district") {
        newData.ward = "";
      }
      return newData;
    });
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setErrors((prev) => ({ ...prev, name: "" }));
  };

  const handleSubmit = async () => {
    try {
      const selectedProvinceName =
        provinces.find((p) => p.code === formData.province)?.name || "";
      const selectedDistrictName =
        districts.find((d) => d.code === formData.district)?.name || "";
      const selectedWardName =
        wards.find((w) => w.code === formData.ward)?.name || "";

      const validationData = {
        name,
        province: selectedProvinceName,
        district: selectedDistrictName,
        ward: selectedWardName,
        address: formData.address,
      };

      const result = FormProfile.safeParse(validationData);

      if (!result.success) {
        const validationErrors: Record<string, string> = {};
        result.error.errors.forEach((err) => {
          const field = err.path[0] as string;
          validationErrors[field] = err.message;
        });
        setErrors(validationErrors);
        return;
      }

      if (name !== user?.name) {
        await updateUser({ name }, dispatch);
        await getUser(dispatch);
      }

      const hasAddressChanged =
        selectedProvinceName !== address?.province ||
        selectedDistrictName !== address?.district ||
        selectedWardName !== address?.ward ||
        formData.address !== address?.address;

      if (hasAddressChanged) {
        await updateUserAddress(validationData, dispatch);
        await getAddress(dispatch);
      }

      navigate("/account");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

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

      setFormData({
        province: provinceCode,
        district: districtCode,
        ward: wardCode,
        address: address.address || "",
      });
    }
  }, [address]);

  const addressFields = [
    {
      id: "province" as keyof AddressProps,
      title: "Tỉnh / Thành phố",
      option: "Chọn tỉnh thành...",
      list: provinces,
      value: formData.province,
    },
    {
      id: "district" as keyof AddressProps,
      title: "Quận huyện",
      option: "Chọn quận huyện...",
      list: districts,
      value: formData.district,
    },
    {
      id: "ward" as keyof AddressProps,
      title: "Phường xã",
      option: "Chọn Phường xã...",
      list: wards,
      value: formData.ward,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
  }, []);

  if (isLoading || !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center mb-8 mt-3">
      <div className="w-[600px]">
        <Title title="Thông tin tài khoản" />
        <div className="bg-white p-4 shadow-md">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="space-y-4 text-h4"
          >
            <div className="grid grid-cols-5 items-center pb-2 border-b">
              <span className="font-medium">Số điện thoại:</span>
              <span className="col-span-4">{user.phone}</span>
            </div>

            <div className="grid grid-cols-5 items-start pb-2 border-b">
              <span className="w-1/3 font-medium">Email:</span>
              <span className="col-span-4">{user.email}</span>
            </div>

            <InputText
              title="Họ và Tên"
              value={name}
              type="text"
              onChange={handleNameChange}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
            <div className="space-y-6">
              {addressFields.map((field) => (
                <div key={field.id}>
                  <Option
                    htmlFor={field.id}
                    option={field.option}
                    list={field.list}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      handleChange(field.id, e.target.value)
                    }
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
              <Button
                title="Lưu"
                bg_color="bg-blue-600 hover:bg-blue-500"
                text_color="text-white"
                onClick={handleSubmit}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;

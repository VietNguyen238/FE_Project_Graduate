import { useEffect, useRef, useState } from "react";
import InputText from "../components/ui/InputText";
import Title from "../components/ui/Title";
import Button from "../components/ui/Button";
import { FormField, RegisterProps } from "../types";
import { assetsSvg } from "../constants/assets";
import { Link } from "react-router";

export default function Register() {
  const [formData, setFormData] = useState<RegisterProps>({
    phone: "",
    email: "",
    name: "",
    password: "",
  });
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  const handleChange =
    (field: keyof RegisterProps) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    console.log(formData);
    setFormData({ phone: "", email: "", name: "", password: "" });
    firstInputRef.current?.focus();
  };

  const formFields: FormField[] = [
    { field: "phone", title: "số điện thoại", type: "text" },
    { field: "email", title: "email", type: "email" },
    { field: "name", title: "tên", type: "text" },
    { field: "password", title: "mật khẩu", type: "password" },
  ];

  return (
    <div className="flex justify-center mb-8 mt-3">
      <div className="w-[600px]">
        <Title title="Đăng ký" />
        <div className="bg-white p-6 shadow">
          <form onSubmit={handleSubmit}>
            {formFields.map(({ field, title, type }, index) => (
              <InputText
                key={field as keyof RegisterProps}
                title={title}
                value={formData[field as keyof RegisterProps]}
                type={type}
                onChange={handleChange(field as keyof RegisterProps)}
                ref={index === 0 ? firstInputRef : null}
              />
            ))}
            <div className="mt-1">
              <button onClick={handleSubmit} className="w-full">
                <Button
                  title="Đăng ký"
                  bg_color="bg-red-500"
                  text_color="text-white"
                />
              </button>
            </div>
          </form>
          <div className="flex justify-center items-center mt-4">
            Đã có một tài khoản?
            <Link to={"/login"} className="ml-2 text-link cursor-pointer">
              Đăng nhập ngay bây giờ
            </Link>
          </div>
          <div className="px-4 bg-white flex w-full justify-center items-center mt-4">
            <hr className="border border-zinc-200 w-full"></hr>
            <div className="px-3">Hoặc</div>
            <hr className="border border-zinc-200 w-full"></hr>
          </div>
          <div className="flex justify-between items-center mt-4 gap-4">
            <Button
              isBorder={true}
              icon={assetsSvg.ic_facebook}
              title="Google"
              bg_color="bg-white"
              text_color="text-zinc-700"
            />
            <Button
              isBorder={true}
              icon={assetsSvg.ic_google}
              title="Facebook"
              bg_color="bg-white"
              text_color="text-zinc-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";
import Title from "../components/ui/Title";
import InputText from "../components/ui/InputText";
import Button from "../components/ui/Button";
import { assetsSvg } from "../constants/assets";
import { FormField, LoginProps } from "../types";
import { Link } from "react-router";

export default function Login() {
  const [formData, setFormData] = useState<LoginProps>({
    email: "",
    password: "",
  });
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  const handleChange =
    (field: keyof LoginProps) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    console.log(formData);
    setFormData({ email: "", password: "" });
    firstInputRef.current?.focus();
  };

  const formFields: FormField[] = [
    { field: "email", title: "email", type: "email" },
    { field: "password", title: "mật khẩu", type: "password" },
  ];

  return (
    <div className="flex justify-center mb-8 mt-3">
      <div className="w-[600px]">
        <Title title="Đăng nhập" />
        <div className="bg-white p-6 shadow">
          <form onSubmit={handleSubmit}>
            {formFields.map(({ field, title, type }, index) => (
              <InputText
                key={field as keyof LoginProps}
                title={title}
                value={formData[field as keyof LoginProps]}
                type={type}
                onChange={handleChange(field as keyof LoginProps)}
                ref={index === 0 ? firstInputRef : null}
              />
            ))}
            <div className="mt-1">
              <button onClick={handleSubmit} className="w-full">
                <Button
                  title="Đăng nhập"
                  bg_color="bg-red-500"
                  text_color="text-white"
                />
              </button>
            </div>
          </form>
          <div className="flex justify-center items-center mt-4">
            Không có tài khoản?
            <Link to={"/register"} className="ml-2 text-link cursor-pointer">
              Đăng ký
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

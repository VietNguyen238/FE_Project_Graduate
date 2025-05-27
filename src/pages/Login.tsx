import React, { useEffect, useRef, useState } from "react";
import Title from "../components/ui/Title";
import InputText from "../components/ui/InputText";
import Button from "../components/ui/Button";
import { FormField, LoginProps } from "../types";
import { Link } from "react-router";
import { FormAuth } from "../components/utils/validate";
import * as z from "zod";
import Extensions from "../components/ui/Extensions";

export default function Login() {
  const [formData, setFormData] = useState<LoginProps>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<LoginProps>>({});
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  const handleChange =
    (field: keyof LoginProps) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const validateForm = () => {
    try {
      FormAuth.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<LoginProps> = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as keyof LoginProps;
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(formData);
      setFormData({ email: "", password: "" });
      firstInputRef.current?.focus();
    }
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
              <div className="mb-4" key={field as keyof LoginProps}>
                <InputText
                  title={title}
                  value={formData[field as keyof LoginProps]}
                  type={type}
                  onChange={handleChange(field as keyof LoginProps)}
                  ref={index === 0 ? firstInputRef : null}
                />
                {errors[field as keyof LoginProps] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[field as keyof LoginProps]}
                  </p>
                )}
              </div>
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
          <Extensions />
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";
import Title from "../components/ui/Title";
import InputText from "../components/ui/InputText";
import Button from "../components/ui/Button";
import { FormField, LoginProps } from "../types";
import { Link, useNavigate } from "react-router-dom";
import { FormLogin } from "../components/utils/validate";
import * as z from "zod";
import Extensions from "../components/ui/Extensions";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../services/authService";

export default function Login() {
  const [formData, setFormData] = useState<LoginProps>({
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<LoginProps>>({});
  const [isShow, setIsShow] = useState(false);
  const [loginError, setLoginError] = useState<string>("");
  const firstInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pending } = useSelector((state: any) => state.user.user);

  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  const handleChange =
    (field: keyof LoginProps) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
      setLoginError("");
    };

  const validateForm = () => {
    try {
      FormLogin.parse(formData);
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

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await login(formData, dispatch);

        if (res.success) {
          setFormData({ phone: "", password: "" });
          firstInputRef.current?.focus();
          navigate("/");
        } else {
          setLoginError("Số điện thoại hoặc mật khẩu không đúng");
        }
      } catch (err: any) {
        if (err.response && err.response.status === 500) {
          setLoginError("Đã xảy ra lỗi máy chủ nội bộ, vui lòng thử lại sau.");
        } else {
          setLoginError("Đã có lỗi xảy ra, vui lòng thử lại sau");
        }
      }
    }
  };

  const formFields: FormField[] = [
    { field: "phone", title: "số điện thoại", type: "text" },
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
                  autoComplete={field as string}
                  title={title}
                  value={formData[field as keyof LoginProps]}
                  type={
                    type == "password" ? (isShow ? "text" : "password") : "text"
                  }
                  onChange={handleChange(field as keyof LoginProps)}
                  ref={index === 0 ? firstInputRef : null}
                  isShowPasword={field == "password"}
                  isShow={isShow}
                  onClick={() => setIsShow(!isShow)}
                />
                {errors[field as keyof LoginProps] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[field as keyof LoginProps]}
                  </p>
                )}
              </div>
            ))}
            {loginError && (
              <p className="text-red-500 text-sm mb-4">{loginError}</p>
            )}
            <div className="mt-1">
              <button
                onClick={handleSubmit}
                className="w-full"
                disabled={pending}
              >
                <Button
                  title={pending ? "Đang đăng nhập..." : "Đăng nhập"}
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

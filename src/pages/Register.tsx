import { useEffect, useRef, useState } from "react";
import InputText from "../components/ui/InputText";
import Title from "../components/ui/Title";
import Button from "../components/ui/Button";
import { FormField, RegisterProps } from "../types";
import { Link, useNavigate } from "react-router-dom";
import { FormRegister } from "../components/utils/validate";
import { z } from "zod";
import Extensions from "../components/ui/Extensions";
import { register } from "../services/authService";
import { useTitleContext } from "../context/TitleContext";

export default function Register() {
  const [formData, setFormData] = useState<RegisterProps>({
    phone: "",
    email: "",
    name: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<RegisterProps>>({});
  const [isShow, setIsShow] = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { setTitle } = useTitleContext();

  useEffect(() => {
    setTitle("Đăng ký");
  }, [setTitle]);

  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  const handleChange =
    (field: keyof RegisterProps) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setErrors({});

    try {
      FormRegister.parse(formData);
      register(formData);
      navigate("/login");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Partial<RegisterProps> = {};
        error.errors.forEach((err) => {
          if (err.path && err.path.length > 0) {
            formattedErrors[err.path[0] as keyof RegisterProps] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
    }
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
              <div className="mb-4" key={field as keyof RegisterProps}>
                <InputText
                  autoComplete={field as string}
                  title={title}
                  value={formData[field as keyof RegisterProps]}
                  type={
                    type == "password" ? (isShow ? "text" : "password") : "text"
                  }
                  onChange={handleChange(field as keyof RegisterProps)}
                  ref={index === 0 ? firstInputRef : null}
                  isShowPasword={field == "password"}
                  isShow={isShow}
                  onClick={() => setIsShow(!isShow)}
                />
                {errors[field as keyof RegisterProps] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[field as keyof RegisterProps]}
                  </p>
                )}
              </div>
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
          <Extensions />
        </div>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import InputText from "../components/ui/InputText";
import Title from "../components/ui/Title";
import { CheckoutProps } from "../types";
import { FormCheckout } from "../components/utils/validate";
import { ZodError } from "zod";
import ButtonOrder from "../components/ui/ButtonOrder";
import { useNavigate } from "react-router-dom";
import { formFields } from "../constants";

export default function Checkout() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CheckoutProps>({
    phone: "",
    email: "",
    name: "",
  });
  const [errors, setErrors] = useState<Partial<CheckoutProps>>({});
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  const handleChange =
    (field: keyof CheckoutProps) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      console.log(formData);
      FormCheckout.parse(formData);
      setErrors({});
      navigate("/checkout/shipping");
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

  return (
    <div className="flex justify-center mb-8 mt-3">
      <div className="w-[600px]">
        <Title title="Đặt hàng - Thông tin khách hàng" />
        <div className="bg-white p-6 shadow">
          {formFields.map(({ field, title, type }, index) => (
            <div className="mb-4" key={field as keyof CheckoutProps}>
              <InputText
                title={title}
                value={formData[field as keyof CheckoutProps]}
                type={type}
                onChange={handleChange(field as keyof CheckoutProps)}
                ref={index === 0 ? firstInputRef : null}
              />
              {errors[field as keyof CheckoutProps] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[field as keyof CheckoutProps]}
                </p>
              )}
            </div>
          ))}
          <ButtonOrder onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

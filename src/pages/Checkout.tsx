import { useEffect, useRef, useState } from "react";
import InputText from "../components/ui/InputText";
import Title from "../components/ui/Title";
import { CheckoutProps } from "../types";
import { FormCheckout } from "../components/utils/validate";
import { ZodError } from "zod";
import ButtonOrder from "../components/ui/ButtonOrder";
import { useNavigate } from "react-router-dom";
import { formFields } from "../constants";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateUser } from "../services/userService";

export default function Checkout() {
  const navigate = useNavigate();
  const user = useSelector((state: { user: { user: any } }) => state.user.user);
  const [formData, setFormData] = useState<CheckoutProps>({
    phone: user?.phone || "",
    email: user?.email || "",
    name: user?.name || "",
  });
  const [errors, setErrors] = useState<Partial<CheckoutProps>>({});
  const firstInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  const handleChange =
    (field: keyof CheckoutProps) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      FormCheckout.parse(formData);
      setErrors({});

      const hasChanges = Object.keys(formData).some(
        (key) =>
          formData[key as keyof CheckoutProps] !==
          user[key as keyof CheckoutProps]
      );

      if (hasChanges) {
        await updateUser(formData, dispatch);
      }

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
              {field === "phone" || field === "email" ? (
                user[field as keyof CheckoutProps] ? (
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      {title.charAt(0).toUpperCase() + title.slice(1)}:
                    </p>
                    <span className="mt-1 text-sm text-gray-900">
                      {formData[field as keyof CheckoutProps]}
                    </span>
                  </div>
                ) : (
                  <InputText
                    title={title}
                    value={formData[field as keyof CheckoutProps]}
                    type={type}
                    onChange={handleChange(field as keyof CheckoutProps)}
                    ref={index === 0 ? firstInputRef : null}
                  />
                )
              ) : (
                <InputText
                  title={title}
                  value={formData[field as keyof CheckoutProps]}
                  type={type}
                  onChange={handleChange(field as keyof CheckoutProps)}
                  ref={index === 0 ? firstInputRef : null}
                />
              )}
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

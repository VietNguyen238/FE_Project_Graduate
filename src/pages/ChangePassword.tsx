import React, { useState } from "react";
import Title from "../components/ui/Title";
import InputText from "../components/ui/InputText";
import Button from "../components/ui/Button";
import { FormPassword } from "../components/utils/validate";
import { updateUser } from "../services/userService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

type PasswordField = {
  title: string;
  field: keyof typeof initialPasswords;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isShow: boolean;
  toggleShow: () => void;
  error: string;
};

const initialPasswords = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const initialShowPasswords = {
  oldPassword: false,
  newPassword: false,
  confirmPassword: false,
};

export default function ChangePassword() {
  const [passwords, setPasswords] = useState(initialPasswords);
  const [showPasswords, setShowPasswords] = useState(initialShowPasswords);
  const [errors, setErrors] = useState(initialPasswords);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validatePassword = (password: string) => {
    const validationResult = FormPassword.safeParse(password);
    return validationResult.success
      ? ""
      : validationResult.error.errors[0].message;
  };

  const handlePasswordChange =
    (field: keyof typeof passwords) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setPasswords((prev) => ({ ...prev, [field]: value }));

      let errorMessage = "";
      if (field === "oldPassword") {
        errorMessage = !value
          ? "Vui lòng nhập mật khẩu cũ"
          : validatePassword(value);
      } else if (field === "newPassword") {
        errorMessage = validatePassword(value);
        if (value === passwords.oldPassword) {
          errorMessage = "Mật khẩu mới không thể trùng với mật khẩu cũ";
        }
        if (passwords.confirmPassword) {
          setErrors((prev) => ({
            ...prev,
            confirmPassword:
              value !== passwords.confirmPassword
                ? "Mật khẩu xác nhận không khớp"
                : "",
          }));
        }
      } else if (field === "confirmPassword") {
        errorMessage = !value
          ? "Vui lòng xác nhận mật khẩu"
          : value !== passwords.newPassword
          ? "Mật khẩu xác nhận không khớp"
          : "";
      }

      setErrors((prev) => ({ ...prev, [field]: errorMessage }));
    };

  const togglePasswordVisibility =
    (field: keyof typeof showPasswords) => () => {
      setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
    };

  const handleUpdate = async () => {
    const oldPasswordError = !passwords.oldPassword
      ? "Vui lòng nhập mật khẩu cũ"
      : validatePassword(passwords.oldPassword);
    const newPasswordError = validatePassword(passwords.newPassword);
    const confirmPasswordError = !passwords.confirmPassword
      ? "Vui lòng xác nhận mật khẩu"
      : passwords.newPassword !== passwords.confirmPassword
      ? "Mật khẩu xác nhận không khớp"
      : "";

    const newErrors = {
      oldPassword: oldPasswordError,
      newPassword:
        passwords.newPassword === passwords.oldPassword
          ? "Mật khẩu mới không thể trùng với mật khẩu cũ"
          : newPasswordError,
      confirmPassword: confirmPasswordError,
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some((error) => error)) return;

    const response = await updateUser(
      { oldPassword: passwords.oldPassword, password: passwords.newPassword },
      dispatch
    );

    if (!response?.message) {
      navigate("/account");
    }
  };

  const passwordFields: PasswordField[] = [
    {
      title: "mật khẩu cũ",
      field: "oldPassword",
      value: passwords.oldPassword,
      onChange: handlePasswordChange("oldPassword"),
      isShow: showPasswords.oldPassword,
      toggleShow: togglePasswordVisibility("oldPassword"),
      error: errors.oldPassword,
    },
    {
      title: "mật khẩu mới",
      field: "newPassword",
      value: passwords.newPassword,
      onChange: handlePasswordChange("newPassword"),
      isShow: showPasswords.newPassword,
      toggleShow: togglePasswordVisibility("newPassword"),
      error: errors.newPassword,
    },
    {
      title: "xác nhận mật khẩu mới",
      field: "confirmPassword",
      value: passwords.confirmPassword,
      onChange: handlePasswordChange("confirmPassword"),
      isShow: showPasswords.confirmPassword,
      toggleShow: togglePasswordVisibility("confirmPassword"),
      error: errors.confirmPassword,
    },
  ];

  return (
    <div className="flex justify-center mb-8 mt-3">
      <div className="w-[600px]">
        <Title title="Đổi mật khẩu" />
        <div className="bg-white p-6 shadow">
          {passwordFields.map((field) => (
            <div key={field.field} className="block mb-5">
              <InputText
                title={field.title}
                onChange={field.onChange}
                isShowPasword={true}
                isShow={field.isShow}
                onClick={field.toggleShow}
                type={field.isShow ? "text" : "password"}
                value={field.value}
              />
              {field.error && (
                <p className="text-red-500 text-sm mt-2">{field.error}</p>
              )}
            </div>
          ))}
          <Button
            bg_color="bg-blue-600 mt-5"
            text_color="text-white"
            title="Xác nhận thay đổi"
            onClick={handleUpdate}
          />
        </div>
      </div>
    </div>
  );
}

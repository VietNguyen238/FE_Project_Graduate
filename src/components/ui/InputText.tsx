import { forwardRef } from "react";

interface Props {
  title: string;
  value: string;
  type: "email" | "number" | "text" | "password";
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const InputText = forwardRef<HTMLInputElement, Props>(
  ({ title, value, type, onChange }, ref) => {
    const capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1);

    return (
      <div className="">
        <div className="text-h3 text-title_color font-medium">
          {capitalizedTitle}:
        </div>
        <input
          ref={ref}
          className="w-full p-2 border border-zinc-400 rounded-md mt-2 mb-4"
          placeholder={`Nhập ${title}`}
          onChange={onChange}
          value={value}
          type={type}
        />
      </div>
    );
  }
);

InputText.displayName = "InputText";

export default InputText;

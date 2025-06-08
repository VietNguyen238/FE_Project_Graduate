import { forwardRef } from "react";

interface Props {
  title: string;
  value: string;
  isShowPasword?: boolean;
  isShow?: boolean;
  type: "email" | "number" | "text" | "password";
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onClick?: () => void;
  disabled?: boolean;
  autoComplete?: string;
  name?: string;
}

const InputText = forwardRef<HTMLInputElement, Props>(
  (
    {
      title,
      value,
      type,
      onChange,
      onClick,
      isShowPasword = false,
      isShow,
      disabled = false,
      autoComplete,
      name,
    },
    ref
  ) => {
    const capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1);

    return (
      <div className="">
        <div className="text-h4 text-title_color font-medium">
          {capitalizedTitle}:
        </div>
        <div className="relative">
          <input
            ref={ref}
            name={name}
            className="w-full px-2 py-1 border border-zinc-400 rounded-md mt-2 relative"
            placeholder={`Nhập ${title}`}
            autoComplete={autoComplete}
            onChange={onChange}
            value={value}
            type={type}
            disabled={disabled}
          />
          {isShowPasword &&
            (isShow ? (
              <div
                onClick={onClick}
                className="absolute top-1/3 right-3"
                style={{
                  width: "24px",
                  height: "24px",
                  fill: "currentcolor",
                  stroke: "currentcolor",
                  strokeWidth: "2.54",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 36 36"
                  width="100%"
                  height="100%"
                  style={{ display: "block" }}
                >
                  <circle cx="18" cy="17.5" r="4"></circle>
                  <path d="M3.284 18.47a1.77 1.77 0 0 1 0-1.94c3.167-4.84 8.573-8.03 14.711-8.03s11.545 3.19 14.711 8.03a1.77 1.77 0 0 1 0 1.94c-3.166 4.84-8.573 8.03-14.71 8.03-6.139 0-11.545-3.19-14.712-8.03"></path>
                </svg>
              </div>
            ) : (
              <div
                onClick={onClick}
                className="absolute top-1/3 right-3"
                style={{
                  width: "24px",
                  height: "24px",
                  fill: "currentcolor",
                  stroke: "currentcolor",
                  strokeWidth: "2.54",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 36 36"
                  width="100%"
                  height="100%"
                  style={{ display: "block" }}
                >
                  <path d="M32.711 11c-3.166 4.841-8.573 8.03-14.71 8.03-6.139 0-11.546-3.189-14.712-8.03M9.79 17.5l-3 5m8.5-3-1 5.5m12.5-7.5 3 5m-8.5-3 1 5.5"></path>
                </svg>
              </div>
            ))}
        </div>
      </div>
    );
  }
);

InputText.displayName = "InputText";

export default InputText;

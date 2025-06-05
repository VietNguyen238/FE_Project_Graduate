import { PaymentCartProps } from "../../types";

export default function PaymentCart({
  id,
  icon,
  title,
  description,
  value,
  onChange,
  paymentMethod,
}: PaymentCartProps) {
  return (
    <label
      key={id}
      htmlFor={id}
      className="flex items-center justify-between bg-main rounded p-4 cursor-pointer w-full"
    >
      <div className="flex items-center gap-4">
        <img src={icon} alt={id} className="h-ic w-ic" />
        <div>
          <p className="font-semibold">{title}</p>
          <p className="text-gray-700">{description}</p>
        </div>
      </div>
      <input
        id={id}
        type="radio"
        name="payment_method"
        value={value}
        checked={paymentMethod === value}
        onChange={onChange}
        className="form-radio h-5 w-5 text-blue-600"
      />
    </label>
  );
}

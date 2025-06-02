import { formatPrice } from "../utils/format_price";

interface ShippingMethod {
  id: string;
  name: string;
  icon: string;
  price: number;
}

interface Props {
  methods: ShippingMethod[];
  selectedMethod: string;
  onSelect: (methodId: string) => void;
  address: string;
}

export default function ShippingMethodList({
  methods,
  selectedMethod,
  onSelect,
  address,
}: Props) {
  return (
    <div className="flex gap-4">
      {methods.map((method) => (
        <div
          key={method.id}
          className={`relative w-[220px] flex items-center rounded-lg border ${
            selectedMethod === method.id ? "border-blue-500" : "border-gray-300"
          } bg-white p-4 shadow-sm cursor-pointer`}
          onClick={() => onSelect(method.id)}
        >
          <div className="flex items-center">
            <input
              id={`shipping-method-${method.id}`}
              name="shipping-method"
              type="radio"
              checked={selectedMethod === method.id}
              onChange={() => onSelect(method.id)}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label
              htmlFor={`shipping-method-${method.id}`}
              className="ml-3 flex flex-col justify-center items-center gap-1"
            >
              <img className="h-ic w-ic" src={method.icon} alt={method.id} />
              <div className="text-sm font-medium text-gray-900 flex flex-col">
                {method.name}
              </div>
              <div className="block text-sm text-gray-500">
                {address
                  ? `${formatPrice(method.price)}₫`
                  : "Chưa nhập địa chỉ"}
              </div>
            </label>
          </div>
        </div>
      ))}
    </div>
  );
}

import { OptionProps } from "../../types";

export default function Option({
  title,
  selected,
  onChange,
  list,
  option,
  htmlFor,
}: OptionProps) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-gray-700 t"
      >
        {title}
      </label>
      <select
        value={selected}
        onChange={onChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 border border-zinc-400 py-1 px-2"
      >
        <option value="">{option}</option>
        {list.map((item) => (
          <option key={item.code} value={item.code}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}

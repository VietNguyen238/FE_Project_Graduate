interface Props {
  selected: string;
  handleSelect: (title: string) => void;
  title: string;
}

export default function InputRadio({ selected, handleSelect, title }: Props) {
  return (
    <li
      className={`p-2 text-h4 hover:bg-gray-100 cursor-pointer flex items-center gap-2 ${
        selected === title ? "font-medium" : ""
      }`}
      onClick={() => handleSelect(title)}
    >
      <input
        type="radio"
        checked={selected === title}
        readOnly
        className="form-radio h-4 w-4 accent-black"
      />
      {title}
    </li>
  );
}

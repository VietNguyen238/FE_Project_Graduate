import { useState } from "react";

interface InputSearchAdminProps {
  onSearch: (value: string) => void;
  placeholder: string;
}

export default function InputSearchAdmin({
  onSearch,
  placeholder = "Tìm kiếm...",
}: InputSearchAdminProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch?.(value);
  };

  return (
    <div>
      {" "}
      <input
        type="text"
        placeholder={placeholder}
        className="border p-2 rounded w-full"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
}

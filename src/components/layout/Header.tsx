import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const mockResults = [
  "Mạch giảm áp (hạ áp)",
  "Anten",
  "Nguồn adapter",
  "Mạch Amply Bluetooth",
  "Đồng hồ đo dòng điện, điện áp AC",
  "Cảm biến ánh sáng",
  "Arduino",
  "Arduino Shield",
  "Board Arduino",
  "Arduino",
  "Arduino Shield",
  "Board Arduino",
  "Arduino",
  "Arduino Shield",
  "Board Arduino",
];

export default function Header() {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredResults = mockResults.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="h-[52px] bg-white w-full">
      <div className="fixed justify-center w-full">
        <div className="flex justify-center text-[14px] relative z-50 w-full">
          <div className="w-page flex h-[52px] justify-between items-center">
            <Link to="/">
              <img
                className="h-[52px] py-[9px]"
                src="./src/assets/svgs/ic_logo.svg"
                alt="ic_logo"
              />
            </Link>
            <div className="flex-1 mx-4 relative">
              <form
                role="search"
                autoComplete="off"
                className="flex items-center w-full bg-white rounded shadow px-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  setShowResults(true);
                }}
              >
                <span className="mr-2 text-gray-400">
                  <img
                    className="h-ic p-1"
                    src="./src/assets/svgs/ic_search.svg"
                    alt=""
                  />
                </span>
                <input
                  ref={inputRef}
                  id="header-search"
                  type="search"
                  placeholder="Tìm kiếm sản phẩm trên NSHOP..."
                  className="flex-1 h-10 px-3 outline-none bg-transparent"
                  autoComplete="off"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setShowResults(true);
                  }}
                  onFocus={() => setShowResults(true)}
                />
              </form>
              {showResults && (
                <div className="absolute left-0 right-0 mt-1 bg-white rounded shadow-lg max-h-72 overflow-y-auto">
                  {query === "" ? (
                    <p className="p-4 text-gray-500">
                      Nhập tên hoặc từ khóa sản phẩm bạn cần tìm.
                    </p>
                  ) : filteredResults.length === 0 ? (
                    <p className="p-4 text-gray-500">Không tìm thấy kết quả.</p>
                  ) : (
                    <ul>
                      {filteredResults.map((item, idx) => (
                        <li
                          key={idx}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
            <div className="flex">
              <Link
                className="flex justify-center items-center p-2 m-2 cursor-pointer"
                to="/cart"
              >
                <img
                  className="h-ic mr-2"
                  src="./src/assets/svgs/ic_cart.svg"
                  alt="ic_cart"
                />
                Giỏ hàng
              </Link>
              <Link
                className="flex justify-center items-center p-2 m-2 cursor-pointer"
                to="/account"
              >
                <img
                  className="h-ic mr-2"
                  src="./src/assets/svgs/ic_person.svg"
                  alt="ic_person"
                />
                Tài khoản
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useRef, useEffect, memo } from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

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

function Header() {
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
    <div className="h-[52px] w-full">
      <div className="fixed justify-center bg-white w-full z-50">
        <div className="flex justify-center text-[14px] relative w-full px-4">
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
                      {filteredResults.map((item, index) => (
                        <li
                          key={index}
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
            <div className="flex gap-2">
              <Link to="/cart">
                <Button icon="ic_cart" title="Giỏ hàng" />
              </Link>
              <Link to="/account">
                <Button icon="ic_person" title="Tài khoản" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Header);

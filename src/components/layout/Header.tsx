import { useState, useRef, useEffect, memo } from "react";
import { Link } from "react-router-dom";
import Button from "../ui/ButtonLayout";
import { assetsImage, assetsSvg } from "../../constants/assets";
import { useNavigateContext } from "../../context/NavigateContext";
import { getUser } from "../../services/userService";
import { UserProps } from "../../types";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getCart } from "../../services/cartService";

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
  const dispatch = useDispatch();
  const user = useSelector(
    (state: { user: { user: UserProps } }) => state.user.user
  );
  const cart = useSelector((state: any) => state.cart.items);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { setNavigate } = useNavigateContext();

  const totalQuantity = Array.isArray(cart)
    ? cart.reduce(
        (acc: number, item: { quantity: number }) => acc + item.quantity,
        0
      )
    : 0;

  useEffect(() => {
    const fetchUser = async () => {
      await getUser(dispatch);
      await getCart(dispatch);
    };
    fetchUser();
  }, []);

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
                className="h-[52px] py-1"
                src={assetsImage.im_logo}
                alt="im_logo"
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
                  <img className="h-ic p-1" src={assetsSvg.ic_search} alt="" />
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
              <Link to="/cart" onClick={() => setNavigate("/cart")}>
                <div className="relative">
                  <Button
                    icon={assetsSvg.ic_cart_dark}
                    title="Giỏ hàng"
                    isHover={false}
                  />
                  {totalQuantity > 0 && (
                    <div className="absolute top-[-4px] left-[18px] text-[9px] font-medium bg-blue_ac h-4 w-4 flex justify-center items-center rounded-full text-white border-white border-[3px] p-[8px]">
                      {totalQuantity}
                    </div>
                  )}
                </div>
              </Link>
              {user && user.name ? (
                <div className="flex items-center gap-2">
                  <Link to="/account" className="flex items-center">
                    <div className="flex justify-between items-center">
                      {user.image ? (
                        <div className="h-[35px] w-[35px] mr-2 rounded-full overflow-hidden">
                          <img
                            src={user.image}
                            alt={user.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <img
                          className={`h-ic mr-2 w-ic`}
                          src={assetsSvg.ic_person}
                          alt={assetsSvg.ic_person}
                        />
                      )}
                      <div className="">{user.name}</div>
                    </div>
                  </Link>
                </div>
              ) : (
                <Link to="/login" onClick={() => setNavigate("/login")}>
                  <Button
                    icon={assetsSvg.ic_person}
                    title="Đăng nhập"
                    isHover={false}
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Header);

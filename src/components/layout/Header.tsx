import { useState, useRef, useEffect, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/ButtonLayout";
import { assetsSvg } from "../../constants/assets";
import { useNavigateContext } from "../../context/NavigateContext";
import { getUser } from "../../services/userService";
import { UserProps } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../services/cartService";
import { getAllProduct } from "../../services/productService";

interface Product {
  _id: string;
  nameProduct: string;
}

interface Props {
  isAdmin?: boolean;
}

function Header({ isAdmin = false }: Props) {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(
    (state: { user: { user: UserProps } }) => state.user.user
  );
  const cart = useSelector((state: any) => state.cart.items);
  const [showResults, setShowResults] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const { setNavigate } = useNavigateContext();
  // const isAdmin = useRef(true);

  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const totalQuantity = Array.isArray(cart)
    ? cart.reduce(
        (acc: number, item: { quantity: number }) => acc + item.quantity,
        0
      )
    : 0;

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        await Promise.all([
          getUser(dispatch),
          getCart(dispatch),
          getAllProduct(dispatch).then(setProducts),
        ]);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredResults = (products || [])
    .filter((product) =>
      product?.nameProduct?.toLowerCase().includes(query.toLowerCase())
    )
    .map((product) => product.nameProduct);

  const handleProductClick = (productName: string) => {
    const selectedProduct = products.find(
      (product) => product.nameProduct === productName
    );
    if (selectedProduct) {
      navigate(`/product/${selectedProduct._id}`);
      setShowResults(false);
      setQuery("");
    }
  };

  return (
    <div className="h-[52px] w-full">
      <div className="fixed justify-center bg-white w-full z-50">
        <div className="flex justify-center text-[14px] relative w-full px-4">
          <div
            className={`${
              isAdmin == false ? "w-page" : "w-full"
            } flex h-[52px] justify-between items-center`}
          >
            <Link to="/">
              <img
                className="h-[52px] py-1"
                src={assetsSvg.ic_logo}
                alt="ic_logo"
              />
            </Link>
            {isAdmin == false ? (
              <>
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
                        src={assetsSvg.ic_search}
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
                    <div
                      ref={resultsRef}
                      className="absolute left-0 right-0 mt-1 bg-white rounded shadow-lg max-h-72 overflow-y-auto"
                    >
                      {query === "" ? (
                        <p className="p-4 text-gray-500">
                          Nhập tên hoặc từ khóa sản phẩm bạn cần tìm.
                        </p>
                      ) : filteredResults.length === 0 ? (
                        <p className="p-4 text-gray-500">
                          Không tìm thấy kết quả.
                        </p>
                      ) : (
                        <ul>
                          {filteredResults.map((item, index) => (
                            <li
                              key={index}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => handleProductClick(item)}
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex gap-2 mr-2">
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
                </div>
              </>
            ) : (
              <>
                <div className="flex-1" />
                <div className="mr-6">
                  <img
                    src={assetsSvg.ic_bell}
                    alt="ic_bell"
                    className="h-ic w-ic"
                  />
                </div>
              </>
            )}
            {user?.name ? (
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
                      className="h-ic mr-2 w-ic"
                      src={assetsSvg.ic_person}
                      alt="user"
                    />
                  )}
                  <div>{user.name}</div>
                </div>
              </Link>
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
  );
}

export default memo(Header);

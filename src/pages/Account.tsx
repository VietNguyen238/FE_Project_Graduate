import { Link, useNavigate } from "react-router-dom";
import Title from "../components/ui/Title";
import { assetsSvg } from "../constants/assets";
import { logout } from "../services/authService";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../services/userService";
import { useSelector } from "react-redux";

const data = [
  { href: "/account/orders/", icon: assetsSvg.ic_order, text: "Đơn hàng" },
  {
    href: "/account/profile/",
    icon: assetsSvg.ic_address,
    text: "Thông tin khách hàng & địa chỉ",
  },
  {
    href: "/account/verify-email/",
    icon: assetsSvg.ic_person_email,
    text: "Thay đổi email",
  },
  {
    href: "/account/change-password/",
    icon: assetsSvg.ic_person_password,
    text: "Đổi mật khẩu",
  },
  { href: "/", icon: assetsSvg.ic_logout, text: "Đăng xuất" },
];

export default function Account() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user.user);

  const handleLogout = async () => {
    await logout(dispatch);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("cart");
    navigate("/");
  };

  useEffect(() => {
    const fetchUser = async () => {
      await getUser(dispatch);
    };
    fetchUser();
  }, []);

  return (
    <div className="flex justify-center mb-8 mt-3">
      <div className="w-[600px]">
        <Title title="Tài khoản" />
        <div className="bg-white p-6 shadow">
          <div className="flex justify-start items-center gap-4 mb-4">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name}
                className="h-12 w-12 rounded-full"
              />
            ) : (
              <div className="h-12 w-12 bg-blue_ac flex justify-center items-center rounded-full">
                <img
                  src={assetsSvg.ic_person_white}
                  alt={user.name}
                  className="h-ic w-ic"
                />
              </div>
            )}
            <div className="text-h3">
              <div>{user.email}</div>
              <div>{user.name}</div>
            </div>
          </div>

          <nav className="user-nav">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex gap-2 items-center p-2 border border-zinc-200 cursor-pointer"
              >
                <img
                  src={item.icon}
                  alt={item.icon}
                  className="h-ic w-ic p-1"
                />
                <div
                  className="text-h4"
                  onClick={item.text === "Đăng xuất" ? handleLogout : undefined}
                >
                  {item.text}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

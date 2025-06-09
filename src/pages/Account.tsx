import { Link, useNavigate } from "react-router-dom";
import Title from "../components/ui/Title";
import { assetsSvg } from "../constants/assets";
import { logout } from "../services/authService";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getUser } from "../services/userService";
import { useSelector } from "react-redux";
import { useTitleContext } from "../context/TitleContext";

export default function Account() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const user = useSelector((state: any) => state.user.user);
  const data = [
    ...(isAdmin
      ? [{ href: "/admin/", icon: assetsSvg.ic_person, text: "Admin" }]
      : []),
    { href: "/account/orders/", icon: assetsSvg.ic_order, text: "Đơn hàng" },
    {
      href: "/account/profile/",
      icon: assetsSvg.ic_address,
      text: "Thông tin khách hàng & địa chỉ",
    },
    {
      href: "/account/change-password/",
      icon: assetsSvg.ic_person_password,
      text: "Đổi mật khẩu",
    },
    { href: "/", icon: assetsSvg.ic_logout, text: "Đăng xuất" },
  ];

  const { setTitle } = useTitleContext();

  useEffect(() => {
    setTitle("Tài khoản");
  }, [setTitle]);

  const handleLogout = async () => {
    await logout(dispatch);
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser(dispatch);
      setIsAdmin(user.admin);
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
              <Link to={item.href} key={index}>
                <div
                  key={index}
                  className="flex gap-2 items-center p-2 border border-zinc-200 cursor-pointer"
                  onClick={item.text === "Đăng xuất" ? handleLogout : undefined}
                >
                  <img
                    src={item.icon}
                    alt={item.icon}
                    className="h-ic w-ic p-1"
                  />
                  <div className="text-h4">{item.text}</div>
                </div>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

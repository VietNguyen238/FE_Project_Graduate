import { listFilter } from "../../constants";
import { ChildrenProps } from "../../types";
import Button from "../ui/ButtonLayout";
import { Link, useNavigate } from "react-router-dom";
import { useFilter } from "../../context/FilterContext";
import { assetsSvg } from "../../constants/assets";

export default function Filter({ children }: ChildrenProps) {
  const { currentCategory, setCurrentCategory } = useFilter();
  const navigate = useNavigate();

  const handleCategoryClick = (index: number, params: string) => {
    setCurrentCategory(index);
    navigate(`/category/${params}`);
  };

  return (
    <div className="flex gap-5 my-5">
      <div className="sticky top-[52px] h-full z-10">
        <div className="font-bold text-h3 mb-3 w-[240px]">
          DANH MỤC SẢN PHẨM
        </div>
        {listFilter.map((item, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(index, item.params)}
          >
            <Button
              index={index}
              icon={`${item.icon}`}
              title={`${item.title}`}
              current={currentCategory}
              isColor={true}
            />
          </div>
        ))}
        <div className="font-bold text-h3 mb-3 mt-5 w-[240px]">
          KẾT NỐI VỚI NSHOP
        </div>
        <a href="https://www.facebook.com/1781446968819273/">
          <Button icon={assetsSvg.ic_face} title={`Linh kiện điện tử NShop`} />
        </a>
        <a href="https://www.facebook.com/groups/543064839510264/">
          <Button icon={assetsSvg.ic_people} title={`Hội đam mê cơ điện tử`} />
        </a>
        <a href="https://www.youtube.com/channel/UCvlCbgZr1NoSazbmxspIZEw">
          <Button icon={assetsSvg.ic_ytb} title={`Kênh Youtube của Nshop`} />
        </a>
        <div className="font-bold text-h3 mb-3 mt-5 w-[240px]">KHÁC</div>
        <div className="flex flex-col text-h4 gap-2">
          <Link to="/huong-dan-mua-hang/" className="">
            Hướng dẫn mua hàng
          </Link>{" "}
          <Link
            to="/huong-dan-thanh-toan/"
            aria-current="page"
            className="nuxt-link-exact-active nuxt-link-active"
          >
            Hướng dẫn thanh toán
          </Link>{" "}
          <Link to="/order-tracking/" className="">
            Kiểm tra đơn hàng
          </Link>{" "}
          <Link to="/tuyen-dung/" className="">
            Tuyển dụng
          </Link>
        </div>
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}

import { memo, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { header } from "../../constants";
import { assetsSvg } from "../../constants/assets";
import { useFilter } from "../../context/FilterContext";
import { useNavigateContext } from "../../context/NavigateContext";

function Navigate() {
  const { categoryTitle } = useParams();
  const { setCurrentCategory } = useFilter();
  const { navigate, setNavigate } = useNavigateContext();

  useEffect(() => {
    if (categoryTitle) setNavigate(categoryTitle);
    setCurrentCategory(99);
  }, [categoryTitle, setCurrentCategory]);

  return (
    <div className="bg-dark_blue flex items-center justify-center h-[49px] px-4">
      <div className="w-page flex justify-between items-center">
        <div className="flex gap-6">
          {header.map((item, index) => (
            <Link to={`/${item.link}`} key={index}>
              {item.link == navigate ? (
                <div
                  key={index}
                  className="text-white text-h4 font-bold border-b"
                  onClick={() => setNavigate(item.link)}
                >
                  {item.title}
                </div>
              ) : (
                <div
                  key={index}
                  className="text-white text-h4 font-bold border-b border-transparent"
                  onClick={() => setNavigate(item.link)}
                >
                  {item.title}
                </div>
              )}
            </Link>
          ))}
        </div>
        <div className="flex gap-3">
          <div className="text-white text-h4 flex justify-center items-center gap-[2px]">
            <img className="h-ic p-1" src={assetsSvg.ic_email} alt="ic_email" />
            <a href="mailto:info@nshopvn.com">
              <span>info@nshopvn.com</span>
            </a>
          </div>
          <div className="text-white text-h4 flex justify-center items-center gap-[2px]">
            <img className="h-ic p-1" src={assetsSvg.ic_phone} alt="ic_phone" />
            <a href="tel:0902643978">
              <span>Tân Phú: 0902 643 978</span>
            </a>
          </div>
          <div className="text-white text-h4 flex justify-center items-center gap-[2px]">
            <img className="h-ic p-1" src={assetsSvg.ic_phone} alt="ic_phone" />
            <a href="tel:0932734186">
              <span>Quận 9: 093 27 23 186</span>
            </a>
          </div>
          <div className="relative group">
            <div className="text-white text-h4 flex justify-center items-center gap-[2px] cursor-pointer hover:text-gray-200 transition-colors">
              <span data-v-7807fdc1="">LIÊN HỆ</span>
              <img
                className="h-ic p-1 transition-transform group-hover:rotate-180"
                src={assetsSvg.ic_arows_down}
                alt="ic_arows_down"
              />
            </div>
            <div className="h-4 w-16 absolute top-6"></div>
            <div className="absolute hidden group-hover:block z-50 right-0 top-9 px-4 py-3 w-[240px] bg-white text-[#4a4a4a] rounded-xl shadow-md">
              <div className="font-bold my-1">Bán hàng</div>
              <ul className="flex flex-col gap-2">
                <li className="flex items-center justify-start">
                  <img
                    className="h-ic p-1"
                    src={assetsSvg.ic_advise}
                    alt="ic_advise"
                  />
                  <span>Quận 9: 093 27 23 186</span>
                </li>
                <li className="flex items-center justify-start">
                  <img
                    className="h-ic p-1"
                    src={assetsSvg.ic_advise}
                    alt="ic_advise"
                  />
                  <span>Quận 9: 093 27 34 186</span>
                </li>
                <li className="flex items-center justify-start">
                  <img
                    className="h-ic p-1"
                    src={assetsSvg.ic_advise}
                    alt="ic_advise"
                  />
                  <span>Tân Phú: 0902 64 39 78</span>
                </li>
                <li className="flex items-center justify-start">
                  <img
                    className="h-ic p-1"
                    src={assetsSvg.ic_advise}
                    alt="ic_advise"
                  />
                  <span>Tân Phú: 0904 83 35 36</span>
                </li>
              </ul>
              <div className="font-bold my-1">Kỹ thuật</div>
              <ul className="flex flex-col gap-2">
                <li className="flex items-center justify-start">
                  <img
                    className="h-ic p-1"
                    src={assetsSvg.ic_advise}
                    alt="ic_advise"
                  />
                  <span>0339 449 749</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Navigate);

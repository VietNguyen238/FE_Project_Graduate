import { memo, useState } from "react";
import { Link } from "react-router";
import { header } from "../../constants";

function Navigate() {
  const [showPhone, setShowPhone] = useState(false);
  const [navigate, setNavigate] = useState("");
  return (
    <div className="bg-dark_blue flex items-center justify-center h-[49px] px-4">
      <div className="w-page flex justify-between items-center">
        <div className="flex gap-6">
          {header.map((item, index) => (
            <Link to={`/${item.link}`}>
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
                  className="text-white text-h4 font-bold"
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
            <img
              className="h-ic p-1"
              src="./src/assets/svgs/ic_email.svg"
              alt="ic_email"
            />
            <a href="mailto:info@nshopvn.com">
              <span>info@nshopvn.com</span>
            </a>
          </div>
          <div className="text-white text-h4 flex justify-center items-center gap-[2px]">
            <img
              className="h-ic p-1"
              src="./src/assets/svgs/ic_phone.svg"
              alt="ic_phone"
            />
            <a href="tel:0902643978">
              <span>Tân Phú: 0902 643 978</span>
            </a>
          </div>
          <div className="text-white text-h4 flex justify-center items-center gap-[2px]">
            <img
              className="h-ic p-1"
              src="./src/assets/svgs/ic_phone.svg"
              alt="ic_phone"
            />
            <a href="tel:0932734186">
              <span>Quận 9: 093 27 23 186</span>
            </a>
          </div>
          <div className="relative">
            <div
              onClick={() => setShowPhone(!showPhone)}
              className="text-white text-h4 flex justify-center items-center gap-[2px] cursor-pointer"
            >
              <span data-v-7807fdc1="">LIÊN HỆ</span>
              <img
                className="h-ic p-1"
                src="./src/assets/svgs/ic_arows_down.svg"
                alt="ic_arows_down"
              />
            </div>
            {showPhone && (
              <div className="absolute right-0 top-9 px-4 py-3 w-[240px] bg-white text-[#4a4a4a] rounded-xl shadow-md">
                <div className="font-bold my-1">Bán hàng</div>{" "}
                <ul className="flex flex-col gap-2">
                  <li className="flex items-center justify-start">
                    <img
                      className="h-ic p-1"
                      src="./src/assets/svgs/ic_advise.svg"
                      alt="ic_advise"
                    />
                    <span>Quận 9: 093 27 23 186</span>
                  </li>{" "}
                  <li className="flex items-center justify-start">
                    <img
                      className="h-ic p-1"
                      src="./src/assets/svgs/ic_advise.svg"
                      alt="ic_advise"
                    />
                    <span>Quận 9: 093 27 34 186</span>
                  </li>{" "}
                  <li className="flex items-center justify-start">
                    <img
                      className="h-ic p-1"
                      src="./src/assets/svgs/ic_advise.svg"
                      alt="ic_advise"
                    />
                    <span>Tân Phú: 0902 64 39 78</span>
                  </li>{" "}
                  <li className="flex items-center justify-start">
                    <img
                      className="h-ic p-1"
                      src="./src/assets/svgs/ic_advise.svg"
                      alt="ic_advise"
                    />
                    <span>Tân Phú: 0904 83 35 36</span>
                  </li>
                </ul>{" "}
                <div className="font-bold my-1">Kỹ thuật</div>{" "}
                <ul className="flex flex-col gap-2">
                  <li className="flex items-center justify-start">
                    <img
                      className="h-ic p-1"
                      src="./src/assets/svgs/ic_advise.svg"
                      alt="ic_advise"
                    />{" "}
                    <span>0339 449 749</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Navigate);

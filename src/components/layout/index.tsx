import Header from "./Header";
import Footer from "./Footer";
import { ChildrenProps } from "../../types";
import Navigate from "./Navigate";
import Filter from "./Filter";

interface Props {
  isNavigate?: boolean;
  isFilter?: boolean;
  isFooter?: boolean;
  isWightPage?: boolean;
  isAdmin?: boolean;
}

export default function Layout({
  children,
  isNavigate = false,
  isFilter = false,
  isFooter = true,
  isWightPage = true,
  isAdmin,
}: Props & ChildrenProps) {
  return (
    <div>
      <Header isAdmin={isAdmin} />
      {isNavigate && <Navigate />}
      <div
        className={`bg-main w-full flex justify-center items-center ${
          isWightPage == true && "px-4"
        }`}
      >
        <div
          className={`${isWightPage == true ? "w-page" : "w-full"} ${
            isFooter == false && "h-full"
          }`}
        >
          {isFilter ? <Filter>{children}</Filter> : children}
        </div>
      </div>
      {isFooter && <Footer />}
    </div>
  );
}

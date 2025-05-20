import Header from "./Header";
import Footer from "./Footer";
import { ChildrenProps } from "../../types";
import Navigate from "./Navigate";
import Filter from "./Filter";
import { FilterProvider } from "../../context/FilterContext";

interface Props {
  isNavigate?: boolean;
  isFilter?: boolean;
}

export default function Layout({
  children,
  isNavigate = false,
  isFilter = false,
}: Props & ChildrenProps) {
  return (
    <div>
      <Header />
      {isNavigate && <Navigate />}
      <div className="bg-main w-full flex justify-center items-center px-4">
        <div className="w-page">
          {isFilter ? (
            <FilterProvider>
              <Filter>{children}</Filter>
            </FilterProvider>
          ) : (
            children
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

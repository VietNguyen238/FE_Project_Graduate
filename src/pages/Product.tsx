import TitleCategory from "../components/ui/TitleCategory";
import FilterUi from "../components/ui/FilterUi";
import { useFilter } from "../context/FilterContext";
import { listFilter } from "../constants";
import { dataProduct } from "../config/data";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { selectFilter, selectSort } from "../constants/action";
import PaginatedItems from "../components/ui/PaginatedItems";

export default function Product() {
  const { currentCategory, setCurrentCategory, selectedFilter, selectedSort } =
    useFilter();
  const { categoryTitle } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (categoryTitle) {
      const categoryIndex = listFilter.findIndex(
        (item) => item.params === categoryTitle
      );
      if (categoryIndex !== -1) {
        setCurrentCategory(categoryIndex);
      }
    } else {
      setCurrentCategory(99);
      navigate("/products");
    }
  }, [categoryTitle, setCurrentCategory, navigate]);

  const filterCategory = categoryTitle
    ? listFilter.find((item) => item.params === categoryTitle)?.title
    : currentCategory === 99
    ? "Sản phẩm"
    : listFilter[currentCategory]?.title;

  const filteredProducts = useMemo(() => {
    let products =
      filterCategory === "Sản phẩm"
        ? [...dataProduct]
        : dataProduct.filter((product) => product.category === filterCategory);

    products = selectFilter(selectedFilter, products);
    products = selectSort(selectedSort, products);

    return products;
  }, [filterCategory, selectedFilter, selectedSort, dataProduct]);

  return (
    <div>
      <TitleCategory title={filterCategory || "Tất cả sản phẩm"} />
      <FilterUi />
      <PaginatedItems itemsPerPage={10} filteredProducts={filteredProducts} />
    </div>
  );
}

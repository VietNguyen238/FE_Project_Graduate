import TitleCategory from "../components/ui/TitleCategory";
import FilterUi from "../components/ui/FilterUi";
import { useFilter } from "../context/FilterContext";
import { listFilter } from "../constants";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { selectFilter, selectSort } from "../constants/action";
import PaginatedItems from "../components/ui/PaginatedItems";
import { getAllProduct } from "../services/productService";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useTitleContext } from "../context/TitleContext";

export default function Product() {
  const { currentCategory, setCurrentCategory, selectedFilter, selectedSort } =
    useFilter();
  const products = useSelector((state: any) => state.product.items);
  const { categoryTitle } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setTitle } = useTitleContext();

  useEffect(() => {
    setTitle("Danh sách sản phẩm");
  }, [setTitle]);

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
    let currentProducts: any[] = products;

    if (categoryTitle) {
      currentProducts = products.filter((product: any) => {
        return product.categoryId?.slug === categoryTitle;
      });
    }

    currentProducts = selectFilter(selectedFilter, currentProducts);
    currentProducts = selectSort(selectedSort, currentProducts);

    return currentProducts;
  }, [categoryTitle, selectedFilter, selectedSort, products, filterCategory]);

  useEffect(() => {
    getAllProduct(dispatch);
  }, []);

  return (
    <div>
      <TitleCategory title={filterCategory || "Tất cả sản phẩm"} />
      <FilterUi />
      <PaginatedItems itemsPerPage={10} filteredProducts={filteredProducts} />
    </div>
  );
}

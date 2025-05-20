import TitleCategory from "../components/ui/TitleCategory";
import FilterUi from "../components/ui/FilterUi";
import { useFilter } from "../context/FilterContext";
import { listFilter } from "../constants";
import { dataProduct } from "../config/data";
import ProductCard from "../components/ui/ProductCard";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";

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
    ? "Tất cả sản phẩm"
    : listFilter[currentCategory]?.title;
  0;

  const filteredProducts = useMemo(() => {
    let products =
      filterCategory === "Tất cả sản phẩm"
        ? dataProduct
        : dataProduct.filter((product) => product.category === filterCategory);

    switch (selectedFilter) {
      case "Nổi bật":
        products = products.filter((product) => product.newPrice > 0);
        break;
      case "Giảm giá":
        products = products.filter((product) => product.newPrice > 0);
        break;
      case "Còn hàng":
        products = products.filter((product) => product.quantity > 0);
        break;
      default:
        break;
    }

    switch (selectedSort) {
      case "Giá thấp":
        products = [...products].sort(
          (a, b) => (a.newPrice || a.price) - (b.newPrice || b.price)
        );
        break;
      case "Giá cao":
        products = [...products].sort(
          (a, b) => (b.newPrice || b.price) - (a.newPrice || a.price)
        );
        break;
      case "Mới nhất":
        break;
      default:
        break;
    }

    return products;
  }, [filterCategory, selectedFilter, selectedSort]);

  return (
    <div>
      <TitleCategory title={filterCategory || "Tất cả sản phẩm"} />
      <FilterUi />
      <div className="grid grid-cols-5 gap-4 mt-4">
        {filteredProducts.map((product, index) => (
          <ProductCard
            key={`${product.title}-${index}`}
            price={product.price}
            image={product.image}
            title={product.title}
            newPrice={product.newPrice}
            quantity={product.quantity}
          />
        ))}
      </div>
    </div>
  );
}

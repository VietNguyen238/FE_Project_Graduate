import SlideShow from "../components/ui/SlideShow";
import ProductCard from "../components/ui/ProductCard";
import Title from "../components/ui/TitleProduct";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { ProductProps } from "../types";
import { useSelector } from "react-redux";
import { useTitleContext } from "../context/TitleContext";
import LoadingSpinner from "../components/ui/LoadingSpinner";

interface ErrorResponse {
  message: string;
}

export default function Home() {
  const { setTitle } = useTitleContext();
  const user = useSelector((state: any) => state.user.user);

  const [recommendedProducts, setRecommendedProducts] = useState<
    ProductProps[]
  >([]);
  const [bestSellingProducts, setBestSellingProducts] = useState<
    ProductProps[]
  >([]);
  const [newProducts, setNewProducts] = useState<ProductProps[]>([]);
  const [loadingRecommended, setLoadingRecommended] = useState(true);
  const [loadingBestSelling, setLoadingBestSelling] = useState(true);
  const [loadingNew, setLoadingNew] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTitle("Trang chủ");
  }, [setTitle]);

  const fetchRecommendedProducts = async () => {
    setLoadingRecommended(true);
    setError(null);
    try {
      const response = await axios.post("http://localhost:8000/recommend", {
        user_id: user.id,
        top_k: 10,
      });
      const recommendations = response.data.recommendations || [];
      const formattedProducts = recommendations.map((item: any) => ({
        _id: item.product_id || "unknown",
        price: item.newPrice || item.price,
        imageUrl: item.image_url || "default-image.jpg",
        nameProduct: item.name_product || "Sản phẩm không xác định",
        newPrice: item.price || 0,
        quantity: item.quantity || 1,
      }));
      setRecommendedProducts(formattedProducts);
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage =
        axiosError.response?.data?.message || "Lỗi khi lấy sản phẩm đề xuất";
      setError(errorMessage);
      setRecommendedProducts([]);
    } finally {
      setLoadingRecommended(false);
    }
  };

  const fetchProducts = async () => {
    setLoadingBestSelling(true);
    setLoadingNew(true);
    setError(null);
    try {
      const [bestSellingResponse, newProductsResponse] = await Promise.all([
        axios.get("http://localhost:8000/best-selling-products"),
        axios.get("http://localhost:8000/new-products"),
      ]);

      const bestSelling = bestSellingResponse.data.recommendations || [];
      const newProducts = newProductsResponse.data.recommendations || [];

      const formatProducts = (items: any[]) =>
        items.map((item: any) => ({
          _id: item.product_id || "unknown",
          price: item.price || 0,
          imageUrl: item.image_url || "default-image.jpg",
          nameProduct: item.name_product || "Sản phẩm không xác định",
          newPrice: item.price || 0,
          quantity: item.quantity || 1,
        }));

      setBestSellingProducts(formatProducts(bestSelling));
      setNewProducts(formatProducts(newProducts));
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage =
        axiosError.response?.data?.message || "Lỗi khi lấy danh sách sản phẩm";
      setError(errorMessage);
      setBestSellingProducts([]);
      setNewProducts([]);
    } finally {
      setLoadingBestSelling(false);
      setLoadingNew(false);
    }
  };

  useEffect(() => {
    fetchRecommendedProducts();
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <SlideShow />

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Lỗi! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Sản phẩm đề xuất */}
      <Title
        title="Sản phẩm đề xuất"
        quantity={recommendedProducts}
        link="products"
      />
      {loadingRecommended ? (
        <LoadingSpinner />
      ) : recommendedProducts.length > 0 ? (
        <div className="grid grid-cols-5 gap-3">
          {recommendedProducts.map((product: ProductProps, index) => (
            <div key={index} className="col-span-1">
              <ProductCard
                _id={product._id}
                price={product.newPrice || product.price}
                imageUrl={product.imageUrl}
                nameProduct={product.nameProduct}
                newPrice={product.newPrice}
                quantity={product.quantity}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Không có sản phẩm đề xuất.</p>
      )}

      {/* Sản phẩm mới */}
      <Title title="Sản phẩm mới" quantity={newProducts} link="products" />
      {loadingNew ? (
        <LoadingSpinner />
      ) : newProducts.length > 0 ? (
        <div className="grid grid-cols-5 gap-3">
          {newProducts.map((product: ProductProps, index) => (
            <div key={index} className="col-span-1">
              <ProductCard
                _id={product._id}
                price={product.newPrice || product.price}
                imageUrl={product.imageUrl}
                nameProduct={product.nameProduct}
                newPrice={product.newPrice}
                quantity={product.quantity}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Không có sản phẩm mới.</p>
      )}

      {/* Sản phẩm bán chạy */}
      <Title
        title="Sản phẩm bán chạy"
        quantity={bestSellingProducts}
        link="products"
      />
      {loadingBestSelling ? (
        <LoadingSpinner />
      ) : bestSellingProducts.length > 0 ? (
        <div className="grid grid-cols-5 gap-3">
          {bestSellingProducts.map((product: ProductProps, index) => (
            <div key={index} className="col-span-1">
              <ProductCard
                _id={product._id}
                price={product.newPrice || product.price}
                imageUrl={product.imageUrl}
                nameProduct={product.nameProduct}
                newPrice={product.newPrice}
                quantity={product.quantity}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Không có sản phẩm bán chạy.</p>
      )}
    </div>
  );
}

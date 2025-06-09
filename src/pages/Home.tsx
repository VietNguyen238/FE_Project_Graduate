import SlideShow from "../components/ui/SlideShow";
import ProductCard from "../components/ui/ProductCard";
import Title from "../components/ui/TitleProduct";
import { useEffect } from "react";
import { getAllProduct } from "../services/productService";
import { ProductProps } from "../types";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useTitleContext } from "../context/TitleContext";

export default function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.product.items);

  const { setTitle } = useTitleContext();

  useEffect(() => {
    setTitle("Trang chủ");
  }, [setTitle]);

  useEffect(() => {
    getAllProduct(dispatch);
  }, []);

  return (
    <div>
      <SlideShow />
      <Title title="Sản phẩm đề xuất" quantity={products} link="products" />
      <div className="grid grid-cols-5 gap-3">
        {products.slice(0, 10).map((product: ProductProps, index: number) => (
          <div key={index} className="col-span-1">
            <ProductCard
              _id={product._id}
              key={index}
              price={product.price}
              imageUrl={product.imageUrl[0]}
              nameProduct={product.nameProduct}
              newPrice={product.newPrice}
              quantity={product.quantity}
            />
          </div>
        ))}
      </div>
      <Title title="Sản phẩm mới" quantity={products} link="products" />
      <div className="grid grid-cols-5 gap-3">
        {products.slice(0, 10).map((product: ProductProps, index: number) => (
          <div key={index} className="col-span-1">
            <ProductCard
              _id={product._id}
              key={index}
              price={product.price}
              imageUrl={product.imageUrl[0]}
              nameProduct={product.nameProduct}
              newPrice={product.newPrice}
              quantity={product.quantity}
            />
          </div>
        ))}
      </div>
      <Title title="Sản phẩm nổi bật" quantity={products} link="products" />
      <div className="grid grid-cols-5 gap-3">
        {products.slice(0, 10).map((product: ProductProps, index: number) => (
          <div key={index} className="col-span-1">
            <ProductCard
              _id={product._id}
              key={index}
              price={product.price}
              imageUrl={product.imageUrl[0]}
              nameProduct={product.nameProduct}
              newPrice={product.newPrice}
              quantity={product.quantity}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

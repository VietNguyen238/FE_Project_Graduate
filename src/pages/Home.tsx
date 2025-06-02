import SlideShow from "../components/ui/SlideShow";
import ProductCard from "../components/ui/ProductCard";
import Title from "../components/ui/TitleProduct";
import { useEffect, useState } from "react";
import { getAllProduct } from "../services/productService";
import { ProductProps } from "../types";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const apiProducts = await getAllProduct();
      if (apiProducts) {
        setProducts(apiProducts);
      }
    };

    fetchProducts();
  }, []);
  return (
    <div>
      <SlideShow />
      <Title title="Sản phẩm đề xuất" quantity={products} link="products" />
      <div className="grid grid-cols-5 gap-3">
        {products.slice(0, 10).map((product: ProductProps, index) => (
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
        {products.slice(0, 10).map((product: ProductProps, index) => (
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
        {products.slice(0, 10).map((product: ProductProps, index) => (
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

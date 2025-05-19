import SlideShow from "../components/ui/SlideShow";
import ProductCard from "../components/ui/ProductCard";
import { dataProduct, dataProducts } from "../config/data";
import Title from "../components/ui/Title";

export default function Home() {
  return (
    <div>
      <SlideShow />
      <Title title="Sản phẩm đề xuất" quantity={dataProduct} link="products" />
      <div className="grid grid-cols-5 gap-3">
        {dataProduct.slice(0, 10).map((item, index) => (
          <div className="col-span-1">
            <ProductCard
              key={index}
              title={item.title}
              image={item.image}
              newPrice={item.newPrice}
              price={item.price}
            />
          </div>
        ))}
      </div>
      <Title title="Sản phẩm mới" quantity={dataProducts} link="products" />
      <div className="grid grid-cols-5 gap-3">
        {dataProducts.slice(0, 10).map((item, index) => (
          <div className="col-span-1">
            <ProductCard
              key={index}
              title={item.title}
              image={item.image}
              newPrice={item.newPrice}
              price={item.price}
            />
          </div>
        ))}
      </div>
      <Title title="Sản phẩm nổi bật" quantity={dataProduct} link="products" />
      <div className="grid grid-cols-5 gap-3">
        {dataProduct.slice(0, 10).map((item, index) => (
          <div className="col-span-1">
            <ProductCard
              key={index}
              title={item.title}
              image={item.image}
              newPrice={item.newPrice}
              price={item.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

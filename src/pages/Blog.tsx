import { useEffect } from "react";
import BlogCart from "../components/ui/BlogCard";
import TitleCategory from "../components/ui/TitleCategory";
import { dataBlog } from "../config/data";
import { useTitleContext } from "../context/TitleContext";

export default function Blog() {
  const { setTitle } = useTitleContext();

  useEffect(() => {
    setTitle("Blog");
  }, [setTitle]);

  return (
    <div>
      <TitleCategory title={"Blog"} />
      <div className="grid grid-cols-3 gap-5">
        {dataBlog.map((item, index) => (
          <BlogCart
            key={index}
            title={item.title}
            content={item.content}
            date={item.date.toString()}
            image={item.image}
            label={item.label}
          />
        ))}
      </div>
    </div>
  );
}

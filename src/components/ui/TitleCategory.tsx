import { Link, useParams } from "react-router";

interface Props {
  title: string;
}

export default function TitleCategory({ title }: Props) {
  return (
    <div>
      <div className="text-h4">
        <Link to={"/"} className="hover:text-link">
          Nshop
        </Link>
        {title !== "Sản phẩm" &&
          title !== "Blog" &&
          title !== "Hệ thống cửa hàng" && (
            <>
              <span> / </span>
              <Link to={"/products"} className="hover:text-link">
                Sản phẩm
              </Link>
            </>
          )}
        <span> / {title}</span>
      </div>
      <div className="text-h2 font-medium py-2">{title}</div>
    </div>
  );
}

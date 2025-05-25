import { Link } from "react-router";

interface Props {
  title: string;
  link: string;
  quantity: Array<any>;
}

export default function TitleProduct({ title, link, quantity }: Props) {
  return (
    <div className="flex w-full justify-between items-center pb-3 pt-6">
      <div className="text-h2 font-medium ">{title}</div>
      {quantity.length > 10 && (
        <Link to={`/${link}`}>
          <div className="text-h3 text-link">Xem thêm</div>
        </Link>
      )}
    </div>
  );
}

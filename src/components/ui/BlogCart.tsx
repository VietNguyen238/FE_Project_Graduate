interface Props {
  title: string;
  content: string;
  image: string;
  label: string;
  date: string;
}

export default function BlogCart({
  title,
  content,
  image,
  label,
  date,
}: Props) {
  return (
    <div className="w-full h-full bg-white shadow-md">
      <div className="relative">
        <img src={image} alt={image} className="w-full h-[170px]" />
        <div className="absolute bottom-1 left-2 text-caption bg-blue-400 px-[9px] py-[3px] rounded-full text-white">
          {" "}
          {label} | {date}
        </div>
      </div>
      <div className="text-text p-3">
        <div className="text-h3 font-medium line-clamp-2 mb-2">{title}</div>
        <div className="text-h4 line-clamp-6">{content}</div>
      </div>
    </div>
  );
}

interface Props {
  title: string;
  bg_color: string;
  text_color: string;
  onClick?: () => void;
  icon?: string;
  isBorder?: boolean;
}

export default function Button({
  title,
  bg_color,
  text_color,
  onClick,
  icon,
  isBorder = false,
}: Props) {
  return (
    <div
      onClick={onClick}
      className={`w-full font-normal ${bg_color} ${text_color} p-2 text-h3 cursor-pointer rounded-md flex justify-center items-center gap-2 ${
        isBorder && "border border-zinc-200"
      }`}
    >
      {icon && <img className="h-ic w-ic" src={icon} alt={icon} />}
      {title}
    </div>
  );
}

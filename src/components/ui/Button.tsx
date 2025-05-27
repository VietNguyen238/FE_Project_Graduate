interface Props {
  title: string;
  bg_color: string;
  text_color: string;
  onClick?: () => void;
  icon?: string;
  isBorder?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function Button({
  title,
  bg_color,
  text_color,
  onClick,
  icon,
  isBorder = false,
  disabled = false,
  className = "",
}: Props) {
  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={`w-full font-normal ${bg_color} ${text_color} p-2 text-h3 rounded-md flex justify-center items-center gap-2 ${
        isBorder && "border border-zinc-200"
      } ${
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      } ${className}`}
    >
      {icon && <img className="h-ic w-ic p-[2px]" src={icon} alt={icon} />}
      {title}
    </div>
  );
}

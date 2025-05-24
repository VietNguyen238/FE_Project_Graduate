interface Props {
  icon: string;
  title: string;
  //   isArows?: boolean;
  current?: number;
  index?: number;
  show?: boolean;
  isColor?: boolean;
  onClick?: () => void;
}

export default function Button({
  icon,
  title,
  //   isArows = false,
  onClick,
  current,
  index,
  isColor = false,
}: Props) {
  return (
    <div
      className={`flex justify-between items-center p-1 my-1 cursor-pointer text-h4 text-title_color group 
         ${isColor && current === index && "bg-white rounded-[4px]"}`}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      <div className="flex items-center">
        <img className={`h-ic mr-2 w-ic`} src={icon} alt={icon} />
        <div
          className={`group-hover:text-link ${
            isColor && current === index && "font-medium "
          }`}
        >
          {title}
        </div>
      </div>
      {/* {isArows && (
        <img
          className={`h-ic p-[6px] bg-blue-700 rounded-md ${
            current === item
              ? "hidden group-hover:block"
              : "hidden group-hover:block"
          }`}
          src={`./src/assets/svgs/${
            current === item ? "ic_minus" : "ic_plus"
          }.svg`}
          alt={current === item ? "ic_minus" : "ic_plus"}
        />
      )} */}
    </div>
  );
}

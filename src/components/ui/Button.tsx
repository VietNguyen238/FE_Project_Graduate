interface Props {
  title: string;
  bg_color: string;
  text_color: string;
}

export default function Button({ title, bg_color, text_color }: Props) {
  return (
    <div
      className={`w-full font-normal ${bg_color} ${text_color} p-2 text-h3 rounded-md flex justify-center items-center`}
    >
      {title}
    </div>
  );
}

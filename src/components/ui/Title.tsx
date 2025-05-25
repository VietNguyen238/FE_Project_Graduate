interface Props {
  title: string;
}

export default function Title({ title }: Props) {
  return (
    <div className="text-title text-title_color font-medium mt-4 mb-2">
      {title}
    </div>
  );
}

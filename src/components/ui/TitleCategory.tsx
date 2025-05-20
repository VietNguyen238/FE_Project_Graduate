interface Props {
  title: string;
}

export default function TitleCategory({ title }: Props) {
  return (
    <div>
      <div className="text-h4">Nshop / {title}</div>
      <div className="text-h2 font-medium py-2">{title}</div>
    </div>
  );
}

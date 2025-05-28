import { useNavigate } from "react-router-dom";

interface Props {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ButtonOrder({ onClick }: Props) {
  const navigate = useNavigate();

  return (
    <div className="mt-8 flex justify-between">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        &larr; Quay lại
      </button>
      <button
        onClick={onClick}
        type="button"
        className="ml-3 inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Tiếp tục &rarr;
      </button>
    </div>
  );
}

import { assetsSvg } from "../../constants/assets";
import { formatDate } from "../utils/formatDate";

interface ReviewProps {
  rate: number;
  comment: string;
  name: string;
  image: string;
  time: string;
  isLast?: boolean;
}

export default function Review({
  rate,
  comment,
  name,
  image,
  time,
  isLast = false,
}: ReviewProps) {
  const rating = rate;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.1;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <>
      <div className="flex gap-4 text-h4 items-center my-2">
        <div className="w-16 h-16 flex justify-center items-center border-[2px] border-zinc-300">
          <img src={image} alt={image} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className="font-medium">{name}</div>
            <span className="text-gray-500 text-caption">
              {formatDate(time)}
            </span>
          </div>
          <div className="flex gap-1 my-1">
            {[...Array(fullStars)].map((_, index) => (
              <img
                key={`full-${index}`}
                src={assetsSvg.ic_star}
                alt="star"
                className="w-4 h-4"
              />
            ))}
            {hasHalfStar && (
              <img
                src={assetsSvg.ic_half_star}
                alt="half star"
                className="w-4 h-4"
              />
            )}
            {[...Array(emptyStars)].map((_, index) => (
              <img
                key={`empty-${index}`}
                src={assetsSvg.ic_noun_star}
                alt="empty star"
                className="w-4 h-4"
              />
            ))}
          </div>
          <p className="text-gray-700">{comment}</p>
        </div>
      </div>
      {!isLast && <hr className="border-zinc-300 mt-2" />}
    </>
  );
}

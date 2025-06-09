import { useEffect, useState } from "react";
import InputText from "../components/ui/InputText";
import Title from "../components/ui/Title";
import Button from "../components/ui/Button";
import { useSelector } from "react-redux";
import { getOrder } from "../services/orderService";
import { useDispatch } from "react-redux";

export default function Evaluate() {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const order = useSelector((state: any) => state.order.orders);
  console.log(order);
  const handleSubmit = () => {
    console.log({ rating, comment });
  };

  useEffect(() => {
    getOrder(dispatch);
  }, []);

  return (
    <div className="flex justify-center mb-8 mt-3">
      <div className="w-[600px]">
        <Title title="Đánh giá sản phẩm" />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="bg-white p-4 shadow-md"
        >
          <div className="mb-4">
            <div className="text-h4 text-title_color font-medium mb-2">
              Đánh giá:
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="text-2xl focus:outline-none"
                >
                  {star <= rating ? "★" : "☆"}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <InputText
              title="Nhận xét"
              value={comment}
              type="text"
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <Button
            title="Gửi đánh giá"
            bg_color="bg-blue-500"
            text_color="text-white"
            onClick={handleSubmit}
          />
        </form>
      </div>
    </div>
  );
}

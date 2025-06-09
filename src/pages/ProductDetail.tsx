import { useEffect, useState } from "react";
import Button from "../components/ui/Button";
import { assetsImage, assetsSvg } from "../constants/assets";
import Freeship from "../components/ui/Freeship";
import { useNavigate, useParams } from "react-router-dom";
import { formatPrice } from "../components/utils/format_price";
import { getAProduct } from "../services/productService";
import { ProductDetailProps, ReviewProps } from "../types";
import { colorClassMap } from "../constants";
import { addCart, updateUserCart } from "../services/cartService";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getReviews } from "../services/reviewService";
import Review from "../components/ui/Review";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductDetailProps | null>(null);
  const [reviews, setReviews] = useState<ReviewProps[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [color, setColor] = useState("");
  const [isShow, setIsShow] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user.user);
  const cart = useSelector((state: any) => state.cart.items);
  const dispatch = useDispatch();

  const handlePrevious = () => {
    if (product?.imageUrl) {
      const newIndex =
        (currentImageIndex - 1 + product.imageUrl.length) %
        product.imageUrl.length;
      setCurrentImageIndex(newIndex);
    }
  };

  const handleNext = () => {
    if (product?.imageUrl) {
      const newIndex = (currentImageIndex + 1) % product.imageUrl.length;
      setCurrentImageIndex(newIndex);
    }
  };

  const handleBuy = () => {
    if (!user.name) {
      navigate("/login");
    } else {
      const existingCartItem = cart.find(
        (item: any) => item.productId._id === product?._id
      );

      if (existingCartItem) {
        updateUserCart(
          { quantity: existingCartItem.quantity + 1 },
          dispatch,
          existingCartItem._id
        );
      } else {
        addCart(
          {
            userId: user.id,
            productId: product?._id,
            quantity: 1,
          },
          dispatch
        );
      }
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      if (id) {
        const apiProducts = await getAProduct(id);
        const apiReviews = await getReviews(id);

        if (apiProducts) {
          setProduct(apiProducts);
          setReviews(apiReviews);
          setCurrentImageIndex(0);
        }
      }
    };

    fetchProducts();
  }, [id]);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <div className="p-4 shadow grid grid-cols-12 bg-white">
        <div className="col-span-5 mr-4">
          <div className="h-[354px] w-full relative mb-4">
            <img
              src={product?.imageUrl[currentImageIndex]}
              alt={product?.nameProduct}
              className="aspect-square w-full"
            />
            {product?.imageUrl && product.imageUrl.length > 1 && (
              <>
                <button
                  onClick={handlePrevious}
                  className="absolute left-2 top-1/2 -translate-y-1/2 hover:bg-white/25 p-2 rounded-full"
                >
                  <img
                    className="h-ic w-ic p-1"
                    src={assetsSvg.ic_arows_left}
                    alt="ic_arows_left"
                  />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-white/25 p-2 rounded-full"
                >
                  <img
                    className="h-ic w-ic p-1"
                    src={assetsSvg.ic_arows_right}
                    alt="ic_arows_right"
                  />
                </button>
              </>
            )}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product?.imageUrl.map((imageUrl, index) => (
              <img
                onMouseEnter={() => setCurrentImageIndex(index)}
                key={index}
                src={imageUrl}
                alt={`${product.nameProduct} - ${index + 1}`}
                className="col-span-1 w-full aspect-square object-cover cursor-pointer"
              />
            ))}
          </div>
        </div>
        <div className="col-span-7 text-title_color">
          <div className="text-h2 font-medium">{product.nameProduct}</div>
          <div className="text-h4 text-gray">
            {typeof product.categoryId === "string"
              ? product.categoryId
              : product.categoryId?.name || "Chưa phân loại"}
          </div>
          <div className="text-h2 font-bold text-rose-600 mt-2">
            {formatPrice(product.newPrice ? product.newPrice : product.price)}₫
          </div>
          <div className="text-h4 mt-2">
            Mã sản phẩm:{" "}
            <span className="font-medium">
              {product._id.slice(-4).toUpperCase()}
            </span>
          </div>
          <div className="mt-2 w-[145px]">
            <Button
              icon={assetsSvg.ic_cart}
              bg_color="bg-red-500"
              text_color="text-white"
              title="Mua hàng"
              disabled={product.quantity === 0}
              onClick={handleBuy}
            />
          </div>
          {product.quantity === 0 ? (
            <div className="text-red-600 font-medium mt-2">
              Sản phẩm hiện đang hết hàng.
            </div>
          ) : (
            <div className="text-green-600 font-medium mt-2">
              Còn {product.quantity} sản phẩm.
            </div>
          )}
          <div
            className="text-h4 mt-3 whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: product.basicInformation }}
          />
          <div className="text-h4 font-bold mt-6">SẢN PHẨM CÙNG LOẠI</div>
          <div className="text-h4 mt-2 flex gap-4">
            {product.color?.map(
              (item: { colorProduct: string }, index: number) => (
                <div
                  key={index}
                  onClick={() => setColor(item.colorProduct)}
                  className={`px-3 shadow rounded cursor-pointer py-1 ${
                    color === item.colorProduct
                      ? colorClassMap[
                          item.colorProduct as keyof typeof colorClassMap
                        ]
                      : ""
                  }`}
                >
                  {item.colorProduct}
                </div>
              )
            )}
          </div>
          <div className="text-h4 font-bold mt-6">
            DỊCH VỤ & KHUYẾN MÃI LIÊN QUAN
          </div>
          <div className="mt-2 text-caption text-title_color flex gap-2 bg-zinc-200 px-2 py-1 border border-zinc-300">
            <img
              className="h-ic w-ic"
              src={assetsImage.im_membership}
              alt="im_membership"
            />
            Cộng thêm 14 điểm tích lũy
          </div>
          <div
            className="mt-2 text-caption text-title_color flex gap-2 bg-zinc-200 px-2 py-1 border border-zinc-300 cursor-pointer"
            onClick={() => setIsShow(!isShow)}
          >
            <img className="h-ic w-ic" src={assetsImage.im_car} alt="im_car" />
            <div>
              <span>
                Đơn hàng có giá trị từ 300.000 (đ), miễn phí vận chuyển [ tối đa
                15.000 (đ) ].
              </span>
              <span>
                Đơn hàng có giá trị từ 500.000 (đ), miễn phí vận chuyển [ tối đa
                35.000 (đ) ].
              </span>
              <span>Xem thêm các khuyến mãi vận chuyển khác.</span>
            </div>
          </div>
        </div>
      </div>
      {isShow && <Freeship isOpen={isShow} onClose={() => setIsShow(false)} />}
      <div className="p-4 shadow mt-4 bg-white">
        <div className="font-medium text-h3">Chi tiết sản phẩm</div>
        <div
          className="whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: product.description || "" }}
        />
      </div>
      <div className="p-4 shadow mt-4 bg-white">
        <div className="font-medium text-h3">Sản phẩm liên quan</div>
      </div>
      <div className="p-4 shadow mt-4 bg-white">
        <div className="font-medium text-h3">Phản hồi từ khách hàng</div>
        <hr className="border-zinc-300 mt-2" />
        {reviews.length > 0 ? (
          reviews
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((review, index) => (
              <Review
                key={index}
                comment={review.comment}
                image={review.userId?.imageUrl || ""}
                name={review.userId?.name || "Anonymous"}
                rate={review.rating}
                time={review.createdAt}
                isLast={reviews.length - 1 == index && true}
              />
            ))
        ) : (
          <div className="text-h3 mt-2">Chưa có đánh giá sản phẩm</div>
        )}
      </div>
    </div>
  );
}

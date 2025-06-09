export const selectFilter = (selectedFilter: string, products: any[]) => {
  let filteredProducts = [...products];
  switch (selectedFilter) {
    case "Nổi bật":
      filteredProducts = filteredProducts.filter(
        (product) => product.isFeatured === true
      );
      break;
    case "Giảm giá":
      filteredProducts = filteredProducts.filter(
        (product) => product.newPrice > 0 && product.newPrice < product.price
      );
      break;
    case "Còn hàng":
      filteredProducts = filteredProducts.filter(
        (product) => product.quantity > 0
      );
      break;
    case "Tất cả":
    default:
      break;
  }
  return filteredProducts;
};

export const selectSort = (selectedSort: string, products: any[]) => {
  let sortedProducts = [...products];
  switch (selectedSort) {
    case "Giá thấp":
      sortedProducts = [...sortedProducts].sort(
        (a, b) => (a.newPrice || a.price) - (b.newPrice || b.price)
      );
      break;
    case "Giá cao":
      sortedProducts = [...sortedProducts].sort(
        (a, b) => (b.newPrice || b.price) - (a.newPrice || a.price)
      );
      break;
    case "Mới nhất":
      sortedProducts = [...sortedProducts].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
    default:
      break;
  }
  return sortedProducts;
};

export const actionPaymentMethod = (paymentMethod: string) => {
  switch (paymentMethod) {
    case "cod":
      return "Thanh toán khi nhận hàng";
    case "vnpay":
      return "Thanh toán trực tuyến";
    case "store":
      return "Vui lòng đến cửa hàng để thanh toán và nhận hàng";
    default:
      return "Chưa chọn phương thức vận chuyển";
  }
};

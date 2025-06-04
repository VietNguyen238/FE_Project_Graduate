import { FormField } from "../types";
import { assetsImage, assetsSvg } from "./assets";

export const listFilter = [
  { icon: assetsImage.im_arduino, title: "Arduino", params: "arduino" },
  { icon: assetsImage.im_cam_bien, title: "Cảm biến", params: "cam-bien" },
  { icon: assetsImage.im_combo, title: "Combo khuyến mãi", params: "combo" },
  {
    icon: assetsImage.im_den_led,
    title: "Đèn LED, Điều khiển LED",
    params: "den-led-dieu-khien-den-led",
  },
  {
    icon: assetsImage.im_dien,
    title: "Điện dân dụng và Công nghiệp",
    params: "dien-dan-dung-va-cong-nghiep",
  },
  {
    icon: assetsImage.im_dien_nlmt,
    title: "Điện năng lượng mặt trời",
    params: "dien-nang-luong-mat-troi-solar",
  },
  {
    icon: assetsImage.im_dong_ho,
    title: "Đồng hồ vạn năng",
    params: "dong-ho-van-nang",
  },
  {
    icon: assetsImage.im_may_in,
    title: "Máy in 3D, Công nghệ",
    params: "may-in-3d-cong-nghe",
  },
  {
    icon: assetsImage.im_module,
    title: "Module, Mạch điện",
    params: "module-mach-dien",
  },
  {
    icon: assetsImage.im_han,
    title: "Phụ kiện, Dụng cụ",
    params: "phu-kien-dung-cu",
  },
  {
    icon: assetsImage.im_robot,
    title: "Robot, Phụ kiện DIY",
    params: "robot-phu-kien-diy",
  },
];

export const fadeImages = [
  {
    url: "./src/assets/images/im_slide_show.gif",
  },
  {
    url: "./src/assets/images/im_slide_show1.gif",
  },
  {
    url: "./src/assets/images/im_slide_show2.gif",
  },
];

export const header = [
  {
    link: "",
    title: "Trang chủ",
  },
  {
    link: "products",
    title: "Sản phẩm",
  },
  {
    link: "blog",
    title: "Blog",
  },
  {
    link: "he-thong-cua-hang",
    title: "Hệ thống cửa hàng",
  },
];

export const selectFilter = [
  {
    title: "Tất cả",
  },
  {
    title: "Nổi bật",
  },
  {
    title: "Giảm giá",
  },
  {
    title: "Còn hàng",
  },
];

export const selectSort = [
  {
    title: "Mới nhất",
  },
  {
    title: "Giá thấp",
  },
  {
    title: "Giá cao",
  },
];

export const dataStoreSystem = [
  {
    title: "Điện tử NShop – Quận 9",
    workingTime: "từ 8h00 đến 18h00",
    address: "7 Trần Hưng Đạo, Hiệp Phú, Quận 9, TP. HCM",
    phone1: "093 27 23 186",
    phone2: "093 27 34 186",
    technicalNumber: "0339 449 749",
    image: assetsImage.im_quan_9,
    map: { lat: 10.847163, lng: 106.774902 },
  },
  {
    title: "Điện tử NShop – Tân Phú",
    workingTime: "từ 8h00 – 12h00 và 13h00 – 18h00 (nghỉ trưa 12h-13h)",
    address: "1 Bùi Xuân Phái, Tây Thạnh, Tân Phú, TP. HCM",
    phone1: "0902 64 39 78",
    phone2: "0904 83 35 36",
    technicalNumber: "033 944 9749",
    image: assetsImage.im_tan_phu,
    map: { lat: 10.80648, lng: 106.62832 },
  },
];

export const shippingMethods = [
  {
    id: "express",
    name: "Giao hàng nhanh",
    icon: assetsSvg.ic_shipping,
    price: 24000,
  },
  {
    id: "super-express",
    name: "Giao siêu tốc (1h)",
    icon: assetsSvg.ic_shipping_express,
    price: 26000,
  },
];

export const formFields: FormField[] = [
  { field: "phone", title: "số điện thoại", type: "text" },
  { field: "email", title: "email", type: "email" },
  { field: "name", title: "tên", type: "text" },
];

export const colorClassMap: { [key: string]: string } = {
  xanh: "bg-green-500 text-white",
  đỏ: "bg-red-500 text-white",
  vàng: "bg-yellow-500 text-white",
  trắng: "bg-white text-black",
  đen: "bg-black text-white",
  xám: "bg-gray-500 text-white",
  nâu: "bg-brown-500 text-white",
  tím: "bg-purple-500 text-white",
};

export const colorShipping = {
  waitForConfirmation: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  shipping: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  received: "bg-emerald-100 text-emerald-800",
  canceled: "bg-red-100 text-red-800",
};

export const statusShipping = {
  waitForConfirmation: "Chờ xác nhận",
  confirmed: "Xác nhận",
  shipping: "Đang vận chuyển",
  delivered: "Đã giao",
  received: "Đã nhận hàng",
  canceled: "Hủy",
};

import { assetsImage } from "./assets";

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

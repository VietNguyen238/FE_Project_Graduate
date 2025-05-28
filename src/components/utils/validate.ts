import z from "zod";

const FormAuth = z.object({
  phone: z
    .string()
    .min(10, "Số điện thoại phải có ít nhất 10 chữ số")
    .max(15, "Số điện thoại không được vượt quá 15 chữ số")
    .regex(/^[0-9]+$/, "Số điện thoại chỉ được chứa chữ số"),
  email: z
    .string()
    .email("Địa chỉ email không hợp lệ")
    .min(1, "Email là bắt buộc"),
  name: z
    .string()
    .min(2, "Tên phải có ít nhất 2 ký tự")
    .max(50, "Tên không được vượt quá 50 ký tự"),
  password: z
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .regex(/[A-Z]/, "Mật khẩu phải chứa ít nhất một chữ hoa")
    .regex(/[a-z]/, "Mật khẩu phải chứa ít nhất một chữ thường")
    .regex(/[0-9]/, "Mật khẩu phải chứa ít nhất một số")
    .regex(/[^A-Za-z0-9]/, "Mật khẩu phải chứa ít nhất một ký tự đặc biệt"),
});

const FormCheckout = z.object({
  phone: z
    .string()
    .min(10, "Số điện thoại phải có ít nhất 10 chữ số")
    .max(15, "Số điện thoại không được vượt quá 15 chữ số")
    .regex(/^[0-9]+$/, "Số điện thoại chỉ được chứa chữ số"),
  email: z
    .string()
    .email("Địa chỉ email không hợp lệ")
    .min(1, "Email là bắt buộc"),
  name: z
    .string()
    .min(2, "Tên phải có ít nhất 2 ký tự")
    .max(50, "Tên không được vượt quá 50 ký tự"),
});

const FormAddress = z.object({
  province: z.string().min(1, "Vui lòng chọn tỉnh/thành phố"),
  district: z.string().min(1, "Vui lòng chọn quận/huyện"),
  ward: z.string().min(1, "Vui lòng chọn phường/xã"),
  address: z.string().min(1, "Vui lòng nhập địa chỉ chi tiết"),
  shippingMethod: z.string().min(1, "Vui lòng chọn phương thức vận chuyển"),
  shippingFee: z.number().min(1, "Vui lòng chọn phương thức vận chuyển"),
});

export { FormAuth, FormAddress, FormCheckout };

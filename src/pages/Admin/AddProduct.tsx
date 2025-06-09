import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "antd";
import InputText from "../../components/ui/InputText";
import Title from "../../components/ui/Title";
import Button from "../../components/ui/Button";
import Option from "../../components/ui/Option";
import { getCategory } from "../../services/CategoryService";
import { createProduct } from "../../services/productService";
import { useNavigate } from "react-router-dom";

interface FormData {
  nameProduct: string;
  price: number;
  newPrice: number;
  quantity: number;
  description: string;
  basicInformation: string;
  categoryId: string;
  imageUrl: string[];
}

const formFields = [
  { title: "Tên sản phẩm", name: "nameProduct", type: "text" },
  { title: "Giá", name: "price", type: "number" },
  { title: "Giá mới", name: "newPrice", type: "number" },
  { title: "Số lượng", name: "quantity", type: "number" },
] as const;

const { TextArea } = Input;

export default function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const category = useSelector((state: any) => state.category.items);

  const [formData, setFormData] = useState<FormData>({
    nameProduct: "",
    price: 0,
    newPrice: 0,
    quantity: 0,
    description: "",
    basicInformation: "",
    categoryId: "",
    imageUrl: [],
  });
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [basicPreviewUrls, setBasicPreviewUrls] = useState<string[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    isBasic: boolean = false
  ) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));

    if (isBasic) {
      setBasicPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
      const imageHtml = files
        .map(
          (file) =>
            `<img src="${URL.createObjectURL(file)}" alt="${
              file.name
            }" style="max-width: 100%; height: auto;" /><br/>`
        )
        .join("");
      setFormData((prev) => ({
        ...prev,
        description: (prev.description || "") + imageHtml,
      }));
    } else {
      setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
      setFormData((prev) => ({
        ...prev,
        imageUrl: [...prev.imageUrl, ...newPreviewUrls],
      }));
    }
  };

  const removeImage = (index: number, isBasic: boolean = false) => {
    if (isBasic) {
      setBasicPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    } else {
      setFormData((prev) => ({
        ...prev,
        imageUrl: prev.imageUrl.filter((_, i) => i !== index),
      }));
      setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    createProduct(formData);
    navigate("/admin/product");
  };

  useEffect(() => {
    getCategory(dispatch);
  }, [dispatch]);

  const renderImagePreview = (urls: string[], isBasic: boolean = false) => (
    <div className="mt-4 grid grid-cols-4 gap-4">
      {urls.map((url, index) => (
        <div key={index} className="relative">
          <img
            src={url}
            alt={`Xem trước ${index + 1}`}
            className="w-full h-32 object-cover rounded-md"
          />
          <button
            type="button"
            onClick={() => removeImage(index, isBasic)}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <Title title="Thêm sản phẩm" />
      <div className="bg-white p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="text-h4 text-title_color font-medium mb-2">
              Hình ảnh sản phẩm:
            </div>
            <div className="border border-zinc-400 rounded-md p-4">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleImageUpload(e)}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
              {renderImagePreview(previewUrls)}
            </div>
          </div>

          {formFields.map((field) => (
            <InputText
              key={field.name}
              title={field.title}
              value={formData[field.name] as string}
              type={field.type}
              onChange={handleInputChange}
              name={field.name}
            />
          ))}

          <Option
            title="Danh mục"
            selected={formData.categoryId}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, categoryId: e.target.value }))
            }
            list={category.map((cat: { _id: string; name: string }) => ({
              code: cat._id,
              name: cat.name,
            }))}
            option="Chọn danh mục"
            htmlFor="category"
          />

          <div>
            <div className="text-h4 text-title_color font-medium">
              {" "}
              Thông tin cơ bản:
            </div>
            <TextArea
              name="basicInformation"
              value={formData.basicInformation}
              onChange={handleInputChange}
              placeholder="Nhập thông tin cơ bản sản phẩm"
              className="w-full px-2 py-1 border border-zinc-400 rounded-md mt-2"
              rows={4}
            />
          </div>

          <div>
            <div className="text-h4 text-title_color font-medium">Mô tả:</div>
            <div className="border border-zinc-400 rounded-md p-4">
              <div className="mb-4">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImageUpload(e, true)}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
                {renderImagePreview(basicPreviewUrls, true)}
              </div>
              <TextArea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Nhập nội dung HTML với hình ảnh"
                className="w-full px-2 py-1 border border-zinc-400 rounded-md"
                rows={6}
              />
            </div>
          </div>

          <Button
            title="Thêm sản phẩm"
            bg_color="bg-blue-500"
            text_color="text-white"
            onClick={handleSubmit}
          />
        </form>
      </div>
    </div>
  );
}

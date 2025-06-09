import { useEffect, useState } from "react";
import Title from "../../components/ui/Title";
import { getAllProduct, deleteProduct } from "../../services/productService";
import { ProductProps } from "../../types";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { assetsImage } from "../../constants/assets";
import { useDispatch } from "react-redux";
import InputSearchAdmin from "../../components/ui/InputSearchAdmin";
import { useTitleContext } from "../../context/TitleContext";

export default function ProductList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setProduct] = useState<ProductProps[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const { setTitle } = useTitleContext();

  useEffect(() => {
    setTitle("Danh sách sản phẩm");
  }, [setTitle]);

  const fetchProduct = async (_pageNum: number) => {
    try {
      setLoading(true);
      const apiProduct = await getAllProduct(dispatch);
      setProduct(apiProduct);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct(1);
  }, []);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  const endOffset = (currentPage + 1) * itemsPerPage;
  const startOffset = currentPage * itemsPerPage;
  const currentItems = products
    .filter((product) =>
      product.nameProduct.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(startOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        await deleteProduct(id);
        fetchProduct(1);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div>
      <Title title="Danh sách sản phẩm" />
      <div className="bg-white p-6">
        <div className="mb-4">
          <InputSearchAdmin
            placeholder="Tìm kiếm theo tên sản phẩm..."
            onSearch={setSearchTerm}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Hình ảnh
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tên sản phẩm
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Giá
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Số lượng
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems?.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-2 py-1">
                    <div className="h-24 w-16 flex items-center justify-center overflow-hidden bg-gray-100 rounded">
                      <img
                        src={
                          product.imageUrl && product.imageUrl.length > 0
                            ? product.imageUrl[0]
                            : assetsImage.im_arduino
                        }
                        alt={product.nameProduct}
                        className="w-full h-full object-contain rounded"
                      />
                    </div>
                  </td>
                  <td
                    className="px-3 py-2 cursor-pointer"
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    <div className="text-sm font-medium text-gray-900">
                      {product.nameProduct}
                    </div>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {product.newPrice ? (
                        <>
                          <span className="text-red-500 font-bold">
                            {product.newPrice.toLocaleString("vi-VN")}đ
                          </span>
                          <span className="text-gray-500 line-through">
                            {product.price.toLocaleString("vi-VN")}đ
                          </span>
                        </>
                      ) : (
                        <span className="text-red-500 font-bold">
                          {product.price.toLocaleString("vi-VN")}đ
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                    {product.quantity}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          navigate(`/admin/product/update/${product._id}`)
                        }
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                      >
                        Cập nhật
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {loading && (
            <div className="text-center py-4">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
            </div>
          )}
          {pageCount > 0 && (
            <div className="flex justify-center mt-8 mb-4">
              <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
                className="flex items-center gap-3"
                pageClassName="py-1 rounded hover:bg-gray-100 transition-colors"
                pageLinkClassName="text-gray-700 hover:text-gray-900 px-3 py-1"
                activeClassName="bg-blue-500 text-white hover:bg-blue-600"
                activeLinkClassName="text-white"
                previousClassName="px-3 py-1 rounded hover:bg-gray-100 transition-colors"
                nextClassName="py-1 rounded hover:bg-gray-100 transition-colors"
                previousLinkClassName="text-gray-700 hover:text-gray-900"
                nextLinkClassName="text-gray-700 hover:text-gray-900 px-3 py-1"
                disabledClassName="opacity-50 cursor-not-allowed"
                breakClassName="px-2"
                forcePage={currentPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import ProductCard from "./ProductCard";
import { PaginatedItemsProps, ProductProps } from "../../types";

export default function PaginatedItems({
  itemsPerPage,
  filteredProducts,
}: PaginatedItemsProps) {
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setItemOffset(0);
    setCurrentPage(0);
  }, [filteredProducts]);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredProducts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;

    setItemOffset(newOffset);
    setCurrentPage(event.selected);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
        {currentItems.map((product: ProductProps, index: number) => (
          <ProductCard
            _id={product._id}
            key={index}
            price={product.price}
            imageUrl={product.imageUrl[0]}
            nameProduct={product.nameProduct}
            newPrice={product.newPrice}
            quantity={product.quantity}
          />
        ))}
      </div>
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
          nextClassName=" py-1 rounded hover:bg-gray-100 transition-colors"
          previousLinkClassName="text-gray-700 hover:text-gray-900"
          nextLinkClassName="text-gray-700 hover:text-gray-900 px-3 py-1"
          disabledClassName="opacity-50 cursor-not-allowed"
          breakClassName="px-2"
          forcePage={currentPage}
        />
      </div>
    </div>
  );
}

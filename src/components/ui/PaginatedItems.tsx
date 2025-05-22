import { useState } from "react";
import ReactPaginate from "react-paginate";
import ProductCard from "./ProductCard";

interface Product {
  title: string;
  price: number;
  image: string;
  newPrice?: number;
  quantity: number;
}

interface PaginatedItemsProps {
  itemsPerPage: number;
  filteredProducts: Product[];
}

export default function PaginatedItems({
  itemsPerPage,
  filteredProducts,
}: PaginatedItemsProps) {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = filteredProducts.slice(itemOffset, endOffset);
  console.log("requested", currentItems);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
        {currentItems.map((product: Product, index: number) => (
          <ProductCard
            key={`${product.title}-${index}`}
            price={product.price}
            image={product.image}
            title={product.title}
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
          className="flex items-center gap-2"
          pageClassName="px-3 py-1 rounded hover:bg-gray-100 transition-colors"
          pageLinkClassName="text-gray-700 hover:text-gray-900"
          activeClassName="bg-blue-500 text-white hover:bg-blue-600"
          activeLinkClassName="text-white"
          previousClassName="px-3 py-1 rounded hover:bg-gray-100 transition-colors"
          nextClassName="px-3 py-1 rounded hover:bg-gray-100 transition-colors"
          previousLinkClassName="text-gray-700 hover:text-gray-900"
          nextLinkClassName="text-gray-700 hover:text-gray-900"
          disabledClassName="opacity-50 cursor-not-allowed"
          breakClassName="px-2"
        />
      </div>
    </div>
  );
}

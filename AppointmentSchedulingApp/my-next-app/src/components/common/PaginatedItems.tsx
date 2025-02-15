"use client";

import { useState } from "react";
import ReactPaginate from "react-paginate";

interface PaginatedItemsProps<T> {
  itemsPerPage: number;
  items: T[];
  RenderComponent: React.ComponentType<{ items: T[] }>; 
}

const PaginatedItems = <T,>({itemsPerPage,items,RenderComponent}: PaginatedItemsProps<T>) => {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="flex flex-col items-center">
      <RenderComponent items={currentItems} />

      <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        previousLabel="< Prev"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        containerClassName="flex items-center space-x-2 mt-4"
        pageClassName="px-3 py-2 rounded-lg border text-gray-700 hover:bg-cyan-500 hover:text-white transition"
        pageLinkClassName="block"
        activeClassName="bg-cyan-500 text-white border-cyan-500"
        previousClassName="px-3 py-2 rounded-lg hover:bg-cyan-500 hover:text-white transition"
        nextClassName="px-3 py-2 rounded-lg hover:bg-cyan-500 hover:text-white transition"
        disabledClassName="opacity-50 cursor-not-allowed"
      />
    </div>
  );
};

export default PaginatedItems;

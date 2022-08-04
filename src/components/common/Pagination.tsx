import React from "react";
import _ from "lodash";

interface PaginationProps {
  itemsCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}
function Pagination({
  itemsCount,
  pageSize,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <ul className="pagination">
      {pages.map((page) => (
        <li
          key={page}
          className={page === currentPage ? "page-item active" : "page-item"}
        >
          <a onClick={() => onPageChange(page)} className="page-link">
            {page}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default Pagination;

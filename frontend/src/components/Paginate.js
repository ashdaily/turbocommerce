import React from "react";
import { Pagination } from "react-bootstrap";

export default ({
  className,
  size,
  hasNext,
  hasPrevious,
  numPages,
  pageNumber,
  setPageNumber,
}) => {
  return (
      <div className={'text-center'}>
      <button  onClick={() => setPageNumber(pageNumber + 1)} disabled={!hasNext} className={'btn btn-primary btn-load-more'}>
        Load More
      </button>
      </div>
  )
};

import React from "react";
import { Pagination } from "react-bootstrap";


export default ({
        className,
        size,
        hasNext,
        hasPrevious,
        numPages,
        pageNumber,
        setPageNumber
    }) => {
    return (
        <>
            {/* <p className="my-3">Page {pageNumber} of {numPages}</p> */}
            <Pagination size={size} className={className}>
                <Pagination.Prev disabled={!hasPrevious} onClick={()=>setPageNumber(pageNumber-1)}>
                    <i className="fa fa-angle-left"></i> Previous
                </Pagination.Prev>
                <Pagination.Next  disabled={!hasNext} onClick={()=>setPageNumber(pageNumber+1)}>
                    Next <i className="fa fa-angle-right"></i>
                </Pagination.Next>
            </Pagination>
        </>
    )
}

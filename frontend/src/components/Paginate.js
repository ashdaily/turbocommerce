import React from "react";
import { Pagination } from "react-bootstrap";

export default ({
        hasNext,
        hasPrevious,
        numPages,
        pageNumber,
        setPageNumber
    }) => {
    return (
        <>
            {/* <p className="my-3">Page {pageNumber} of {numPages}</p> */}
            <Pagination>
                <Pagination.Prev onClick={()=>setPageNumber(pageNumber-1)} hidden={!hasPrevious}>
                    <i className="fa fa-angle-left"></i> Previous
                </Pagination.Prev>
                <Pagination.Next  onClick={()=>setPageNumber(pageNumber+1)} hidden={!hasNext}>
                    Next <i className="fa fa-angle-right"></i>
                </Pagination.Next>
            </Pagination>
        </>
    )
}

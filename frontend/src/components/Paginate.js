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
            <p>Page {pageNumber} of {numPages}</p>
            <Pagination>
                <Pagination.Prev onClick={()=>setPageNumber(pageNumber-1)} hidden={!hasPrevious}/>
                <Pagination.Next  onClick={()=>setPageNumber(pageNumber+1)} hidden={!hasNext}/>
            </Pagination>
        </>
    )
}

import React, { useEffect, useState } from "react";
import "./pagination.css";


export function Pagination ({data = [], pageSize = 5, onChange = () => {}, pageOptions = 5}) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / pageSize);
  const handleOnChange = (pageNo) => {
    console.log({ pageNo });
    onChange(data.slice((pageNo - 1) * pageSize, pageNo * pageSize));
    setCurrentPage(pageNo);
  };
  const onPreviousClick = () => {
    onChange(
      data.slice((currentPage - 2) * pageSize, (currentPage - 1) * pageSize)
    );
    setCurrentPage(currentPage - 1);
  };
  const onNextClick = () => {
    onChange(data.slice(currentPage * pageSize, (currentPage + 1) * pageSize));
    setCurrentPage(currentPage + 1);
  };
  useEffect(() => {
    onChange(data.slice(0, 5));
  }, [data]);
  return (
    <div className="pagination-container">
      <button disabled={currentPage === 1} onClick={onPreviousClick}>
        Prev
      </button>
      {data.slice(0, totalPages).map((e, index) => {
        if (index >= currentPage - 1 && index < currentPage + pageOptions - 1) {
          return (
            <div
              key={index}   
              onClick={() => {handleOnChange(index + 1)}}
              className={`pagination-circle ${
                index + 1 === currentPage && "pagination-active-page"
              }`}
            >
              {index + 1}
            </div>
          );
        } else {
          return <></>;
        }
      })}
      <button disabled={currentPage === totalPages} onClick={onNextClick}>
        Next
      </button>
    </div>
  );
};

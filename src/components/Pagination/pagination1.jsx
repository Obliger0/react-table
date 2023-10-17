import "./pagination.css";

export function Pagination1({
  data = [],
  pageSize = 5,
  onChange = () => {},
  pageOptions = 5,
}) {

    const totalPages = Math.ceil(data.length/pageSize);
    console.log({totalPages});
  return (
    <div className="pagination-container">
      <button >{"<"}</button>
      {data.slice(0,totalPages).map((e,idx)=>{
       return <div className="pagination-circle">{idx+1}</div>;
      })}
      <button>{">"}</button>
    </div>
  );
}

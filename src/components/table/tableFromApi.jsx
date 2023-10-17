import { useState, useEffect } from "react";
import { apiData } from "../../Data/apiData";
import { ModalComp } from "../modal/modal";
import { Pagination1 } from "../Pagination/pagination1";
import { Pagination } from "../Pagination/pagination";
export function TableCompFromApi({ openModal, setOpenModal }) {
  const [header, setHeader] = useState([]);
  const [body, setBody] = useState([]);
  const [search, setSearch] = useState({ val: "", idx: 0 });
  const [rowPageData, setRowPageData] = useState([]);
  const pageSize = 5;
  const pageOptions = 5;

  useEffect(() => {
    setDataInState(apiData);
    // eslint-disable-next-line
  }, []);

  function getRows(items, columnTypes) {
    const columnNames = Object.keys(columnTypes);
    return items.map((item) => ({
      cells: columnNames.map((columnName) => ({
        cellValue: item[columnName],
      })),
    }));
  }
  function getColumns(columnTypes) {
    return Object.keys(columnTypes).map((key) => ({
      columnName: key,
      columnComponentType: columnTypes[key],
    }));
  }

  function setDataInState(apiData) {
    const { items = [], metaData = {} } = apiData;
    const { columnTypes = {} } = metaData;
    const columnData = getColumns(columnTypes);
    const rowData = getRows(items, columnTypes);
    // console.log({columnData,rowData});
    setHeader(columnData);
    setBody(rowData);
  }

  return (
    <>
      {openModal && <ModalComp setOpenModal={setOpenModal} />}
      <button>Add Column</button>
      <button>Add Row</button>
      <table className="table-container">
        <thead>
          {rowPageData.map((col, idx) => {
            // console.log({ col });
            return (
              <th>
                <span>
                  <input
                    type="text"
                    value={col.columnName}
                    placeholder={col.columnName}
                  />
                  <input
                    id={idx}
                    type="search"
                    onChange={(e) => {
                      setSearch({ val: "" + e.target.value, idx: e.target.id });
                      // console.log({search});
                    }}
                  />
                </span>
              </th>
            );
          })}
        </thead>
        <tbody>
          {body.map((row, idx) => {
            // console.log({row});
            const currentVal = "" + row.cells[search.idx].cellValue;
            if (currentVal.toLowerCase().includes(search.val.toLowerCase()))
              return (
                <tr>
                  {row.cells.map((data, idx) => {
                    // console.log({data});
                    const inputType = header[idx].columnComponentType;
                    // console.log({ inputType });
                    return (
                      <td>
                        <InputComp
                          data={data}
                          inputType={inputType}
                          setOpenModal={setOpenModal}
                        />
                      </td>
                    );
                  })}
                </tr>
              );
            else return "";
          })}
        </tbody>
      </table>
      <Pagination
        data={body}
        pageSize={pageSize}
        pageOptions={pageOptions}
        onChange={(data) => setRowPageData(data)}
      />
      <Pagination1
        data={body}
        pageSize={pageSize}
        pageOptions={pageOptions}
        setRowPageData={(data) => setRowPageData(data)}
      />
    </>
  );
}

function InputComp({ data, inputType, setOpenModal }) {
  // console.log({inputType});
  if (inputType === "textarea") {
    return <textarea placeholder={data.cellValue} value={data.cellValue} />;
  } else if (inputType === "input") {
    return <input placeholder={data.cellValue} value={data.cellValue} />;
  } else if (inputType === "button") {
    return (
      <button
        onClick={() => {
          setOpenModal(true);
        }}
      >
        Add image
      </button>
    );
  }
}

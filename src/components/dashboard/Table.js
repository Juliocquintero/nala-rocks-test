import React from "react";
import TableHeader from "./TableHeader";

const Table = ({ items, nombresDeCampos }) => {
  const headers = nombresDeCampos;

  return (
    <>
      <table className="table-container">
        <TableHeader headers={headers} />

      </table>
    </>
  );
};

export default Table;

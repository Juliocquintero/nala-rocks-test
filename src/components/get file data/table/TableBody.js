import React from "react";

const TableRoad = ({ data, headers }) => {
  return (
    <tr>
      {headers.map((header, innerIndex) => (
        <td key={innerIndex + "td"}>{data[header.original]}</td>
      ))}
    </tr>
  );
};

const TableBody = ({ items, nombresDeCampos, generarKey }) => {
  const headers = nombresDeCampos;

  return (
    <>
      <tbody>
        {items.map((data) => (
          <TableRoad data={data} headers={headers} key={generarKey(data)} />
        ))}
      </tbody>
    </>
  );
};

export default TableBody;

import React from "react";

const TableHeader = ({ nombresDeCampos, handleNombreCampo, generarKey }) => {
  const headers = nombresDeCampos;

  return (
    <>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={generarKey(header)}>
              <input
                type="text"
                value={header.modificado || header.original}
                name={header.original}
                onChange={handleNombreCampo}
              />
            </th>
          ))}
        </tr>
      </thead>
    </>
  );
};

export default TableHeader;

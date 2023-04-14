import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const Table = ({ items, handleNombreCampo, nombresDeCampos }) => {
  const headers = nombresDeCampos;

  const generarKey = (data) => {
    const keys = Object.keys(data);
    // Extrae las keys del objeto usando el método Object.keys() y las almacena en  el array "keys"
    const keyString = keys.map((key) => data[key]).join("-");
    // Después las une con el separador "-" usando el método join()
    return keyString;
    // Finalmente se retorna el string resultante de la concatenación de los valores de cada key del objeto, separados por "-".
  };
  return (
    <>
      <table className="table-container">
        <TableHeader
          nombresDeCampos={nombresDeCampos}
          handleNombreCampo={handleNombreCampo}
          generarKey={generarKey}
        />
        <TableBody
          items={items}
          nombresDeCampos={nombresDeCampos}
          generarKey={generarKey}
        />
      </table>
    </>
  );
};

export default Table;

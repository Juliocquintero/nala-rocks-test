import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const Table = ({ empleados, nombres_campos, filtroMes, meses_filtrados, generarKey }) => {


  return (
    <>
      <table className="table-container auto">
        <TableHeader nombres_campos={nombres_campos} />
        <TableBody
          empleados={empleados}
          filtroMes={filtroMes}
          meses_filtrados={meses_filtrados}
          generarKey={generarKey}
        />
      </table>
    </>
  );
};

export default Table;

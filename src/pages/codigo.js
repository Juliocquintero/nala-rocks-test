import React, { useState } from "react";
import TableFilter from "../components/dashboard/TableFilter";
import TableHeader from "../components/dashboard/TableHeader";
import TableBody from "../components/dashboard/TableBody";

const TablaEmpleados = ({ empleados, meses_filtrados, nombres_campos }) => {
  const [filtroMes, setFiltroMes] = useState("");
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
      <TableFilter
        filtroMes={filtroMes}
        setFiltroMes={setFiltroMes}
        meses_filtrados={meses_filtrados}
        generarKey={generarKey}
      />
      <br />

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

export default TablaEmpleados;

import React, { useState } from "react";
import TableFilter from "./TableFilter";
import Table from "./Table";

const ListaEmpleados = ({
  empleados,
  meses_filtrados,
  nombres_campos,
  idioma,
}) => {
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
        idioma={idioma}
      />
      <br />
      <Table
        empleados={empleados}
        nombres_campos={nombres_campos}
        filtroMes={filtroMes}
        meses_filtrados={meses_filtrados}
        generarKey={generarKey}
      />
    </>
  );
};

export default ListaEmpleados;

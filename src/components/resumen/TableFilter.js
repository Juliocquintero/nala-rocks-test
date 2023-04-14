import React from "react";
import { traducciones } from "../../traducciones";

const TableFilter = ({
  filtroMes,
  setFiltroMes,
  meses_filtrados,
  generarKey,
  idioma,
}) => {
  return (
    <div className="table-filter-container">
      <label htmlFor="mes">{traducciones[idioma].resumen.filtro_mes}</label>
      <select
        id="mes"
        onChange={(e) => setFiltroMes(e.target.value)}
        value={filtroMes}
      >
        <option value="">{traducciones[idioma].resumen.option_default}</option>
        {meses_filtrados?.map((mes) => (
          <option
            key={generarKey(mes)}
            value={mes.Mes}
            className="table-filter-option"
          >
            {mes.nombre_mes}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TableFilter;

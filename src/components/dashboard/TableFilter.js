import React from "react";

const TableFilter = ({ filtroMes, setFiltroMes, meses_filtrados, generarKey }) => {

  return (
    <div className="table-filter-container">
      <label htmlFor="mes">Filtrar por mes:</label>
      <select
        id="mes"
        onChange={(e) => setFiltroMes(e.target.value)}
        value={filtroMes}
      >
        <option value="">--Seleccione un mes--</option>
        {meses_filtrados?.map((mes) => (
          <option key={generarKey(mes)} value={mes.Mes} className="table-filter-option">
            {mes.nombre_mes}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TableFilter;

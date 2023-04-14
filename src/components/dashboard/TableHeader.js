import React from "react";

const TableHeader = ({ nombres_campos }) => {
  const headerNombre = nombres_campos.find(
    (campo) => campo.original === "Nombre"
  );
  const headerArea = nombres_campos.find((campo) => campo.original === "Area");
  const headerSubarea = nombres_campos.find(
    (campo) => campo.original === "Subarea"
  );
  const headerNivelJerarquico = nombres_campos.find(
    (campo) => campo.original === "Nivel_Jerárquico"
  );

  const headerFecha_de_ingreso = nombres_campos.find(
    (campo) => campo.original === "Fecha_de_ingreso"
  );

  const headerSueldo_bruto = nombres_campos.find(
    (campo) => campo.original === "Sueldo_bruto"
  );

  return (
    <>
      <thead>
        <tr>
          <th>{headerNombre.modificado || headerNombre.original}</th>
          <th>{headerArea.modificado || headerArea.original}</th>
          <th>{headerSubarea.modificado || headerSubarea.original}</th>
          <th>
            {headerNivelJerarquico.modificado || headerNivelJerarquico.original}
          </th>
          <th>
            {headerFecha_de_ingreso.modificado ||
              headerFecha_de_ingreso.original}
          </th>
          <th>
            {headerSueldo_bruto.modificado || headerSueldo_bruto.original}
          </th>
        </tr>
      </thead>
    </>
  );
};

export default TableHeader;

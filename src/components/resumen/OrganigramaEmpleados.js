import React from "react";
import { Link } from "react-router-dom";

const OrganigramaEmpleados = ({ empleados }) => {
  return (
    <>
      {empleados.map((empleado, index) => (
        <Link
          to={`/resumen/${empleado.ID}`}
          className="organigrama-empleado-container"
        >
          <span>{empleado.Nombre}</span>
          <span>{empleado.Nivel_Jerárquico}</span>
        </Link>
      ))}
    </>
  );
};

export default OrganigramaEmpleados;

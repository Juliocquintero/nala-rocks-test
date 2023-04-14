import React from "react";
import { TreeNode } from "react-organizational-chart";
import OrganigramaEmpleados from "./OrganigramaEmpleados";

const OrganigramaSubAreas = ({ subareas }) => {
  return (
    <>
      {subareas.map((subarea, index) => (
        <TreeNode
          label={<div className="organigrama-node area"> {subarea.nombre}</div>}
          key={`${subarea.nombre} ${index}`}
        >
          <OrganigramaEmpleados empleados={subarea.empleados} />
        </TreeNode>
      ))}
    </>
  );
};

export default OrganigramaSubAreas;

import React from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import OrganigramaAreas from "./OrganigramaAreas";

const Organigrama = ({ empleados_mes }) => {
  const organizarEmpleados = (empleados) => {
    const divisiones = {};
    // Creamos un objeto vacío para guardar las divisiones y áreas correspondientes de los empleados.
    empleados.forEach((empleado) => {
      // Iteramos sobre cada empleado de la lista.
      const { División, Area, Subarea } = empleado;
      // Desestructuración del objeto empleado
      if (!divisiones[División]) {
        // Si la división del empleado no existe en el objeto divisiones.
        divisiones[División] = { nombre: División, areas: {} };
        // Creamos la división como una propiedad del objeto divisiones, con su nombre y un objeto vacío para sus áreas.
      }
      if (!divisiones[División].areas[Area]) {
        // Si el área del empleado no existe en el objeto divisiones para su respectiva división.
        divisiones[División].areas[Area] = { nombre: Area, subareas: {} };
        // Creamos el área como una propiedad del objeto de áreas correspondiente a su división, con su nombre y un objeto vacío para sus subareas.
      }
      if (!divisiones[División].areas[Area].subareas[Subarea]) {
        // Si la subárea del empleado no existe en el objeto divisiones para su respectiva área y división.
        divisiones[División].areas[Area].subareas[Subarea] = {
          // Creamos la subárea como una propiedad del objeto de subáreas correspondiente a su área y división, con su nombre y una lista vacía para sus empleados
          nombre: Subarea,
          empleados: [],
        };
      }
      divisiones[División].areas[Area].subareas[Subarea].empleados.push(
        // Agregamos el empleado a la lista de empleados correspondiente a su subárea, área y división
        empleado
      );
    });

    const lista = Object.entries(divisiones).map(
      ([nombre, { nombre: nombreDivision, areas }]) => {
        // Creamos una lista final a partir del objeto divisiones, en la que mapeamos las divisiones, sus áreas y subáreas correspondientes, junto con la información de los empleados
        const listaAreas = Object.entries(areas).map(
          ([nombre, { nombre: nombreArea, subareas }]) => {
            const listaSubareas = Object.entries(subareas).map(
              ([nombre, { nombre: nombreSubarea, empleados }]) => {
                return { nombre: nombreSubarea, empleados };
              }
            );
            return { nombre: nombreArea, subareas: listaSubareas };
          }
        );
        return { nombre: nombreDivision, areas: listaAreas };
      }
    );
    return lista; // Retornamos la lista final
  };

  const lista = organizarEmpleados(empleados_mes);

  return (
    <div id="component-to-download">
      <Tree
        lineWidth={"2px"}
        lineColor={"black"}
        lineBorderRadius={"5px"}
        label={
          <div className="organigrama-node">
            Organigrama de la Empresa en el mes
          </div>
        }
      >
        {lista.map((Division, index) => (
          <TreeNode
            label={
              <div className="organigrama-node area">{Division.nombre}</div>
            }
            key={`${Division.nombre} ${index}`}
          >
            <OrganigramaAreas areas={Division.areas} />
          </TreeNode>
        ))}
      </Tree>
    </div>
  );
};

export default Organigrama;

import React from "react";
import { traducciones } from "../../traducciones";
import { useSelector } from "react-redux";

const TableRoadData = ({ empleado, empleadoPromovidoOContratado }) => {
  const status = empleadoPromovidoOContratado(empleado);
  // Se obtienen los valores del status del empleado.

  // Parseamos la key "Sueldo_bruto" del objeto "empleado" a un número
  const sueldoNumber = parseFloat(empleado["Sueldo_bruto"]);
  // Formateamos el número de "sueldoNumber" a una cadena con formato de moneda local
  const sueldo = sueldoNumber.toLocaleString();
  // La variable "sueldo" ahora contiene la cadena formateada con el sueldo en formato de moneda local.

  return (
    <tr>
      <td className="table-data-field">{empleado.Nombre}</td>
      <td className="table-data-field">{empleado.Area}</td>
      <td className="table-data-field">{empleado.Subarea}</td>
      <td className="table-data-field">{empleado["Nivel_Jerárquico"]}</td>
      <td
        className="table-data-field center"
        data-contratado={status.contratado}
        //Si el valor de data-contratado es true, se muestra un color distinto para resaltar.
      >
        {empleado["Fecha_de_ingreso"]}
      </td>
      <td
        className="table-data-field monto"
        data-promovido={status.promovido}
        //Si el valor de data-promovido es true, se muestra un color distinto para resaltar.
      >
        {sueldo}
      </td>
    </tr>
  );
};

const TableBody = ({ filtroMes, meses_filtrados, generarKey }) => {
  const { empleados, idioma } = useSelector((state) => state.data);

  // Función para calcular el total de la nómina del mes actual
  const calcularTotalNomina = () => {
    let totalNomina = 0;

    // Filtrar los empleados por el mes actual
    const empleadosFiltrados = empleados.filter(
      (empleado) => empleado.Mes === filtroMes
    );

    // Sumar el sueldo bruto de cada empleado
    empleadosFiltrados.forEach((empleado) => {
      // Parseamos la key "Sueldo_bruto" del objeto "empleado" a un número
      totalNomina += parseFloat(empleado["Sueldo_bruto"]);
    });
    // Formateamos el número de "totalNomina" a una cadena con formato de moneda local
    const monto = totalNomina.toLocaleString();

    return monto;
  };

  // Esta función recibe un objeto empleado y determina si este fue contratado o promovido en el mes actual.
  const empleadoPromovidoOContratado = (empleado) => {
    // Busca el índice del mes en que nos encontramos.
    const meses = meses_filtrados.map((mes) => mes.Mes);
    // Busca el índice del mes anterior
    const indexMesAnterior = meses.indexOf(filtroMes) - 1;
    // Busca el  mes anterior
    const mesAnterior = meses_filtrados[indexMesAnterior];

    let statusEmpleado = {
      contratado: false,
      promovido: false,
    };

    const fecha = empleado.Fecha_de_ingreso;
    const fechaArray = fecha.split("/"); // separar la fecha en día, mes y año
    const mes = fechaArray[1];
    const anio = fechaArray[2];
    const mesContratado = `${parseInt(mes)}-${anio}`;
    // Se obtienen el mes y el año en formato "mm/yy"
    const contratadoEsteMes = mesContratado === filtroMes;
    //Se compara si el mes actual es igual al mes de ingreso del empleado, en caso de ser iguales, quiere decir que el empleado fue contratado en el mes actual.

    const empleadosMesAnterior = empleados?.filter((empleado) =>
      mesAnterior ? empleado.Mes === mesAnterior.Mes : null
    );
    //Se obtiene la lista de empleados del mes anterior

    const empleadoEnMesAnterior = empleadosMesAnterior.find(
      (empleadoMesAnterior) => empleadoMesAnterior.ID === empleado.ID
    );
    //Se obtiene la información del empleado en el més anterior a través del ID del empleado.

    const sueldoEmpleadoMesAnterior = empleadoEnMesAnterior?.Sueldo_bruto;
    //Se obtiene el sueldo anterior basado en el objeto empleadoEnMesAnterior
    const sueldoActual = empleado.Sueldo_bruto;

    const promovido = sueldoActual > sueldoEmpleadoMesAnterior;
    // Si el sueldo actual del empleado en es mayor al sueldo del empleado en el mes anterior, quiere decir que fue promovido.

    if (contratadoEsteMes) {
      statusEmpleado.contratado = true;
    } else if (!contratadoEsteMes && promovido) {
      statusEmpleado.promovido = true;
    }
    return statusEmpleado;
  };

  return (
    <>
      <tbody>
        {empleados
          ?.filter((empleado) => !filtroMes || empleado.Mes === filtroMes)
          ?.map((empleado) => (
            <TableRoadData
              empleado={empleado}
              empleadoPromovidoOContratado={empleadoPromovidoOContratado}
              key={generarKey(empleado)}
            />
          ))}
        {filtroMes && (
          <>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <th className="table-data-field center">Total nómina</th>
              <td className="table-data-field monto">
                {calcularTotalNomina()}
              </td>
            </tr>

            <tr className="leyenda">
              <td>
                <div className="contratado">
                  <div className="box"></div>
                  <span>{traducciones[idioma].resumen.leyenda.contratado}</span>
                </div>
              </td>

              <td>
                <div className="promovido">
                  <div className="box"></div>
                  <span>{traducciones[idioma].resumen.leyenda.promovido}</span>
                </div>
              </td>
            </tr>
          </>
        )}
      </tbody>
    </>
  );
};

export default TableBody;

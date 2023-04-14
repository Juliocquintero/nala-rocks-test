import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ListaEmpleados from "./codigo";

const Dashboard = () => {
  const { empleados, nombres_campos } = useSelector((state) => state.data);

  const filtrarPorMes = (elementos) => {
    const meses = new Set(); // Conjunto para almacenar los meses únicos
    const listaFiltrada = [];

    // Recorre cada elemento de la lista
    elementos?.forEach((elemento) => {
      const mes = elemento.Mes;

      const agregarNombreMesYTimeStamp = (objeto) => {
        const [mesOriginal, anio] = objeto.Mes.split("-");
        const fecha = new Date(anio, mesOriginal - 1, 1); // Restamos 1 al mes porque el constructor de Date usa los meses del 0 al 11
        const meses = [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
        ];

        //**
        const posicionMes = fecha.getMonth();
        const mes = meses[posicionMes];
        const timeStamp = fecha.getTime();

        return {
          ...objeto,
          nombre_mes: mes,
          anio: anio,
          timeStamp,
        };
      };

      if (!meses.has(mes)) {
        // Si el mes no ha sido agregado aún
        meses.add(mes); // Agrega el mes al conjunto
        listaFiltrada.push(agregarNombreMesYTimeStamp({ Mes: mes })); // Agrega un objeto solo con la key Mes y su valor a la lista filtrada
      }
    });
    const listaOrdenada = listaFiltrada.sort(
      (a, b) => a.timeStamp - b.timeStamp
    );
    return listaOrdenada;

    // Retorna la lista filtrada
  };

  const meses_filtrados = filtrarPorMes(empleados);


  useEffect(() => {
    if (!empleados) {
    }
    return () => {};
  }, [empleados]);

  return (
    <>
      <div className="container">
        <h2>Dashboard</h2>
        {empleados?.length && (
          <ListaEmpleados
            empleados={empleados}
            meses_filtrados={meses_filtrados}
            nombres_campos={nombres_campos}
          />
        )}
      </div>
    </>
  );
};

export default Dashboard;

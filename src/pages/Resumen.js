import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ListaEmpleados from "../components/resumen/ListaEmpleados";
import { traducciones } from "../traducciones";
import { Navigate } from "react-router-dom";

const Resumen = () => {
  const { empleados, nombres_campos, idioma } = useSelector(
    (state) => state.data
  );

  const [meses_filtrados, setMeses_filtrados] = useState([]);
  const filtrarPorMes = (elementos, idioma) => {
    const meses = new Set(); // Conjunto para almacenar los meses únicos
    const listaFiltrada = [];

    // Recorre cada elemento de la lista
    elementos?.forEach((elemento) => {
      const mes = elemento.Mes;

      const agregarNombreMesYTimeStamp = (objeto) => {
        const [mesOriginal, anio] = objeto.Mes.split("-");
        const fecha = new Date(anio, mesOriginal - 1, 1); // Restamos 1 al mes porque el constructor de Date usa los meses del 0 al 11
        const meses = traducciones[idioma].resumen.meses;
        // Traducciones de acuerdo al idioma que desee el usuario
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

  useEffect(() => {
    setMeses_filtrados(filtrarPorMes(empleados, idioma));
    return () => {};
  }, [idioma, empleados]);

  return (
    <>
      <div className="container">
        <h1 className="page-title">{traducciones[idioma].resumen.title}</h1>
        {empleados?.length ? (
          <>
            <ListaEmpleados
              empleados={empleados}
              meses_filtrados={meses_filtrados}
              nombres_campos={nombres_campos}
              idioma={idioma}
            />
          </>
        ) : (
          <>
            <Navigate to="/" />
          </>
        )}
      </div>
    </>
  );
};

export default Resumen;

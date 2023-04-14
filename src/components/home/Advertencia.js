import React from "react";
import CeldasValidas from "./CeldasValidas";

import { traducciones } from "../../traducciones";
import { useSelector } from "react-redux";

const Advertencia = ({ children }) => {
  const { idioma } = useSelector((state) => state.data);

  return (
    <>
      <p>{traducciones[idioma].home.advertencia.primera_linea}</p>

      <CeldasValidas />
      {children}
      <p className="advertence-text">
        {traducciones[idioma].home.advertencia.segunda_linea}
      </p>
    </>
  );
};

export default Advertencia;

import React from "react";
import html2canvas from "html2canvas";
import Organigrama from "./Organigrama";

const downloadComponentAsImage = (component) => {
  html2canvas(component).then((canvas) => {
    const link = document.createElement("a");
    link.download = "component.png";
    link.href = canvas.toDataURL();
    link.click();
  });
};

const OrganigramaCaptura = ({ empleados, filtroMes }) => {
  const handleDownloadButtonClick = () => {
    downloadComponentAsImage(document.getElementById("component-to-download"));
  };
  const empleados_mes = empleados.filter(
    (empleado) => empleado.Mes === filtroMes
  );

  return (
    <>
      {empleados_mes.length ? (
        <>
          <Organigrama
            empleados={empleados}
            filtroMes={filtroMes}
            handleDownloadButtonClick={handleDownloadButtonClick}
            empleados_mes={empleados_mes}
          />
          <button class="button" onClick={handleDownloadButtonClick}>
            Descargar organigrama
          </button>
        </>
      ) : null}
    </>
  );
};

export default OrganigramaCaptura;

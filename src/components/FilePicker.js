import React from "react";
import { read, utils } from "xlsx";

const FilePicker = ({ handleItems }) => {
  const renombrarKeys = (array) => {
    const nuevoArray = []; // Array vacío para almacenar los nuevos objetos con las keys renombradas

    array.forEach((objeto) => {
      const nuevoObjeto = {}; // Objeto vacío para almacenar las nuevas keys y valores

      // Recorremos las keys del objeto actual
      Object.keys(objeto).forEach((key) => {
        // Eliminamos los espacios en blanco al inicio y al final de la key
        const nuevaKey = key.trim();

        // Cambiamos los espacios en blanco por guiones bajos (_)
        const nuevaKeyModificada = nuevaKey.replace(/\s+/g, "_");

        // Asignamos la nueva key y su valor al nuevo objeto
        nuevoObjeto[nuevaKeyModificada] = objeto[key];
      });

      // Añadimos el nuevo objeto al nuevo array
      nuevoArray.push(nuevoObjeto);
    });

    return nuevoArray; // Retornamos el nuevo array con las keys renombradas
  };
  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = read(bufferArray);

        const wsname = wb.SheetNames[0]; // Se obtiene el nombre de la primera hoja
        const ws = wb.Sheets[wsname]; // Se obtiene la primera hoja

        const data = utils.sheet_to_json(ws, { raw: false }); // Se generan los objetos (Por defecto, raw es true, lo que hace que parsee los datos y algunos como las fechas se transforman en otro formato)
        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((data) => {
      handleItems(renombrarKeys(data));
    });
  };

  return (
    <>
      <input
        type="file"
        accept=".csv, .xlsx"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />
    </>
  );
};

export default FilePicker;

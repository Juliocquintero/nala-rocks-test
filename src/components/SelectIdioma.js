import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cambiarIdioma } from "../reducers/dataReducer";

const SelectIdioma = () => {
  const { idioma } = useSelector((state) => state.data);

  const dispatch = useDispatch();

  const handleLanguageChange = (e) => {
    dispatch(cambiarIdioma(e.target.value));

    // Cambiar el estado de la variable de idioma según la selección del usuario
  };
  return (
    <div className="selector-idioma-container">
      <select value={idioma} onChange={handleLanguageChange}>
        <option value="es">Español</option>
        <option value="en">English</option>
      </select>
    </div>
  );
};

export default SelectIdioma;

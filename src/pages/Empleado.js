import React, { useState } from "react";
import logo from "../logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { cambiarImg } from "../reducers/dataReducer";

const Empleado = () => {
  const { empleados } = useSelector((state) => state.data);
  const { id } = useParams();
  const empleado = empleados.find((empleado) => empleado.ID === id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const guardarImagen = () => {
    let confirm = window.confirm("¿Está seguro de cambiar la imagen?");
    if (confirm) {
      dispatch(cambiarImg({ img: image, id }));
      goBack();
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const [image, setImage] = useState(null);
  const [showButton, setShowButton] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      {empleados?.length ? (
        <>
          <div className="empleado-container">
            <img
              src={image || empleado.img || logo}
              alt="Imagen del empleado"
              className="empleado-img"
            />
            <span>{empleado.Nombre}</span>
            <span>{empleado.División}</span>
            <span>{empleado.Area}</span>
            <span>{empleado.Subarea}</span>

            {showButton ? (
              <>
                {!image ? (
                  <input
                    type="file"
                    onChange={handleImageChange}
                    title="Cambiar imagen"
                  />
                ) : (
                  <>
                    <button className="button" onClick={guardarImagen}>
                      Guardar imagen
                    </button>
                    <button className="button" onClick={goBack}>
                      Cancelar
                    </button>
                  </>
                )}
              </>
            ) : (
              <>
                <button
                  className="button"
                  onClick={() => {
                    setShowButton(!showButton);
                  }}
                >
                  Cambiar imagen
                </button>
                <button className="button" onClick={goBack}>
                  Volver
                </button>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <Navigate to="/" />
        </>
      )}
    </>
  );
};

export default Empleado;

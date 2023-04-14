import React, { useState } from "react";
import FilePicker from "../components/FilePicker";
import Table from "../components/home/Table";
import { useDispatch, useSelector } from "react-redux";
import { insertFileData } from "../reducers/dataReducer";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Advertencia from "../components/home/Advertencia";
import { traducciones } from "../traducciones";

const Home = () => {
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { idioma } = useSelector((state) => state.data);

  const [nombresDeCampos, setNombresDeCampos] = useState([]);
  const [edicion, setEdicion] = useState(false);

  const handleItems = (data) => {
    setItems(data);
    setNombresDeCampos(
      Object.keys(data[0]).map((el) => {
        let nombreCampo = {};
        nombreCampo.original = el;
        // Se reemplaza el caracter "" por un espacio vacío en la cadena "el" utilizando una expresión regular. Así obtenemos un nombre con espacios en blanco para mostrar y cuidamos el nombre del campo.
        nombreCampo.modificado = el.replace(/_/g, " ");
        return nombreCampo;
      })
    );
  };

  const handleNombreCampo = (e) => {
    const nombre_campo = e.target.name;
    const nuevo_valor = e.target.value;
    setNombresDeCampos(
      nombresDeCampos.map((el) => {
        if (el.original === nombre_campo || el.modificado === nombre_campo) {
          return { ...el, modificado: nuevo_valor };
          //Modificamos el nombre anterior del campo en su key modificado
        } else {
          return el;
        }
      })
    );
    setEdicion(true);
  };

  const guardarNombreCampos = () => {
    setEdicion(false);
  };

  const handleConfirm = () => {
    let confirm = window.confirm("¿Estás seguro de agregar datos?");
    if (confirm) {
      dispatch(
        insertFileData({
          empleados: items,
          nombres_campos: nombresDeCampos,
        })
      );
      navigate("/resumen", {
        state: {
          empleados: items,
          nombres_campos: nombresDeCampos,
        },
      });
    }
  };

  return (
    <>
      <h1 className="page-title">{traducciones[idioma].home.title}</h1>
      <div className="container center">
        <div className="table-data-container">
          {items.length ? (
            <>
              <p className="table-data-title">
              {traducciones[idioma].home.instructions}
              </p>
              <Table
                items={items}
                nombresDeCampos={nombresDeCampos}
                handleNombreCampo={handleNombreCampo}
              />
              <Button
                onClick={handleConfirm}
                title="Aceptar"
                disabled={edicion}
              />
              {edicion && (
                <Button onClick={guardarNombreCampos} title="Guardar nombres" />
              )}
            </>
          ) : (
            <>
              <Advertencia>
                <FilePicker handleItems={handleItems} />
              </Advertencia>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;

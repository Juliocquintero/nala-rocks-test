import React, { useState } from "react";
import FilePicker from "../components/FilePicker";
import Table from "../components/get file data/table/Table";
import { useDispatch } from "react-redux";
import { insertFileData } from "../reducers/dataReducer";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [nombresDeCampos, setNombresDeCampos] = useState([]);
  const [edicion, setEdicion] = useState(false);

  const handleItems = (data) => {
    setItems(data);
    setNombresDeCampos(
      Object.keys(data[0]).map((el) => {
        let nombreCampo = {};
        nombreCampo.original = el;
        nombreCampo.modificado = "";
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
      navigate("/dashboard", {
        state: {
          empleados: items,
          nombres_campos: nombresDeCampos,
        },
      });
    }
  };
  return (
    <div className="container center">
      <div className="table-data-container">
        {items.length ? (
          <>
            <p className="table-data-title">
              Revisa y personaliza tus datos con facilidad gracias a nuestra
              interfaz intuitiva.
              <br/> Modifica los campos a tu gusto para una
              experiencia totalmente personalizada.
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
            <p>Ingresa el documento .xlsx</p>
            <FilePicker handleItems={handleItems} />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;

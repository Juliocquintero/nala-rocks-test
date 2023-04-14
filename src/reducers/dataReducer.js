import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
  name: "fileData",
  initialState: {
    empleados: null,
    nombres_campos: [],
    idioma: "es",
  },
  reducers: {
    insertFileData: (state, action) => {
      state.empleados = action.payload.empleados;
      state.nombres_campos = action.payload.nombres_campos;
    },
    cambiarImg: (state, action) => {
      const { id, img } = action.payload;
      // Creamos una nueva lista con los elementos de la lista original
      const nuevaListaDeEmpleados = state.empleados.map((elem) => {
        // Si el id del elemento es igual al id que recibimos por parámetro
        if (elem.ID === id) {
          // Creamos un nuevo objeto con la misma información del elemento original, pero con la nueva imagen
          return {
            ...elem,
            img: img,
          };
        } else {
          // Si el id no coincide, simplemente devolvemos el elemento original sin cambios
          return elem;
        }
      });
      // Devolvemos la nueva lista con los cambios aplicados
      state.empleados = nuevaListaDeEmpleados;
    },
    cambiarIdioma: (state, action) => {
      state.idioma = action.payload || "es";
    },
  },
});

// Action creators are generated for each case reducer function
export const { insertFileData, cambiarIdioma, cambiarImg } = dataSlice.actions;

export default dataSlice.reducer;

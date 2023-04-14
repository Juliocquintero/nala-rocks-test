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
    cambiarIdioma: (state, action) => {
      state.idioma = action.payload || "es";
    },
  },
});

// Action creators are generated for each case reducer function
export const { insertFileData, cambiarIdioma } = dataSlice.actions;

export default dataSlice.reducer;

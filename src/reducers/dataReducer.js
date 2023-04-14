import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
  name: "fileData",
  initialState: {
    empleados: null,
    nombres_campos: [],
  },
  reducers: {
    insertFileData: (state, action) => {
      state.empleados = action.payload.empleados;
      state.nombres_campos = action.payload.nombres_campos;
    },
  },
});

// Action creators are generated for each case reducer function
export const { insertFileData } = dataSlice.actions;

export default dataSlice.reducer;

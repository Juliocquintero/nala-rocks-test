import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./reducers/dataReducer";

export default configureStore({
  reducer: {
    data: dataReducer
  },
});

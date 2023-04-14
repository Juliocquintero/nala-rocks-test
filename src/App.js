import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import SelectIdioma from "./components/SelectIdioma";
import Resumen from "./pages/Resumen";
import Empleado from "./pages/Empleado";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/resumen",
      element: <Resumen />,
    },
    {
      path: "/resumen/:id",
      element: <Empleado />,
    },
  ]);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <SelectIdioma />
      </header>
      <main>
        <RouterProvider router={router} />
      </main>
    </div>
  );
}

export default App;

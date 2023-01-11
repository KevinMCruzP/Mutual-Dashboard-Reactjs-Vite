import { Route, Routes } from "react-router-dom";
import Dashboard from "./dashboard";
import Login from "./login";
import Mutual from "./mutual";

function App() {
  const rutaServidor = ""; //prueba
  // const rutaServidor = '/route' //servidor

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/mutual" element={<Mutual />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;

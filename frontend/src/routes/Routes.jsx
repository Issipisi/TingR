import { BrowserRouter, Route, Routes as R } from "react-router-dom";

export default function Routes({ children }) {
  return (
    <BrowserRouter>
      <R>
        <Route path="/" element={<Inicio />} />
        {/* <Route path="/inicio" element={<Inicio />} />
        <Route path="/GestionarProfesores" element={<GestionarProfesores />} />
        <Route path="/CrearProfesor" element={<CrearProfesor />} />
        <Route path="/TablaProyectores" element={<TablaProyectores />} />
        <Route path="/OpcionesPrestamo" element={<OpcionesPrestamo />} />
        <Route path="/Solicitud" element={<Solicitud />} />
        <Route path="/Devolucion" element={<Devolucion />} /> */}
      </R>
      {children}
    </BrowserRouter>
  );
}

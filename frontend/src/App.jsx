import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import Layout from "./layout/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InicioPage from "./pages/InicioPage";
import ProfesoresPage from "./pages/ProfesoresPage";
import ProyectoresPage from "./pages/ProyectoresPage";
import PrestamosPage from "./pages/PrestamosPage";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

export default function App() {
  return (
    <MantineProvider
      theme={{
        primaryColor: "blue",
      }}
    >
      <Notifications />
      <ModalsProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<InicioPage />} />
              <Route path="/profesores" element={<ProfesoresPage />} />
              <Route path="/proyectores" element={<ProyectoresPage />} />
              <Route path="/prestamos" element={<PrestamosPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ModalsProvider>
    </MantineProvider>
  );
}

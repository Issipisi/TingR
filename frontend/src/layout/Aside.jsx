import { AppShell } from "@mantine/core";
import { Link } from "react-router-dom";

export default function Aside() {
  return (
    <AppShell.Navbar p="md" className="flex flex-col gap-1">
      <Link to={"/"}>
        <div className="cursor-pointer hover:bg-blue-100 py-1.5 px-2 rounded text-lg">Inicio</div>
      </Link>
      <Link to={"/profesores"}>
        <div className="cursor-pointer hover:bg-blue-100 py-1.5 px-2 rounded text-lg">Profesores</div>
      </Link>
      <Link to={"/proyectores"}>
        <div className="cursor-pointer hover:bg-blue-100 py-1.5 px-2 rounded text-lg">Proyectores</div>
      </Link>
      <Link to={"/prestamos"}>
        <div className="cursor-pointer hover:bg-blue-100 py-1.5 px-2 rounded text-lg">Préstamos</div>
      </Link>
    </AppShell.Navbar>
  );
}

import { Badge, Loader, Table } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { getProyectores } from "../services/proyectoresService";

export default function ProyectoresPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [proyectoresData, setProyectoresData] = useState([]);
  const isFirstVisualization = useRef(true);


  const fetchProyectores = () => {
    setIsLoading(true);
    getProyectores()
      .then((data) => {
        setProyectoresData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (isFirstVisualization.current) {
      fetchProyectores();
      isFirstVisualization.current = false;
    }
  }, []);

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2>Todos los proyectores</h2>
      </div>
      {isLoading ? (
        <Loader size={"xs"} />
      ) : (
        <Table withRowBorders withColumnBorders withTableBorder className="mt-4" verticalSpacing={"sm"}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>Marca</Table.Th>
              <Table.Th>Estado</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {proyectoresData.map((proyector) => (
              <Table.Tr key={proyector.id}>
                <Table.Td>{proyector.id}</Table.Td>
                <Table.Td>{proyector.marca}</Table.Td>
                <Table.Td>
                  <Badge size="sm" color={proyector.estado == 0 ? "green" : "red"}>
                    {proyector.estado == 0 ? "Disponible" : "Ocupado"}
                  </Badge>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}
    </section>
  );
}

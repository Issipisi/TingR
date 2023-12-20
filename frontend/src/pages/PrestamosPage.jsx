import { useEffect, useRef, useState } from "react";
import { getProyectores } from "../services/proyectoresService";
import { getPrestamos, storeDevolucion, storeSolicitud } from "../services/prestamosService";
import {
  Badge,
  Button,
  Loader,
  Modal,
  NumberInput,
  Select,
  Table,
  TextInput,
  Textarea,
} from "@mantine/core";
import { getProfesores } from "../services/profesoresService";
import { IconArrowNarrowRight, IconEye } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import moment from "moment";

export default function PrestamosPage() {
  const [openedHistorial, { open: openHistorial, close: closeHistorial }] = useDisclosure(false);
  const [openedSolicitud, { open: openSolicitud, close: closeSolicitud }] = useDisclosure(false);
  const [openedDevolucion, { open: openDevolucion, close: closeDevolucion }] = useDisclosure(false);

  const [isLoading, setIsLoading] = useState(true);
  const [proyectoresData, setProyectoresData] = useState([]);
  const [proyectorSeleccionado, setProyectorSeleccionado] = useState(null);
  const [prestamoSeleccionado, setPrestamoSeleccionado] = useState(null);
  const [profesoresData, setProfesoresData] = useState([]);
  const [prestamosData, setPrestamosData] = useState([]);
  const isFirstVisualization = useRef(true);

  const form = useForm({
    initialValues: {
      profesor: "",
      uso: "",
      proyector: "",
      fechaPrestamo: new Date(),
    },
    validate: {
      profesor: (value) => (value.trim().length > 0 ? null : "Campo requerido"),
      uso: (value) => (value.trim().length > 0 ? null : "Campo requerido"),
      proyector: (value) => (value.trim().length > 0 ? null : "Campo requerido"),
      fechaPrestamo: (value) => (value ? null : "Campo requerido"),
    },
  });

  const formDevolucion = useForm({
    initialValues: {
      horasTotales: undefined,
      estado: "",
      fechaDevolucion: new Date(),
    },
    validate: {
      horasTotales: (value) => (!isNaN(value) ? null : "Campo requerido"),
      estado: (value) => (value.trim().length > 0 ? null : "Campo requerido"),
      fechaDevolucion: (value) => (value ? null : "Campo requerido"),
    },
  });

  const fetchData = async () => {
    setIsLoading(true);

    await getProyectores()
      .then((data) => {
        setProyectoresData(data);
      })
      .catch((error) => {
        console.log(error);
      });

    await getPrestamos()
      .then((data) => {
        setPrestamosData(data);
      })
      .catch((error) => {
        console.log(error);
      });

    await getProfesores()
      .then((data) => {
        setProfesoresData(data);
      })
      .catch((error) => {
        console.log(error);
      });

    setIsLoading(false);
  };

  const handleStoreSolicitud = (solicitud) => {
    form.reset();
    close();
    notifications.clean();
    notifications.show({
      id: "store",
      title: "Guardando información",
      message: "Estamos guardando la información",
      loading: true,
      withCloseButton: false,
      autoClose: false,
    });

    storeSolicitud(solicitud)
      .then((data) => {
        notifications.update({
          id: "store",
          title: "Información guardada",
          message: "La información ha sido guardada exitosamente",
          loading: false,
          color: "green",
          autoClose: 5000,
        });

        setProyectoresData((prev) =>
          prev.map((proyector) =>
            proyector.id === parseInt(data.proyectorId) ? { ...proyector, estado: 1 } : proyector
          )
        );
        setPrestamosData([...prestamosData, data]);
      })
      .catch((error) => {
        console.log("error", error);
        notifications.update({
          id: "store",
          title: "Error al guardar",
          message: "Ha ocurrido un error al guardar la información",
          loading: false,
          color: "red",
          autoClose: 5000,
        });
      });
  };

  const handleStoreDevolucion = (devolucion) => {
    formDevolucion.reset();
    closeDevolucion();
    notifications.clean();
    notifications.show({
      id: "store",
      title: "Guardando información",
      message: "Estamos guardando la información",
      loading: true,
      withCloseButton: false,
      autoClose: false,
    });

    storeDevolucion(devolucion)
      .then((data) => {
        notifications.update({
          id: "store",
          title: "Información guardada",
          message: "La información ha sido guardada exitosamente",
          loading: false,
          color: "green",
          autoClose: 5000,
        });

        setProyectoresData((prev) =>
          prev.map((proyector) =>
            proyector.id === parseInt(data.proyectorId) ? { ...proyector, estado: 0 } : proyector
          )
        );

        setPrestamosData((prev) => prev.map((prestamo) => (prestamo.id === data.id ? data : prestamo)));
      })
      .catch((error) => {
        console.log("error", error);
        notifications.update({
          id: "store",
          title: "Error al guardar",
          message: "Ha ocurrido un error al guardar la información",
          loading: false,
          color: "red",
          autoClose: 5000,
        });
      });
  };

  useEffect(() => {
    if (isFirstVisualization.current) {
      fetchData();
      isFirstVisualization.current = false;
    }
  }, []);

  return (
    <>
      <Modal opened={openedHistorial} onClose={closeHistorial} title="Ver historial" size={"1400px"}>
        {proyectorSeleccionado && (
          <>
            <Badge size="sm" color={proyectorSeleccionado.estado == 0 ? "green" : "red"}>
              {proyectorSeleccionado.estado == 0 ? "Disponible" : "Ocupado"}
            </Badge>
            <p className="font-semibold text-xl mt-1">
              {proyectorSeleccionado.id} - {proyectorSeleccionado.marca}
            </p>
            <Table
              withRowBorders
              withColumnBorders
              withTableBorder
              className="mt-4 "
              verticalSpacing={"sm"}
            >
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>ID</Table.Th>
                  <Table.Th>Profesor</Table.Th>
                  <Table.Th>Fecha préstamo</Table.Th>
                  <Table.Th>Fecha devolución</Table.Th>
                  <Table.Th>Horas</Table.Th>
                  <Table.Th>Estado</Table.Th>
                  <Table.Th>Uso</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {prestamosData
                  .filter((p) => p.proyectorId == proyectorSeleccionado.id)
                  .map((prestamo) => (
                    <Table.Tr key={prestamo.id}>
                      <Table.Td>{prestamo.id}</Table.Td>
                      <Table.Td>
                        {profesoresData.find((profesor) => profesor.rut == prestamo.profesorRut).rut}{" "}
                        {" > "}
                        {
                          profesoresData.find((profesor) => profesor.rut == prestamo.profesorRut).nombre
                        }{" "}
                        {
                          profesoresData.find((profesor) => profesor.rut == prestamo.profesorRut)
                            .apellido
                        }
                      </Table.Td>
                      <Table.Td>
                        {prestamo.fechaPrestamo} {prestamo.horaPrestamo}
                      </Table.Td>
                      <Table.Td>
                        {prestamo.fechaDevolucion} {prestamo.horaDevolucion}
                      </Table.Td>
                      <Table.Td>{prestamo.horasTotales}</Table.Td>
                      <Table.Td>{prestamo.estado}</Table.Td>
                      <Table.Td>{prestamo.uso}</Table.Td>
                    </Table.Tr>
                  ))}
              </Table.Tbody>
            </Table>
          </>
        )}
      </Modal>

      <Modal opened={openedSolicitud} onClose={closeSolicitud} title="Nueva solicitud" size={"xl"}>
        <form
          action=""
          onSubmit={form.onSubmit((values) => {
            closeSolicitud();
            handleStoreSolicitud({
              id: prestamosData.length + 1,
              profesorRut: values.profesor,
              fechaPrestamo: moment(values.fechaPrestamo).format("DD/MM/YYYY"),
              horaPrestamo: moment(values.fechaPrestamo).format("HH:mm"),
              proyectorId: parseInt(values.proyector),
              estado: null,
              fechaDevolucion: null,
              horaDevolucion: null,
              horasTotales: null,
              uso:
                values.uso == 1
                  ? "Dictado de clases"
                  : values.uso == 2
                  ? "Exámenes de título"
                  : "Reuniones varias",
            });
          })}
        >
          <div className="mb-3">
            <Select
              label="Profesor"
              data={profesoresData.map((profesor) => ({
                value: profesor.rut,
                label: `${profesor.rut} - ${profesor.nombre} ${profesor.apellido}`,
              }))}
              {...form.getInputProps("profesor")}
            />
          </div>
          <div className="mb-3">
            <Select
              label="Uso"
              data={[
                {
                  value: "1",
                  label: "Dictado de clases",
                },
                {
                  value: "2",
                  label: "Exámenes de título",
                },
                {
                  value: "3",
                  label: "Reuniones varias",
                },
              ]}
              {...form.getInputProps("uso")}
            />
          </div>
          <div className="mb-3">
            <Select
              label="Proyector"
              searchable
              nothingFoundMessage="Sin proyectores disponibles"
              data={proyectoresData
                .filter((p) => p.estado == 0)
                .map((proyector) => ({
                  value: proyector.id.toString(),
                  label: `${proyector.id} - ${proyector.marca}`,
                }))
                .filter((p) => {
                  return (
                    (form.values.uso != 3 && p.label.includes("EPSON")) ||
                    (form.values.uso == 3 && p.label.includes("ViewSonic"))
                  );
                })}
              {...form.getInputProps("proyector")}
            />{" "}
          </div>
          <div className="mb-3">
            <DateTimePicker label="Fecha prestamo" {...form.getInputProps("fechaPrestamo")} />
          </div>

          <div className="flex items-center justify-end gap-4">
            <Button
              color="gray"
              variant="default"
              onClick={() => {
                closeSolicitud();
                form.reset();
              }}
            >
              Cancelar
            </Button>
            <Button type="submit">Guardar</Button>
          </div>
        </form>
      </Modal>

      <Modal opened={openedDevolucion} onClose={closeDevolucion} title="Nueva devolucion" size={"xl"}>
        {prestamoSeleccionado && (
          <>
            <div className="mb-3">
              <TextInput label="ID" disabled defaultValue={prestamoSeleccionado.id} />
            </div>
            <form
              action=""
              onSubmit={formDevolucion.onSubmit((values) => {
                handleStoreDevolucion({
                  ...prestamoSeleccionado,
                  fechaDevolucion: moment(values.fechaDevolucion).format("DD/MM/YYYY"),
                  horaDevolucion: moment(values.fechaDevolucion).format("HH:mm"),
                  horasTotales: values.horasTotales,
                  estado: values.estado,
                });
              })}
            >
              <div className="mb-3">
                <DateTimePicker label="Fecha devolución" {...form.getInputProps("fechaDevolucion")} />
              </div>
              <div className="mb-3">
                <NumberInput label="Horas totales" {...formDevolucion.getInputProps("horasTotales")} />
              </div>
              <div className="mb-3">
                <Textarea label="Estado" autosize {...formDevolucion.getInputProps("estado")} />
              </div>

              <div className="flex items-center justify-end gap-4">
                <Button
                  color="gray"
                  variant="default"
                  onClick={() => {
                    closeSolicitud();
                    form.reset();
                  }}
                >
                  Cancelar
                </Button>
                <Button type="submit">Guardar</Button>
              </div>
            </form>
          </>
        )}
      </Modal>
      <div className="flex items-center justify-between">
        <h2>Préstamos</h2>
        <Button
          onClick={() => {
            openSolicitud();
          }}
          disabled={isLoading}
        >
          Nueva solicitud
        </Button>
      </div>
      {isLoading ? (
        <Loader size={"xs"} />
      ) : (
        <>
          <h4 className="mt-4">Solicitudes en progreso</h4>
          <Table
            withRowBorders
            withColumnBorders
            withTableBorder
            className="mt-2"
            verticalSpacing={"sm"}
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ID</Table.Th>
                <Table.Th>Proyector</Table.Th>
                <Table.Th>Profesor</Table.Th>
                <Table.Th>Fecha</Table.Th>
                <Table.Th>Acciones</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {/* <pre>{JSON.stringify({ profesoresData, proyectoresData, prestamosData }, null, 2)}</pre> */}
              {prestamosData
                .filter((p) => !p.fechaDevolucion)
                .map((prestamo) => (
                  <Table.Tr key={prestamo.id}>
                    <Table.Td>{prestamo.id}</Table.Td>
                    <Table.Td>
                      {proyectoresData.find((proyector) => proyector.id == prestamo.proyectorId).id} -{" "}
                      {proyectoresData.find((proyector) => proyector.id == prestamo.proyectorId).marca}
                    </Table.Td>
                    <Table.Td>
                      {profesoresData.find((profesor) => profesor.rut == prestamo.profesorRut).rut}{" "}
                      {" > "}
                      {
                        profesoresData.find((profesor) => profesor.rut == prestamo.profesorRut).nombre
                      }{" "}
                      {profesoresData.find((profesor) => profesor.rut == prestamo.profesorRut).apellido}
                    </Table.Td>
                    <Table.Td>
                      {prestamo.fechaPrestamo} {prestamo.horaPrestamo}
                    </Table.Td>
                    <Table.Td>
                      <Button
                        size="xs"
                        variant="light"
                        color="blue"
                        rightSection={<IconArrowNarrowRight size={16} />}
                        onClick={() => {
                          setPrestamoSeleccionado(prestamo);
                          openDevolucion();
                        }}
                      >
                        Devolución
                      </Button>
                    </Table.Td>
                  </Table.Tr>
                ))}
            </Table.Tbody>
          </Table>

          <h4 className="mt-20">Proyectores</h4>
          <Table
            withRowBorders
            withColumnBorders
            withTableBorder
            className="mt-4"
            verticalSpacing={"sm"}
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ID</Table.Th>
                <Table.Th>Marca</Table.Th>
                <Table.Th>Estado</Table.Th>
                <Table.Th>Acciones</Table.Th>
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
                  <Table.Td>
                    <Button
                      size="xs"
                      variant="light"
                      leftSection={<IconEye size={16} />}
                      onClick={() => {
                        setProyectorSeleccionado(proyector);
                        openHistorial();
                      }}
                    >
                      Ver historial
                    </Button>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </>
      )}
    </>
  );
}

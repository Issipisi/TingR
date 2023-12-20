import { Button, Loader, Modal, Table, TextInput } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import {
  destroyProfesor,
  getProfesores,
  storeProfesor,
  updateProfesor,
} from "../services/profesoresService";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";

export default function ProfesoresPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profesoresData, setProfesoresData] = useState([]);
  const [profesorSeleccionado, setProfesorSeleccionado] = useState(null);
  const isFirstVisualization = useRef(true);

  const form = useForm({
    initialValues: {
      rut: "",
      nombre: "",
      apellido: "",
    },

    validate: {
      rut: (value) => (value.length ? null : "Rut es requerido"),
      nombre: (value) => (value.length ? null : "Nombre es requerido"),
      apellido: (value) => (value.length ? null : "Apellido es requerido"),
    },
  });

  const fetchUProfesores = () => {
    setIsLoading(true);
    getProfesores()
      .then((data) => {
        setProfesoresData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleStoreProfesor = (profesor) => {
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

    storeProfesor(profesor)
      .then((data) => {
        notifications.update({
          id: "store",
          title: "Información guardada",
          message: "La información ha sido guardada exitosamente",
          loading: false,
          color: "green",
          autoClose: 5000,
        });

        setProfesoresData([...profesoresData, data]);
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

  const handleUpdateProfesor = (profesor) => {
    form.reset();
    close();
    notifications.clean();
    notifications.show({
      id: "update",
      title: "Guardando información",
      message: "Estamos guardando la información",
      loading: true,
      withCloseButton: false,
      autoClose: false,
    });

    updateProfesor(profesor)
      .then((data) => {
        console.log({ data });
        notifications.update({
          id: "update",
          title: "Información guardada",
          message: "La información ha sido guardada exitosamente",
          loading: false,
          color: "green",
          autoClose: 5000,
        });

        setProfesoresData((prev) =>
          prev.map((profesor) => (profesor.rut === data.rut ? data : profesor))
        );
      })
      .catch((error) => {
        console.log("error", error);
        notifications.update({
          id: "update",
          title: "Error al guardar",
          message: "Ha ocurrido un error al guardar la información",
          loading: false,
          color: "red",
          autoClose: 5000,
        });
      });
  };

  const handleDestroyProfesor = (profesor) => {
    form.reset();
    close();
    notifications.clean();
    notifications.show({
      id: "destroy",
      title: "Eliminando información",
      message: "Estamos eliminando la información",
      loading: true,
      withCloseButton: false,
      autoClose: false,
    });

    destroyProfesor(profesor)
      .then((data) => {
        console.log({ data });
        notifications.update({
          id: "destroy",
          title: "Información eliminada",
          message: "La información ha sido eliminada exitosamente",
          loading: false,
          color: "green",
          autoClose: 5000,
        });

        setProfesoresData((prev) => prev.filter((profesor) => profesor.rut !== data.rut));
      })
      .catch((error) => {
        console.log("error", error);
        notifications.update({
          id: "destroy",
          title: "Error al eliminar",
          message: "Ha ocurrido un error al eliminar la información",
          loading: false,
          color: "red",
          autoClose: 5000,
        });
      });
  };

  useEffect(() => {
    if (isFirstVisualization.current) {
      fetchUProfesores();
      isFirstVisualization.current = false;
    }
  }, []);

  return (
    <section>
      <Modal
        opened={opened}
        onClose={close}
        size={"lg"}
        title={profesorSeleccionado ? "Actualizar profesor" : "Agregar profesor"}
      >
        <form
          action=""
          onSubmit={form.onSubmit((values) => {
            if (profesorSeleccionado) {
              handleUpdateProfesor(values);
            } else {
              handleStoreProfesor(values);
            }
          })}
        >
          <TextInput
            disabled={profesorSeleccionado}
            className="mb-3"
            label="Rut"
            withAsterisk
            {...form.getInputProps("rut")}
          />
          <TextInput className="mb-3" label="Nombre" withAsterisk {...form.getInputProps("nombre")} />
          <TextInput
            className="mb-3"
            label="Apellido"
            withAsterisk
            {...form.getInputProps("apellido")}
          />

          <div className="flex justify-end gap-3 mt-4">
            <Button
              type="button"
              variant="default"
              onClick={() => {
                close();
                form.reset();
                setProfesorSeleccionado(null);
              }}
            >
              Cancelar
            </Button>
            <Button type="submit">Agregar</Button>
          </div>
        </form>
      </Modal>
      <div className="flex items-center justify-between">
        <h2>Todos los profesores</h2>
        <Button onClick={() => open()}>Agregar profesor</Button>
      </div>
      {isLoading ? (
        <Loader size={"xs"} />
      ) : (
        <Table withRowBorders withColumnBorders withTableBorder className="mt-4" verticalSpacing={"sm"}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>RUT</Table.Th>
              <Table.Th>Nombre</Table.Th>
              <Table.Th>Apellido</Table.Th>
              <Table.Th>Acciones</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {profesoresData.map((profesor) => (
              <Table.Tr key={profesor.rut}>
                <Table.Td>{profesor.rut}</Table.Td>
                <Table.Td>{profesor.nombre}</Table.Td>
                <Table.Td>{profesor.apellido}</Table.Td>
                <Table.Td>
                  <div className="flex gap-1">
                    <Button
                      size="xs"
                      onClick={() => {
                        setProfesorSeleccionado(profesor);
                        form.setValues(profesor);
                        open();
                      }}
                    >
                      <IconPencil size={18} />
                    </Button>
                    <Button
                      size="xs"
                      color="red"
                      onClick={() => {
                        modals.openConfirmModal({
                          title: "Eliminar profesor",
                          children: "¿Está seguro que desea eliminar este profesor?",
                          onConfirm: () => handleDestroyProfesor(profesor),
                          labels: {
                            cancel: "Cancelar",
                            confirm: "Eliminar",
                          },
                          confirmProps: {
                            color: "red",
                          },
                        });
                      }}
                    >
                      <IconTrash size={18} />
                    </Button>
                  </div>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}
    </section>
  );
}

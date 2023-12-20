export const getProfesores = () => {
  // return fetch("http://localhost:4000/profesores").then((res) => res.json());
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          rut: "1030456-5",
          nombre: "Juan",
          apellido: "Perez",
        },
        {
          rut: "13384687-5",
          nombre: "Pedro",
          apellido: "Hernandez",
        },
      ]);
    }, 4000);
  });
};

export const storeProfesor = (profesor) => {
  // return fetch("http://localhost:4000/profesores", {
  //   method: "POST",
  //   body: JSON.stringify(profesor),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // }).then((res) => res.json());
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(profesor);
    }, 4000);
  });
};

export const updateProfesor = (profesor) => {
  // return fetch(`http://localhost:4000/profesores/${profesor.rut}`, {
  //   method: "PUT",
  //   body: JSON.stringify(profesor),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // }).then((res) => res.json());
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(profesor);
    }, 4000);
  });
};

export const destroyProfesor = (rut) => {
  // return fetch(`http://localhost:4000/profesores/${rut}`, {
  //   method: "DELETE",
  // }).then((res) => res.json());
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(rut);
    }, 4000);
  });
};

export const getPrestamos = () => {
  // return fetch("http://localhost:4000/prestamos").then((res) => res.json());
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([]);
    }, 1000);
  });
};

export const storeSolicitud = (solicitud) => {
  // return fetch("http://localhost:4000/solicitud", {
  //   method: "POST",
  //   body: JSON.stringify(solicitud),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // }).then((res) => res.json());
  return new Promise((resolve) => {
    setTimeout(() => {
      // VA A SER proyectorId, profesorRut, fechaPrestamo, horaPrestamo
      resolve({ ...solicitud });
    }, 4000);
  });
};

export const storeDevolucion = (devolucion) => {
  // return fetch("http://localhost:4000/solicitud", {
  //   method: "POST",
  //   body: JSON.stringify(solicitud),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // }).then((res) => res.json());
  return new Promise((resolve) => {
    setTimeout(() => {
      // VA A SER proyectorId, profesorRut, fechaPrestamo, horaPrestamo
      resolve({ ...devolucion });
    }, 4000);
  });
};

export const updateSolicitud = (solicitud) => {
  // return fetch(`http://localhost:4000/solicitud/${solicitud.id}`, {
  //   method: "PUT",
  //   body: JSON.stringify(solicitud),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // }).then((res) => res.json());
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(solicitud);
    }, 4000);
  });
};

export const destroySolicitud = (id) => {
  // return fetch(`http://localhost:4000/solicitud/${id}`, {
  //   method: "DELETE",
  // }).then((res) => res.json());
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(id);
    }, 4000);
  });
};

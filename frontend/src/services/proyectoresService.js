export const getProyectores = () => {
  // return fetch("http://localhost:4000/proyectores").then((res) => res.json());
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          marca: "EPSON",
          estado: 0,
        },
        {
          id: 2,
          marca: "EPSON",
          estado: 0,
        },
        {
          id: 3,
          marca: "EPSON",
          estado: 0,
        },
        {
          id: 4,
          marca: "EPSON",
          estado: 0,
        },
        {
          id: 5,
          marca: "EPSON",
          estado: 0,
        },
        {
          id: 6,
          marca: "EPSON",
          estado: 0,
        },
        {
          id: 7,
          marca: "EPSON",
          estado: 0,
        },
        {
          id: 8,
          marca: "ViewSonic",
          estado: 0,
        },
        {
          id: 9,
          marca: "ViewSonic",
          estado: 0,
        },
        {
          id: 10,
          marca: "ViewSonic",
          estado: 0,
        },
        {
          id: 11,
          marca: "ViewSonic",
          estado: 0,
        },
        {
          id: 12,
          marca: "ViewSonic",
          estado: 0,
        },
      ]);
    }, 4000);
  });
};

export const storeProyector = (proyector) => {
  // return fetch("http://localhost:4000/profesores", {
  //   method: "POST",
  //   body: JSON.stringify(profesor),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // }).then((res) => res.json());
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...proyector, id: Math.round(Math.random() * 1000) });
    }, 4000);
  });
};

export const destroyProyector = (rut) => {
  // return fetch(`http://localhost:4000/profesores/${rut}`, {
  //   method: "DELETE",
  // }).then((res) => res.json());
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(rut);
    }, 4000);
  });
};

export const formatearHora = (hora) => {
    const horaCortada = hora.split("T")[1].split("-")[0].split(":");
    const horaFormateada = horaCortada[0]+":"+horaCortada[1];
    return horaFormateada;
  }
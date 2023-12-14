import meses from '@/data/meses.json'
import mesesAbreviados from '@/data/mesesAbreviados.json'


export const formatearFecha = (fecha) => {
    const fechaBruta = fecha.split("T")[0].split("-");
    const fechaFormateada = fechaBruta[2] + "-" + fechaBruta[1] + "-" + fechaBruta[0];
    return fechaFormateada;
  }

  export const formatearFechaTexto = (fecha) => {
    const fechaBruta = fecha.split("T")[0].split("-");
    const fechaFormateada = parseInt(fechaBruta[2]).toString() + " de " + meses.meses[fechaBruta[1]] + " del " + fechaBruta[0];
    return fechaFormateada;
  }

  export const formatearFechaGraf = (fecha) => {
    const fechaBruta = fecha.split("T")[0].split("-");
    const fechaFormateada = parseInt(fechaBruta[2]).toString() + " de " + mesesAbreviados.meses[fechaBruta[1]];
    return fechaFormateada;
  }

  export const formatearFechaInverted = (fecha) => {
    const fechaBruta = fecha.split("T")[0].split("-");
    const fechaFormateada = fechaBruta[0] + "-" + fechaBruta[1] + "-" + fechaBruta[2];
    return fechaFormateada;
  }
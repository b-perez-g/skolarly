import { formatearFechaInverted } from "../formatearFecha";
import mesesAbreviados from "@/data/mesesAbreviados.json"

export const gr_promedioTiempo = (Calificaciones) => {
    let notas = [];
    const notasAgrupadas = {};
    const labels = [];
    const data = [];
    let cantidadNotas = 0;
    let acumulado = 0;

    for (const data of Calificaciones) {
        for (const calificacion of data.calificaciones) {
            const newData = {
                nota: calificacion.nota,
                fecha: formatearFechaInverted(calificacion.createdAt)
            }
            notas.push(newData);
        };

    }
    notas = notas.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

    notas.forEach(nota => {
        const { nota: valorNota, fecha } = nota;

        if (!notasAgrupadas[fecha]) {
            notasAgrupadas[fecha] = [];
        }

        notasAgrupadas[fecha].push(valorNota);
    });

    for (const fecha of Object.keys(notasAgrupadas)) {
        const fCortada = fecha.split("-");
        const newFecha = fCortada[2] + " " + mesesAbreviados.meses[fCortada[1]];
        labels.push(newFecha);


        for (let i = 0; i < notasAgrupadas[fecha].length; i++) {
            cantidadNotas++;
            acumulado += notasAgrupadas[fecha][i];
        }
        const promedioFecha =(acumulado/cantidadNotas);
        data.push(promedioFecha);
    }

    const dataGraf = [labels, data];

    console.log(dataGraf);
    return dataGraf;
};

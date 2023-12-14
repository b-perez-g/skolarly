


export const gr_calificacionesAsignatura = (dataCalificaciones, asignatura) => {
    let notas = [];
    let labels = [];
    let  label = "Calificaciones de ";

    for(const data of dataCalificaciones){
        for(const calificacion of data.calificaciones){
            if(calificacion.asignatura_id === asignatura){
                notas.push(calificacion.nota);
            }
        }
    }

    for (const data of dataCalificaciones){
        if(data.asignatura.asignatura._id === asignatura){
            label += data.asignatura.asignatura.nombre;
            break;
        }
    }
    console.log(label);

    for(let i=1; i<=notas.length;i++){
        const label = "C"+ i.toString();
        labels.push(label);
    }
    const data = {
        labels: labels,
        datasets:[
            {
            label: label,
            data: notas,
            backgroundColor: 'rgba(0, 91, 255, 0.5)'
            }
        ]
    };

    return data;
}

export const comboBox = (calificaciones) => {
    let data = [];
    const asignaturas = calificaciones.map(elem => elem.asignatura && elem.asignatura.asignatura).filter(Boolean);

    for (const asignatura of asignaturas) {
        const newData = {
            id: asignatura._id,
            nombre: asignatura.nombre

        }
        data.push(newData);
    }
    return data;
} 
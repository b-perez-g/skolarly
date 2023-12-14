const numeros = {
    '0': 'cero',
    '1': 'uno',
    '2': 'dos',
    '3': 'tres',
    '4': 'cuatro',
    '5': 'cinco',
    '6': 'seis',
    '7': 'siete',
    '8': 'ocho',
    '9': 'nueve'
};

function isNumber(valor) {
    return typeof valor === 'number';
}

export const disenarCalificaciones = (grupoCalificaciones) => {
    let cantAsignaturas = 0;
    let largoCalificaciones = 0;

    for (const elemento of grupoCalificaciones) {
        cantAsignaturas++;
        const calificaciones = elemento.calificaciones;
        const cantidadCalificaciones = calificaciones.length;
        if (cantidadCalificaciones > largoCalificaciones) {
            largoCalificaciones = cantidadCalificaciones;
        }
    }

    // Inicializar la tabla con los encabezados
    let tabla = [["Asignatura", "Código", ...Array.from({ length: largoCalificaciones }, (_, i) => `C${i + 1}`), "Promedio", "En palabras"]];

    // Llenar la tabla con filas vacías
    for (let i = 0; i < cantAsignaturas; i++) {
        let fila = Array.from({ length: largoCalificaciones + 4 }, () => null);
        tabla.push(fila);
    }

    // Llenar la tabla con los datos de calificaciones
    let indexAsignatura = 0;
    for (const elemento of grupoCalificaciones) {
        indexAsignatura++;
        const calificaciones = elemento.calificaciones;
        const asignatura = elemento.asignatura.asignatura.nombre;
        const codigo = elemento.asignatura.asignatura.codigo;
        tabla[indexAsignatura][1] = codigo;
        tabla[indexAsignatura][0] = asignatura;

        // Llenar las calificaciones en la tabla
        for (let i = 0; i < calificaciones.length; i++) {
            tabla[indexAsignatura][i + 2] = calificaciones[i].nota;
        }
    }

    for (let i = 1; i < tabla.length; i++) {
        let cantidadNotas = 0;
        let sumaNotas = 0;
        for (let j = 2; j < tabla[i].length - 2; j++) {
            if (tabla[i][j] !== null && isNumber(tabla[i][j])) {
                cantidadNotas++;
                sumaNotas += tabla[i][j];

            }
        }
        const promedio = cantidadNotas > 0 ? sumaNotas / cantidadNotas : null;
        const strPromedio = promedio.toString();
        let en_palabras = ""

        if (strPromedio.length > 1) {
            const splited = strPromedio.split(".");
            en_palabras = numeros[splited[0]] + ", " + numeros[splited[1].slice(0,1)]

        } else {
            en_palabras = numeros[strPromedio]
        }

        en_palabras = en_palabras.charAt(0).toUpperCase() + en_palabras.slice(1);

        tabla[i][largoCalificaciones + 2] = promedio;
        tabla[i][largoCalificaciones + 3] = en_palabras;
    }

    for (let i = 0; i < tabla.length; i++) {
        for(let j=0; j < tabla[i].length;j++){
            if(tabla[i][j]===null){
                tabla[i][j] = "-"
            }
        }
      }

    return tabla;
};

export const calcularPromedioGeneral = (tabla) =>{
    let contador = 0;
    let sum = 0;
    let rojos = 0;
    let aprobado = false;

    for(let i=1; i<tabla.length;i++){
        const nota =tabla[i][tabla[i].length-2]
        sum += nota;
        contador++;
        if(nota<4){
            rojos++;
        }
    }
    const promedio =  (sum/contador)

    if(rojos===1 && promedio<=4.5){
        aprobado=false;
    }
    else if(rojos===2 && promedio<=5){
        aprobado=false;
    }
    else if(rojos>2){
        aprobado=false;
    }
    else{
        aprobado=true;
    }

    return {promedio: promedio, aprobado: aprobado};
}
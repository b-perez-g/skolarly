export const getDataAlumno = async (id, alumnoId, rutApoderado) => {
    let curso = {};
    let asignaturas = [];
    let calificaciones = [];
    let asistencia =[];
    let anotaciones = [];
    let companeros = [];
    let apoderado = {};
    let prof_jefe = {};
    let bloquesHorarios = [];
    let data = [];
    

    try {
        const response = await fetch(`http://localhost:4000/api/cursos/${id}`);
        if (response.ok) {
            curso = await response.json();
            for (const asignatura of curso.asignaturas) {
                try {
                    const responseAsignatura = await fetch(`http://localhost:4000/api/asignaturas/${asignatura.asignatura_id}`);
                    if (responseAsignatura.ok) {
                        const resultAsignatura = await responseAsignatura.json();
                        try {
                            const responseProf = await fetch(`http://localhost:4000/api/usuarios/${asignatura.profesor_id}`);
                            if (responseProf.ok) {
                                const Docente = await responseProf.json();
                                const asignaturaData = { dataAsignatura: { asignatura: resultAsignatura, docente: Docente } }
                                asignaturas.push(asignaturaData);

                            }
                        } catch (error) {
                            console.error('Error al obtener el profesor', error);
                        }
                    }
                } catch (error) {
                    console.error('Error al obtener la asignatura', error);
                }
            }
        }
    } catch (error) {
        console.error('Error al obtener el curso', error);
    };
    for (const a of asignaturas) {
        const asignatura = a.dataAsignatura;
        try{
            const responseCalificaciones = await fetch(`http://localhost:4000/api/calificaciones/${alumnoId}/${asignatura.asignatura._id}`);
            if(responseCalificaciones.ok){
                const resultCalificaciones = await responseCalificaciones.json();
                const newCalification = {
                    asignatura: asignatura,
                    calificaciones: resultCalificaciones
                };
                calificaciones.push(newCalification);
            }
        } catch (error) {
            console.error('Error al obtener datos', error);
        }
    }

    try{
        const responseAsistencia = await fetch(`http://localhost:4000/api/asistencia/alumno/${alumnoId}`);
        if (responseAsistencia.ok){
            const resultAsistencia = await responseAsistencia.json();
            for(const result of resultAsistencia){
                try {
                    const responseProf = await fetch(`http://localhost:4000/api/usuarios/${result.profesor_id}`);
                    if (responseProf.ok){
                        const resultProf = await responseProf.json();
                        const newAsistencia = {asistencia: result, profesor: resultProf};
                        asistencia.push(newAsistencia);
                    }
                } catch (error) {
                    console.error('Error al obtener datos', error);
                }
            }
        }
    }catch (error){
        console.error('Error al obtener datos', error);
    }
    try{
        const responseAnotaciones = await fetch(`http://localhost:4000/api/anotaciones/alumno/${alumnoId}`);
        if (responseAnotaciones.ok){
            const resultAnotaciones = await responseAnotaciones.json();
            for(const result of resultAnotaciones){;
                try {
                    const responseProf = await fetch(`http://localhost:4000/api/usuarios/${result.profesor_id}`);
                    if (responseProf.ok){
                        const resultProf = await responseProf.json();
                        const newAnotacion = {anotacion: result, profesor: resultProf};
                        anotaciones.push(newAnotacion);
                    }
                } catch (error) {
                    console.error('Error al obtener datos', error);
                }
            }
            
        }
    }catch (error){
        console.error('Error al obtener datos', error);
    }
    try{
        const responseCompaneros = await fetch(`http://localhost:4000/api/usuarios/curso/${id}`);
        if (responseCompaneros.ok){
            const resultCompaneros = await responseCompaneros.json();
            companeros=(resultCompaneros);
        }
    }catch (error){
        console.error('Error al obtener datos', error);
    }
    try{
        const responseApoderado = await fetch(`http://localhost:4000/api/usuarios/rut/${rutApoderado}`);
        if (responseApoderado.ok){
            const resultApoderado = await responseApoderado.json();
            apoderado =resultApoderado;
        }
    }catch (error){
        console.error('Error al obtener datos', error);
    }
    try{
        const responsePJ = await fetch(`http://localhost:4000/api/usuarios/${curso.prof_jefe_id}`);
        if (responsePJ.ok){
            const resultPJ = await responsePJ.json();
            prof_jefe =resultPJ;
        }
    }catch (error){
        console.error('Error al obtener datos', error);
    }
    try{
        const responseBH = await fetch(`http://localhost:4000/api/bloques-horarios`);
        if (responseBH.ok){
            const resultBH = await responseBH.json();
            bloquesHorarios =resultBH;
        }
    }catch (error){
        console.error('Error al obtener datos', error);
    }

    data.push(curso);
    data.push(asignaturas);
    data.push(calificaciones);
    data.push(asistencia);
    data.push(anotaciones);
    data.push(companeros);
    data.push(apoderado);
    data.push(prof_jefe);
    data.push(bloquesHorarios);
    return data;
}
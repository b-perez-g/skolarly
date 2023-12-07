export const buscarRelacionDocente = async (rut) => {
    const relacionDocentes = [];

    try {
        const responseAlumnos = await fetch(`http://localhost:4000/api/usuarios/rut-apoderado/${rut}`);

        if (responseAlumnos.ok) {
            const alumnos = await responseAlumnos.json();

            for (const alumno of alumnos) {
                const cursoId = alumno.curso_id;

                try {
                    const responseCurso = await fetch(`http://localhost:4000/api/cursos/${cursoId}`);

                    if (responseCurso.ok) {
                        const resultCurso = await responseCurso.json();
                        const asignaturas = resultCurso.asignaturas;

                        for (const asignatura of asignaturas) {
                            try {
                                const responseDocente = await fetch(`http://localhost:4000/api/usuarios/${asignatura.profesor_id}`);
                                if (responseDocente.ok) {
                                    const docente = await responseDocente.json();
                                    const responseAsignatura = await fetch(`http://localhost:4000/api/asignaturas/${asignatura.asignatura_id}`);
                                    if (responseAsignatura.ok) {
                                        const asignaturaData = await responseAsignatura.json();
                                        const nombreAlumno = `${(alumno.nombre.nombres).split(" ")[0]} ${alumno.nombre.a_paterno}`;
                                        const nombreDocente = `${docente.nombre.nombres} ${docente.nombre.a_paterno} ${docente.nombre.a_materno}`;
                                        const dataRelacion = {

                                            id_docente: docente._id,
                                            docente: nombreDocente,
                                            foto: docente.foto_perfil,
                                            asignatura: asignaturaData.nombre,
                                            alumno: nombreAlumno
                                        };
                                        relacionDocentes.push(dataRelacion);
                                    }
                                }
                            } catch (errorDocente) {
                                console.error('Error al obtener información del docente.', errorDocente);
                            }
                        }
                    } else {
                        console.error('Error al obtener cursos.');
                    }
                } catch (errorCurso) {
                    console.error('Error al obtener información del curso.', errorCurso);
                }
            }
            relacionDocentes.sort((a, b) => a.docente.localeCompare(b.docente));
        } else {
            console.error('Error al obtener alumnos del apoderado.');
        }
    } catch (error) {
        console.error('Error al obtener información del apoderado.', error);
    }

    return relacionDocentes;
};





export const buscarRelacionApoderado = async (idDocente) =>{
    const relacionApoderados = [];

    try{
        const responseCurso = await fetch(`http://localhost:4000/api/cursos/`);
        if (responseCurso.ok){
            const resultCurso = await responseCurso.json();

            for (const curso of resultCurso){
                const asignaturas = curso.asignaturas;
                for (const asignatura of asignaturas){
                    const cursos_docente=[];
                    if(asignatura.profesor_id === idDocente){
                        cursos_docente.push(curso._id);
                    }
                    for (const cursoId of cursos_docente){
                        try{
                            const responseAlumnos = await fetch(`http://localhost:4000/api/usuarios/curso/${cursoId}`);
                            if (responseAlumnos.ok){
                                
                                const resultAlumnos = await responseAlumnos.json();
                                for (const alumno of resultAlumnos) {
                                    try{
                                        const responseApoderado = await fetch(`http://localhost:4000/api/usuarios/rut/${alumno.rut_apoderado}`);
                                        if (responseApoderado.ok){
                                            const apoderado = await responseApoderado.json();
                                            const nombreAlumno = `${(alumno.nombre.nombres).split(" ")[0]} ${alumno.nombre.a_paterno}`;
                                            const cursoAlumno = `${curso.grado}°${curso.letra}`
                                            const nombreApoderado = `${apoderado.nombre.nombres} ${apoderado.nombre.a_paterno} ${apoderado.nombre.a_materno}`;

                                            const dataRelacion = {

                                                id_apoderado: apoderado._id,
                                                apoderado: nombreApoderado,
                                                foto: apoderado.foto_perfil,
                                                curso: cursoAlumno,
                                                alumno: nombreAlumno
                                            };
                                            relacionApoderados.push(dataRelacion);
                                        }
                                    }catch(error){
                                        console.error('Error al obtener apoderados.');
                                    }
                                }                                
                            }
                        }catch (error){
                            console.error('Error al obtener alumnos.');
                        }
                        
                    }
                }
            }
            relacionApoderados.sort((a, b) => a.apoderado.localeCompare(b.apoderado));
        }
        

    }catch(error){
        console.error('Error al obtener cursos.');
    }
    return relacionApoderados;
};
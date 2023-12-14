export const getUser = async (id) => {
    let user = {};

    try {
        //BUSCAR USUARIO
        const response = await fetch(`http://localhost:4000/api/usuarios/${id}`);
        //SI SE ENCUENTRA EL USUARIO
        if (response.ok) {
            user = await response.json();
        }
    } catch (error) {
        console.error('Error al obtener el usuario', error);
    };
    return user;
}

export const getUsersByRutApoderado = async (rutApoderado) =>{
    let alumnos = null;
    try{
        const response = await fetch(`http://localhost:4000/api/usuarios/rut-apoderado/${rutApoderado}`);
        if (response.ok){
            alumnos = [];
            const result = await response.json();
            for(const alumno of result){
                try{
                    const responseCurso = await fetch(`http://localhost:4000/api/cursos/${alumno.curso_id}`);
                    if(responseCurso.ok){
                        const curso= await responseCurso.json();
                        alumnos.push({datos:alumno, curso: curso});
                    }
                }catch (error){
                    console.error('Error al obtener los alumnos', error);
                }
            }
        }
        
    }catch (error){
        console.error('Error al obtener los alumnos', error);
    }
    return alumnos;
}

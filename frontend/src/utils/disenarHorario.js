export const disenarHorario = (curso, bloques, asignaturas) =>{//const objetoEncontrado = miArray.find(objeto => objeto.asignaturaId === idBuscada);
    const dias = {LU:3, MA:4, MI:5, JU:6, VI:7};
    const Horario = [["Bloque","Hora inicio", "Hora término", "Lunes", "Martes", "Miercoles","Jueves","Viernes"]];

    const asignaturaRelId = [];
    const bloqueRelId = []
    
    for(const data of asignaturas){
        const asignatura = data.dataAsignatura.asignatura;
        const relation = {
            asignaturaId:  asignatura._id,
            nombre: asignatura.nombre
        };
        asignaturaRelId.push(relation);
    }

    for (const bloque of bloques){
        const newFila = [bloque.numero, bloque.hora_inicio, bloque.hora_fin,"","","","",""];
        Horario.push(newFila);
        const relation = {
            bloqueId: bloque._id,
            numero: bloque.numero
        };
        bloqueRelId.push(relation);
    }

    for (const asignatura of curso.asignaturas){
        const nombreAsignatura = (asignaturaRelId.find(rel => rel.asignaturaId === asignatura.asignatura_id)).nombre;

        for(const clase of asignatura.horario){
            const numDia = dias[clase.dia];

            for(const bloque of clase.bloques){
                const numBloque = (bloqueRelId.find(rel => rel.bloqueId === bloque.bloque)).numero;
                Horario[numBloque][numDia] = nombreAsignatura;
            }
        }
    }
    return Horario;
}
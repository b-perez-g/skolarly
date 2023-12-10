const moment = require('moment-timezone');

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





export const buscarRelacionApoderado = async (idDocente) => {
    const relacionApoderados = [];

    try {
        const responseCurso = await fetch(`http://localhost:4000/api/cursos/`);
        if (responseCurso.ok) {
            const resultCurso = await responseCurso.json();

            for (const curso of resultCurso) {
                const asignaturas = curso.asignaturas;
                for (const asignatura of asignaturas) {
                    const cursos_docente = [];
                    if (asignatura.profesor_id === idDocente) {
                        cursos_docente.push(curso._id);
                    }
                    for (const cursoId of cursos_docente) {
                        try {
                            const responseAlumnos = await fetch(`http://localhost:4000/api/usuarios/curso/${cursoId}`);
                            if (responseAlumnos.ok) {

                                const resultAlumnos = await responseAlumnos.json();
                                for (const alumno of resultAlumnos) {
                                    try {
                                        const responseApoderado = await fetch(`http://localhost:4000/api/usuarios/rut/${alumno.rut_apoderado}`);
                                        if (responseApoderado.ok) {
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
                                    } catch (error) {
                                        console.error('Error al obtener apoderados.');
                                    }
                                }
                            }
                        } catch (error) {
                            console.error('Error al obtener alumnos.');
                        }

                    }
                }
            }
            relacionApoderados.sort((a, b) => a.apoderado.localeCompare(b.apoderado));
        }


    } catch (error) {
        console.error('Error al obtener cursos.');
    }
    return relacionApoderados;
};

export const buscarChat = async (user1, user2) => {
    let chat = null;
    try {
        const responseChat = await fetch(`http://localhost:4000/api/chats/${user1}/${user2}`);
        if (responseChat.ok) {
            const resultChat = await responseChat.json(); // Corregido: Cambiado de resultChat a const resultChat
            chat = resultChat;
        }
    } catch (error) {
        console.error('Error al obtener chat');
    }
    return chat;
};


export const crearChat = async (user1, user2) => {
    const nuevoChat = {
        participantes: [user1, user2],
    };

    try {
        const response = await fetch('http://localhost:4000/api/chats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoChat),
        });

        const data = await response.json();
    } catch (error) {
        console.error('Error:', error);
    }

}

export const crearMensaje = async (msg, chat_id) => {
    const nuevoMensaje = {
        chat_id: chat_id,
        remitente_id: msg.from,
        destinatario_id: msg.to,
        contenido: msg.body
    };

    try {
        const response = await fetch('http://localhost:4000/api/mensajes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoMensaje),
        });

        const data = await response.json();

        try {
            const url = `http://localhost:4000/api/chats/${chat_id}`;
            const nuevaFechaActualizacion = moment().tz('America/Santiago').format();

            const datosAEnviar = {
                updatedAt: nuevaFechaActualizacion,
                visto: false
            };

            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datosAEnviar),
            });

            if (response.ok) {
                console.log('Chat actualizado exitosamente');
            } else {
                console.error('Error al actualizar el chat');
            }

        } catch (error) {
            console.error('Error:', error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


export const obtenerMensajes = async (id_chat) => {
    let mensajes = null;
    try {
        const responseMensajes = await fetch(`http://localhost:4000/api/mensajes/chat-id/${id_chat}`);
        if (responseMensajes.ok) {
            const resultMensajes = await responseMensajes.json();
            mensajes = resultMensajes;
        }
    } catch (error) {
        console.error('Error al obtener mensajes');
    }
    return mensajes;
}

export const obtenerChatList = async (id_user) => {
    let listaChats = [];
    try {
        const responseChats = await fetch(`http://localhost:4000/api/chats/${id_user}`);
        if (responseChats.ok) {
            const resultChats = await responseChats.json();

            for (const chatPromise of resultChats) {
                const chat = await chatPromise;
                try {
                    let participante = "";
                    for (const part of chat.participantes) {
                        if (part !== id_user) {
                            participante = part;
                        }
                    }
                    if (participante !== "") {
                        const responseUser = await fetch(`http://localhost:4000/api/usuarios/${participante}`);
                        if (responseUser.ok) {
                            const user = await responseUser.json();

                            try {
                                const responseMsg = await fetch(`http://localhost:4000/api/mensajes/lastest/${chat._id}`);
                                if (responseMsg.ok) {
                                    const lastestMsg = await responseMsg.json();
                                    listaChats.push({ chat: chat, mensaje: lastestMsg, usuario: user });
                                }
                            } catch (error) {
                                console.error('Error al obtener el mensaje más reciente:', error);
                            }
                        }
                    }
                } catch (error) {
                    console.error('Error al procesar el chat:', error);
                }
            }

            // Ordenar la lista de chats por el campo _id del mensaje más reciente
            listaChats.sort((a, b) => {
                const idA = a.mensaje._id;
                const idB = b.mensaje._id;
                return idB.localeCompare(idA);
            });
        }
    } catch (error) {
        console.error('Error al obtener la lista de chats:', error);
    }
    return listaChats;
}

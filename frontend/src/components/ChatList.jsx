'use client'
import React, { useState, useEffect } from 'react';
import { Avatar, Divider, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { IoSearchSharp } from "react-icons/io5";
import { consultarCookie } from '@/utils/validarLogin';
import { buscarRelacionDocente, buscarRelacionApoderado } from '@/utils/buscarChat';
import io from 'socket.io-client'
import { obtenerChatList } from '@/utils/buscarChat';
import { marcarVisto } from '@/utils/marcarMensajeVisto';

const socket = io('http://localhost:4000')

function ChatList({ tipoUser, cambiarChat, obtenerUsuario, chat }) {
  const [user, setUser] = useState({});
  const [userSelected, setUserSelected] = useState({});
  const [profesoresDisponibles, setProfesoresDisponibles] = useState([{ alumno: "", asignatura: "", docente: "", foto: "", id_docente: "" }])
  const [apoderadosDisponibles, setApoderadosDisponibles] = useState([{ id_apoderado: "", apoderado: "", alumno: "", foto: "", curso: "" }]);
  const [chatlist, setChatlist] = useState([]);
  const [actualizar, setActualizar] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const solicitante = await consultarCookie();
        setUser(solicitante);
        obtenerUsuario(solicitante);

        if (solicitante.TIPO === "Apoderado") {
          const profesores = await buscarRelacionDocente(solicitante.RUT);
          setProfesoresDisponibles(profesores);
        }

        if (solicitante.TIPO === "Docente") {
          const apoderados = await buscarRelacionApoderado(solicitante.ID);
          setApoderadosDisponibles(apoderados);
        }

        const lista = await obtenerChatList(solicitante.ID);
        let items = [];

        if (lista) {
          for (const chatPromise of lista) {
            const chat = await chatPromise.chat;
            const mensaje = await chatPromise.mensaje
            const usuario = await chatPromise.usuario;
            for (const participantePromise of chat.participantes) {
              const participante = await participantePromise;
              if (participante !== solicitante.ID) {
                let msgExample = "";
                if (mensaje.contenido.length > 32) {
                  msgExample = mensaje.contenido.slice(0, 32) + "...";
                } else {
                  msgExample = mensaje.contenido;
                }

                const horaView = chat.updatedAt.split("T")[1].split("-")[0].slice(0, 5);
                const fechaF = chat.updatedAt.split("T")[0];
                const anho = fechaF.split("-")[0];
                const mes = fechaF.split("-")[1];
                const dia = fechaF.split("-")[2];
                const fechaView = dia + "-" + mes + "-" + anho;


                const newData = {
                  user: usuario,
                  chat: chat._id,
                  fecha: chat.updatedAt,
                  mensaje: msgExample,
                  remitente: mensaje.remitente_id,
                  dia: fechaView,
                  hora: horaView,
                  visto: chat.visto
                }
                items.push(newData);
              }
            }
          }
        }
        setChatlist(items);
        console.log(items);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, [actualizar]);

  useEffect(() => { }, [])

  useEffect(() => {
    cambiarChat(userSelected);
  }, [userSelected])

  useEffect(() => {
    const handleMessage = () => {
      setActualizar((prevVisto => !prevVisto));
    };

    socket.on('msg', handleMessage);

    return () => {
      socket.off("msg", handleMessage);
    };
  }, []);

  return (
    <div>
      <div className='bg-gray-200 p-6 h-[72px]'>
        <h2 className='font-bold text-xl'>Mis conversaciones</h2>
      </div>

      <Divider orientation="horizontal" />

      {tipoUser === "Apoderado" ? (
        <div className="w-full">
          <Autocomplete
            classNames={{
              listboxWrapper: "max-h-[320px]",
              selectorButton: "text-default-500"
            }}
            defaultItems={profesoresDisponibles}
            inputProps={{
              classNames: {
                input: "ml-1",
                inputWrapper: "h-[48px]",
              },
            }}
            listboxProps={{
              hideSelectedIcon: true,
              itemClasses: {
                base: [
                  "rounded-medium",
                  "text-default-500",
                  "transition-opacity",
                  "data-[hover=true]:text-foreground",
                  "dark:data-[hover=true]:bg-default-50",
                  "data-[pressed=true]:opacity-70",
                  "data-[hover=true]:bg-default-200",
                  "data-[selectable=true]:focus:bg-default-100",
                  "data-[focus-visible=true]:ring-default-500",
                ],
              },
            }}
            aria-label="Selecciona un profesor"
            placeholder="Busca un profesor"
            popoverProps={{
              offset: 10,
              classNames: {
                base: "rounded-large",
                content: "p-1 border-small border-default-100 bg-background",
              },
            }}
            startContent={<IoSearchSharp className="text-default-400" strokeWidth={2.5} size={20} />}
          >
            {(item) => (
              <AutocompleteItem key={item.id_docente} textValue={item.docente}
                onClick={() => setUserSelected(
                  {
                    "id": item.id_docente,
                    "docente": item.docente,
                    "asignatura": item.asignatura,
                    "alumno": item.alumno,
                    "foto": item.foto
                  })}
              >
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <Avatar alt={item.docente} className="flex-shrink-0" size="lg" src={item.foto} />
                    <div className="flex flex-col">
                      <span className="text-small">{item.docente}</span>
                      <span className="text-tiny text-default-400">{`Prof. ${item.asignatura} de ${item.alumno}`}</span>
                    </div>
                  </div>
                </div>
              </AutocompleteItem>
            )}
          </Autocomplete>
        </div>
      ) : null}

      {tipoUser === "Docente" ? (
        <div className="w-full">
          <Autocomplete
            classNames={{
              listboxWrapper: "max-h-[320px]",
              selectorButton: "text-default-500"
            }}
            defaultItems={apoderadosDisponibles}
            inputProps={{
              classNames: {
                input: "ml-1",
                inputWrapper: "h-[48px]",
              },
            }}
            listboxProps={{
              hideSelectedIcon: true,
              itemClasses: {
                base: [
                  "rounded-medium",
                  "text-default-500",
                  "transition-opacity",
                  "data-[hover=true]:text-foreground",
                  "dark:data-[hover=true]:bg-default-50",
                  "data-[pressed=true]:opacity-70",
                  "data-[hover=true]:bg-default-200",
                  "data-[selectable=true]:focus:bg-default-100",
                  "data-[focus-visible=true]:ring-default-500",
                ],
              },
            }}
            aria-label="Selecciona un apoderado"
            placeholder="Busca un apoderado"
            popoverProps={{
              offset: 10,
              classNames: {
                base: "rounded-large",
                content: "p-1 border-small border-default-100 bg-background",
              },
            }}
            startContent={<IoSearchSharp className="text-default-400" strokeWidth={2.5} size={20} />}
          >
            {(item) => (
              <AutocompleteItem key={item.id_apoderado} textValue={item.apoderado}
                on onClick={() => setUserSelected(
                  {
                    "id": item.id_apoderado,
                    "apoderado": item.apoderado,
                    "alumno": item.alumno,
                    "foto": item.foto,
                    "curso": item.curso
                  })}
              >
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <Avatar alt={item.apoderado} className="flex-shrink-0" size="lg" src={item.foto} />
                    <div className="flex flex-col">
                      <span className="text-small">{item.apoderado}</span>
                      <span className="text-tiny text-default-400">{`Apoderado(a) de ${item.alumno} (${item.curso})`}</span>
                    </div>
                  </div>
                </div>
              </AutocompleteItem>
            )}
          </Autocomplete>
        </div>
      ) : null}


      <Divider orientation="horizontal" />

      <div>

        <div className=" scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 h-[416px] w-full overflow-y-scroll">
          <div className='p-4'>
            <ul>
              {chatlist.map((chat, index) => (
                <div key={index} onClick={() => {
                  if (chat.user.tipo_usuario === "Docente") {
                    const docenteEncontrado = profesoresDisponibles.find(docente => docente.id_docente === chat.user._id);
                    setUserSelected({
                      "id": docenteEncontrado.id_docente,
                      "docente": docenteEncontrado.docente,
                      "asignatura": docenteEncontrado.asignatura,
                      "alumno": docenteEncontrado.alumno,
                      "foto": docenteEncontrado.foto
                    });
                    if (user.TIPO === "Apoderado") {
                      marcarVisto(chat.chat);
                      setActualizar((prevVisto => !prevVisto));
                    }
                  }

                  if (chat.user.tipo_usuario === "Apoderado") {
                    const apoderadoEncontrado = apoderadosDisponibles.find(apoderado => apoderado.id_apoderado === chat.user._id);
                    console.log(apoderadoEncontrado);
                    setUserSelected({
                      "id": apoderadoEncontrado.id_apoderado,
                      "apoderado": apoderadoEncontrado.apoderado,
                      "alumno": apoderadoEncontrado.alumno,
                      "foto": apoderadoEncontrado.foto,
                      "curso": apoderadoEncontrado.curso
                    });
                    if (user.TIPO === "Docente") {
                      marcarVisto(chat.chat);
                      setActualizar((prevVisto => !prevVisto));
                    }
                  }
                }}>
                  <li className={`grid grid-cols-8 gap-4 flex items-center justify-items-center ${(chat.remitente !== user.ID && !chat.visto) ? 'text-blue-800' : ''}`}>
                    <Avatar className="col-span-2" src={chat.user.foto_perfil} size="lg" />
                    <div className='col-span-5'>
                      <h2 className='font-bold sm:w-full md:w-full lg:w-[200px] xl:w-[200px]'>{`${chat.user.nombre.nombres} ${chat.user.nombre.a_paterno} ${chat.user.nombre.a_materno}`}</h2>
                      {(chat.remitente === user.ID)
                        ?
                        <p className='text-sm sm:w-full md:w-full lg:w-[200px] xl:w-[200px]'>{`Tú: ${chat.mensaje}`}</p>
                        :
                        <p className='text-sm sm:w-full md:w-full lg:w-[200px] xl:w-[200px]'>{`${chat.user.nombre.nombres.split(" ")[0]}: ${chat.mensaje}`}</p>
                      }

                      <small className='inline-block text-[11px] text-gray-500 text-left ml-4'>{`::::${chat.dia}::::::${chat.hora}::::`}</small>
                    </div>
                    {(chat.remitente !== user.ID && !chat.visto) ? <p className='col-span-1 text-[25px]'>●</p> : null}
                  </li>

                  <Divider orientation="horizontal" className='mt-2 mb-2' />
                </div>
              ))}

            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatList;

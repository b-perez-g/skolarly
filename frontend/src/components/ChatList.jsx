'use client'
import React, { useState, useEffect } from 'react';
import { Avatar, Divider, Autocomplete, AutocompleteItem, Button } from "@nextui-org/react";
import { IoSearchSharp } from "react-icons/io5";
import { consultarCookie } from '@/utils/validarLogin';
import { buscarRelacionDocente, buscarRelacionApoderado } from '@/utils/buscarChat';



function ChatList({ tipoUser, cambiarChat, obtenerUsuario }) {
  const [userSelected, setUserSelected] = useState({});
  const [profesoresDisponibles, setProfesoresDisponibles] = useState([{alumno:"",asignatura:"", docente:"", foto:"", id_docente:""}])
  const [apoderadosDisponibles, setApoderadosDisponibles] = useState([{id_apoderado:"", apoderado:"", alumno:"", foto:"", curso:""}]);

  useEffect(() => {
    const getSolicitante = async () => {
      const solicitante = await consultarCookie();
      return solicitante;
    }
    const getUsuariosDisponibles = async () => {
      const solicitante = await getSolicitante();
      obtenerUsuario(solicitante);
      if (solicitante.TIPO === "Apoderado") {
        const profesores = await buscarRelacionDocente(solicitante.RUT);
        setProfesoresDisponibles(profesores);
      }
      if (solicitante.TIPO === "Docente") {
        const apoderados = await buscarRelacionApoderado(solicitante.ID);
        setApoderadosDisponibles(apoderados);
      }
    }
    getUsuariosDisponibles();
  }, [])

  useEffect(() => {
    cambiarChat(userSelected);
  }, [userSelected])


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
                on onClick={() => setUserSelected(
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
              <li className='grid grid-cols-6 gap-16'>
                <Avatar className="col-span-1" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" size="lg" />
                <div className='col-span-5'>
                  <h2 className='font-bold'>Nombre</h2>
                  <p className='text-sm'>Este es un mensaje de prueba....</p>
                </div>
              </li>
              <Divider orientation="horizontal" className='mt-2 mb-2' />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatList;

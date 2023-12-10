'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardBody, Button, Input, Divider, Avatar } from "@nextui-org/react";;
import { IoMdSend } from "react-icons/io";
import { GrAttachment } from "react-icons/gr";
import io from 'socket.io-client'
import { consultarCookie } from '@/utils/validarLogin';
import { buscarChat, crearChat, crearMensaje, obtenerMensajes } from '@/utils/buscarChat';
const moment = require('moment-timezone');

const socket = io('http://localhost:4000')
const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

function Chat({ tipoUser, chat }) {
  const [user, setUser] = useState({});
  const [panelChat, setPanelChat] = useState({});
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState({});
  const [messages, setMessages] = useState([])
  let lastMessageFecha = "";



  useEffect(() => {
    const getUser = async () => {
      const solicitante = await consultarCookie();
      return solicitante;
    }
    const cambiarUsuario = async () => {

      const usuario = await getUser();
      setUser(usuario);
      setFrom(usuario.ID);
      setTo(chat.id);
    }
    const cargarMensajes = async () => {
      const Chat = await buscarChat(user.ID, chat.id);
      if (Chat) {
        const mensajes = await obtenerMensajes(Chat._id);
        if (mensajes) {

          const newMessages = mensajes.map(msg => {
            const horaFormat = msg.createdAt.split("T")[1].split("-")[0].slice(0, 5);
            const fechaFormat = msg.createdAt.split("T")[0];
            const anho = fechaFormat.split("-")[0];
            const mes = parseInt(fechaFormat.split("-")[1]);
            const dia = fechaFormat.split("-")[2];

            const newFecha = dia + " de " + meses[mes - 1] + ", " + anho;

            return {
              from: msg.remitente_id,
              to: msg.destinatario_id,
              body: msg.contenido,
              hora: horaFormat,
              fecha: newFecha
            };

          });
          setMessages([...newMessages]);
        }
      }

    }

    setMessages([]);
    setPanelChat(chat)
    cambiarUsuario();
    cargarMensajes();
    lastMessageFecha = "";
  }, [chat])


  const handleSubmit = async (e) => {
    e.preventDefault();
    const time = moment().tz('America/Santiago').format();
    const horaFormat = time.split("T")[1].split("-")[0].slice(0, 5);
    const fechaFormat = time.split("T")[0];
    const anho = fechaFormat.split("-")[0];
    const mes = parseInt(fechaFormat.split("-")[1]);
    const dia = fechaFormat.split("-")[2];

    const newFecha = dia + " de " + meses[mes - 1] + ", " + anho;
    const msgData = {
      from: from,
      to: to,
      body: body,
      hora: horaFormat,
      fecha: newFecha
    };

    // Emitir el mensaje al servidor
    if (body !== "") {
      socket.emit('msg', msgData);

      // Actualizar el estado de los mensajes
      setMessages([...messages, msgData]);

      // Limpiar el campo del mensaje
      setBody("");

      const user1 = user.ID;
      const user2 = chat.id;

      let resultChat = await buscarChat(user1, user2);

      if (resultChat === null) {
        await crearChat(user1, user2);
        resultChat = await buscarChat(user1, user2);
      }

      await crearMensaje(msgData, resultChat._id);
    }




  }


  useEffect(() => {
    const receiveMessage = (newMessage) => {
      if ((user.ID === newMessage.to || user.ID === newMessage.from) && (chat.id === newMessage.from || chat.id === newMessage.to)) {
        setMessages([...messages, newMessage])
      }

    };
    socket.on('msg', receiveMessage);

    return () => {
      socket.off("msg", receiveMessage);
    }
  }, [messages])



  if (Object.keys(panelChat).length === 0) {
    return <p className='text-center mt-5'>seleccione un chat.</p>
  }

  else {
    if (tipoUser === "Apoderado") {
      return (
        <div>
          <div className='bg-gray-100 p-4 grid grid-cols-12 gap-16 h-[72px]'>
            <Avatar className="col-span-1" src={chat.foto} size="md" />
            <div className='col-span-11'>
              <h2 className='font-bold'>{chat.docente}</h2>
              <p className='text-sm'>{`Prof. ${chat.asignatura} de ${chat.alumno}`} </p>
            </div>
          </div>
          <Divider orientation="horizontal" />
          <div className="scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 h-[400px] w-full overflow-y-scroll">
            <div className='p-4'>

              {messages.map((message, index) => {
                // Verifica si la fecha del mensaje es diferente a la última mostrada
                const mostrarFecha = lastMessageFecha !== message.fecha;

                // Actualiza la fecha del mensaje anterior
                lastMessageFecha = message.fecha;

                return (
                  <div key={index}>
                    <div className='text-center p-4'>
                    {mostrarFecha && <small className='text-gray-500'>{message.fecha}</small>}
                    </div>
                    <Card style={{ width: 'fit-content' }} className={`max-w-[80%] mb-4 ${user.ID === message.from ? 'ml-auto bg-blue-200' : 'mr-auto bg-white'}`}>
                      <CardBody className="inline-block">
                        <p className='inline-block text-sm'>{message.body}</p>
                        <small className='inline-block text-[11px] text-gray-500 text-right ml-4'>{message.hora}</small>
                      </CardBody>
                    </Card>
                  </div>
                );
              })}


            </div>
          </div>
          <form className='p-2 bg-gray-100'
            onSubmit={handleSubmit}
          >
            <Input
              name="inputMessage"
              variant="bordered"
              value={body}
              radius='full'
              placeholder='Mensaje'
              endContent={
                <>
                  <GrAttachment className="text-2xl text-gray-500 mr-2 cursor-pointer hover:bg-gray-500 hover:text-white hover:rounded-md hover:p-1" />
                  <Button type="submit" className="" color="primary" radius="full" variant="solid">
                    <IoMdSend className="text-2xl" />
                  </Button>
                </>
              }
              className='bg-white rounded-full'
              onChange={(e) => setBody(e.target.value)}
            />
          </form>
        </div>
      );
    }


    if (tipoUser === "Docente") {
      return (
        <div>
          <div className='bg-gray-100 p-4 grid grid-cols-12 gap-16 h-[72px]'>
            <Avatar className="col-span-1" src={chat.foto} size="md" />
            <div className='col-span-11'>
              <h2 className='font-bold'>{chat.apoderado}</h2>
              <p className='text-sm'>{`Apoderado(a) de ${chat.alumno} (${chat.curso})`} </p>
            </div>
          </div>
          <Divider orientation="horizontal" />
          <div className="scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 h-[400px] w-full overflow-y-scroll">
            <div className='p-4'>
              {messages.map((message, index) => {
                const mostrarFecha = lastMessageFecha !== message.fecha;
                lastMessageFecha = message.fecha;

                return (
                  <div key={index}>
                    <div className='text-center p-4'>
                    {mostrarFecha && <small className='text-gray-500'>{message.fecha}</small>}
                    </div>
                    <Card style={{ width: 'fit-content' }} className={`max-w-[80%] mb-4 ${user.ID === message.from ? 'ml-auto bg-blue-200' : 'mr-auto bg-white'}`}>
                      <CardBody className="inline-block">
                        <p className='inline-block text-sm'>{message.body}</p>
                        <small className='inline-block text-[11px] text-gray-500 text-right ml-4'>{message.hora}</small>
                      </CardBody>
                    </Card>
                  </div>
                );
              })}


            </div>
          </div>
          <form className='p-2 bg-gray-100'
            onSubmit={handleSubmit}
            autoComplete='off'
          >
            <Input
              name="inputMessage"
              variant="bordered"
              value={body}
              radius='full'
              placeholder='Mensaje'
              endContent={
                <>
                  <GrAttachment className="text-2xl text-gray-500 mr-2 cursor-pointer hover:bg-gray-500 hover:text-white hover:rounded-md hover:p-1" />
                  <Button type="submit" className="" color="primary" radius="full" variant="solid">
                    <IoMdSend className="text-2xl" />
                  </Button>
                </>
              }
              className='bg-white rounded-full'
              onChange={(e) => setBody(e.target.value)}
              autoComplete='off'
            />
          </form>
        </div>
      );
    }
  }
}
export default Chat;

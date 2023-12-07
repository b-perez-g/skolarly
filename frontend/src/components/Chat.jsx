'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardBody, Button, Input, Divider, Avatar } from "@nextui-org/react";;
import { IoMdSend } from "react-icons/io";
import { GrAttachment } from "react-icons/gr";
import io from 'socket.io-client'
import { consultarCookie } from '@/utils/validarLogin';

const socket = io('http://localhost:4000')

function Chat({ tipoUser, chat }) {
  const [user, setUser] = useState({});
  const [panelChat, setPanelChat] = useState({});
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState({});
  const [messages, setMessages] = useState([])

 

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
    setMessages([]);
    setPanelChat(chat)
    cambiarUsuario();
  }, [chat])


  const handleSubmit = (e) => {
    e.preventDefault();
    const msgData = {
      from: from,
      to: to,
      body: body
    };

    // Emitir el mensaje al servidor
    socket.emit('msg', msgData);

    // Actualizar el estado de los mensajes
    setMessages([...messages, msgData]);

    // Limpiar el campo del mensaje
    setBody("");
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
              {messages.map((message, index) => (
                (user.ID === message.from) ? (
                  <Card key={index} style={{ width: 'fit-content' }} className='max-w-[80%] ml-auto mb-4 bg-blue-200'>
                    <CardBody className="inline-block">
                      <p className='inline-block text-sm'>{message.body}</p>
                      <small className='inline-block text-[11px] text-gray-500 text-right ml-4'>00:00</small>
                    </CardBody>
                  </Card>
                ) : (
                  <Card key={index} style={{ width: 'fit-content' }} className='max-w-[80%] mr-auto mb-4 bg-white'>
                    <CardBody className="inline-block">
                      <p className='inline-block text-sm'>{message.body}</p>
                      <small className='inline-block text-[11px] text-gray-500 text-right ml-4'>00:00</small>
                    </CardBody>
                  </Card>
                )
              )
              )}

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
              {messages.map((message, index) => (
                (user.ID === message.from) ? (
                  <Card key={index} style={{ width: 'fit-content' }} className='max-w-[80%] ml-auto mb-4 bg-blue-200'>
                    <CardBody className="inline-block">
                      <p className='inline-block text-sm'>{message.body}</p>
                      <small className='inline-block text-[11px] text-gray-500 text-right ml-4'>00:00</small>
                    </CardBody>
                  </Card>
                ) : (
                  <Card key={index} style={{ width: 'fit-content' }} className='max-w-[80%] mr-auto mb-4 bg-white'>
                    <CardBody className="inline-block">
                      <p className='inline-block text-sm'>{message.body}</p>
                      <small className='inline-block text-[11px] text-gray-500 text-right ml-4'>00:00</small>
                    </CardBody>
                  </Card>
                )
              )
              )}

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
  }
}
export default Chat;

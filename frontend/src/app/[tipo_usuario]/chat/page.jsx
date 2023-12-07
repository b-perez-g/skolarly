'use client'

import React, {useState} from 'react';
import { Divider } from "@nextui-org/react";
import Chat from '@/components/Chat';
import ChatList from '@/components/ChatList';

function Page({params}) {
  const [chatSelected, setChatSelected] = useState({});
  const [usuario, setUsuario] = useState("");

  const cambiarChat = (userSelected) =>{
    setChatSelected(userSelected);
  }

  const obtenerUsuario = async (datos) =>{
    try{
      const responseUsuario = await fetch(`http://localhost:4000/api/usuarios/${datos.ID}`);
      if (responseUsuario.ok){
        const result = await responseUsuario.json();
        const nombre = `${result.nombre.nombres.split(" ")[0]} ${result.nombre.a_paterno}`
        setUsuario(nombre);
      }
    } catch (error){
      console.error('Error al obtener usuario.');
    }
    //setUsuario(userSelected);
  }

  return (
    <div>
      <div className="bg-blue-900 p-5 border-2 border-white rounded-lg mb-5">
        <h2 className="text-3xl font-bold text-blue-50 text-left">{`Chat: ${usuario}`}</h2>
      </div>
      <Divider orientation="horizontal" />
      <div className='grid grid-cols-5 gap-0'>
        <div className='col-span-2 border-l border-b'>
        <ChatList tipoUser ={params.tipo_usuario} cambiarChat={cambiarChat} obtenerUsuario={obtenerUsuario}/>
        </div>
        <div className='col-span-3 border-l border-r border-b'>
        <Chat tipoUser ={params.tipo_usuario} chat={chatSelected} />
        </div>
      </div>
    </div>
  );
}

export default Page;

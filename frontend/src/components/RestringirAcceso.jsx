import React from 'react';
import { Button } from "@nextui-org/react";

function RestringirAcceso() {
  return (
    <div className='flex items-center justify-center h-screen'>
    <div className='text-center w-[500px]'>
        <img src="/image/skolarly/missing-head.gif" alt="Logo Skolarly" />
      <h1 className="text-4xl font-bold text-red-700 mt-8">Esta página web no está disponible para ti. 😔</h1>
      <p className='text-l mt-8 mb-8 text-black font-bold'>!Debes iniciar sesión con un usuario con permisos!</p>
      <Button className="bg-blue-900 text-white w-full mb-4" onClick={()=>window.history.back()}>
            Volver atrás
          </Button>
      </div>
      </div>
  );
}

export default RestringirAcceso;

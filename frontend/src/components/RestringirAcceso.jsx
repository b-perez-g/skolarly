'use client'
import React from 'react';
import { Button } from "@nextui-org/react";
import Link from 'next/link';

function RestringirAcceso() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='text-center'>
        <img className="w-[300px] mx-auto" src="/image/skolarly/missing-head.gif" alt="Logo Skolarly" />
        <h1 className=" w-[400px] text-4xl font-bold text-red-700 mt-8">Esta página web no está disponible para ti. 😔</h1>
        <p className=' w-[400px] text-l mt-8 mb-8 text-black font-bold'>!Debes iniciar sesión con un usuario con permisos!</p>
        <Link href="/">
          <Button className="bg-blue-900 text-white mb-4">
            Volver al inicio
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default RestringirAcceso;

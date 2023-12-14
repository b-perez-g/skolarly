
'use client'
import React from 'react';
import { useAppState } from '../../../../data/dataAlumnoZustand'
import FotoPerfilAlumno from '@/components/FotoPerfilAlumno';
import DatosAlumno from '@/components/DatosAlumno';
import CursoAlumno from '@/components/CursoAlumno';
import AsignaturasAlumno from '@/components/AsignaturasAlumno';



function Page({ params }) {
  const { alumno, curso, bloquesHorarios } = useAppState();
  console.log(bloquesHorarios);

  return (
    <div>
      <div className="mt-5 bg-blue-900 p-5 border-2 border-white rounded-lg mb-5">
        <h2 className="text-3xl font-bold text-blue-50 text-left">{`Perfil: ${alumno.nombre.nombres.split(" ")[0]} ${alumno.nombre.a_paterno}`}</h2>
      </div>
      <div className='text-center flex flex-col items-center mt-8'>
        <FotoPerfilAlumno />
        <h1 className='text-3xl font-bold mt-4 mb-4'>{`${alumno.nombre.nombres} ${alumno.nombre.a_paterno} ${alumno.nombre.a_materno}`}</h1>
      </div>
      <div className='mb-8'>
        <DatosAlumno />
      </div>
      <div className='mb-8'>
        <CursoAlumno />
      </div>
      <div className='mb-8'>
        <AsignaturasAlumno />
      </div>
    </div>
  );
}

export default Page;
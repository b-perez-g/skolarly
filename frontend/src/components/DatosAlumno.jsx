import React from 'react'
import { useAppState } from '../data/dataAlumnoZustand'
import { formatearFecha } from '@/utils/formatearFecha';

function DatosAlumno() {
  const { alumno } = useAppState();

  return (
    <>
      <h2 className='font-bold text-lg'>Información personal: </h2>

      <div className='grid grid-cols-6 border-2 border-gray-200 rounded-lg p-4'>
        <div className="col-span-5">
          <div className='grid grid-cols-6 gap-4 items-center mb-2'>
            <p className=' col-span-1 font-bold text-sm'>Rut:</p>
            <p className='col-span-5'>{alumno.rut}</p>
          </div>
          <div className='grid grid-cols-6 gap-4 items-center mb-2'>
            <p className=' col-span-1 font-bold text-sm'>Tipo de usuario:</p>
            <p className='col-span-5'>{alumno.tipo_usuario}</p>
          </div>
          <div className='grid grid-cols-6 gap-4 items-center mb-2'>
            <p className=' col-span-1 font-bold text-sm'>Fecha de nacimiento:</p>
            <p className='col-span-5'>{formatearFecha(alumno.fecha_nac)}</p>
          </div>
          <div className='grid grid-cols-6 gap-4 items-center mb-2'>
            <p className=' col-span-1 font-bold text-sm'>Correo:</p>
            <p className='col-span-5'>{alumno.correo}</p>
          </div>
          <div className='grid grid-cols-6 gap-4 items-center mb-2'>
            <p className=' col-span-1 font-bold text-sm'>Celular:</p>
            <p className='col-span-5'>{"+56" + alumno.celular}</p>
          </div>
          <div className='grid grid-cols-6 gap-4 items-center mb-2'>
            <p className=' col-span-1 font-bold text-sm'>Dirección:</p>
            <p className='col-span-5'>{alumno.direccion.calle + " #" + alumno.direccion.numero + ", " + alumno.direccion.comuna + ", " + alumno.direccion.region + "."}</p>
          </div>
          <div className='grid grid-cols-6 gap-4 items-center mb-2'>
            <p className=' col-span-1 font-bold text-sm'>Género:</p>
            <p className='col-span-5'>{alumno.genero === "F" ? "Femenino" : "Masculino"}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default DatosAlumno
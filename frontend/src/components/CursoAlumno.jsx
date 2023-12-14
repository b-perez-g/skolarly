import React from 'react'
import { useAppState } from '../data/dataAlumnoZustand'
import { Avatar } from "@nextui-org/react";

function CursoAlumno() {
    const { curso, companeros, profJefe} = useAppState();

    return (
        <>
            <h2 className='font-bold text-lg'>Curso: </h2>
            <div className='border-2 border-gray-200 rounded-lg p-4'>
                <h3 className='font-bold text-md mb-4'>Información: </h3>
                <div className='grid grid-cols-6 '>
                    <div className="col-span-5">
                        <div className='grid grid-cols-6 gap-4 items-center mb-2'>
                            <p className=' col-span-1 font-bold text-sm'>Curso:</p>
                            <p className='col-span-5'>{`${curso.grado}°${curso.letra}`}</p>
                        </div>
                        <div className='grid grid-cols-6 gap-4 items-center mb-2'>
                            <p className=' col-span-1 font-bold text-sm'>Periodo:</p>
                            <p className='col-span-5'>{curso.periodo}</p>
                        </div>
                        <div className='grid grid-cols-6 gap-4 items-center mb-2'>
                            <p className=' col-span-1 font-bold text-sm'>Profesor jefe:</p>
                            <p className='col-span-5'>{profJefe.nombre.nombres + " " + profJefe.nombre.a_paterno + " " + profJefe.nombre.a_materno}</p>
                        </div>
                        <div className='grid grid-cols-6 gap-4 items-center mb-2'>
                            <p className=' col-span-1 font-bold text-sm'>Cantidad de alumnos:</p>
                            <p className='col-span-5'>{companeros.length}</p>
                        </div>
                    </div>
                </div>


                <h3 className='font-bold text-md mb-4 mt-4'>Integrantes: </h3>
                <div className='rounded-xl border-1 bg-gray-100 p-2'>
                    <ul style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
                        gap: '20px',
                        maxHeight: '600px',  // Ajusta la altura máxima según tus necesidades
                        overflowY: 'auto',   // Agrega desplazamiento vertical si es necesario
                        listStyle: 'none',
                        padding: 0,
                    }}>
                        {companeros.map((companero) => (
                            <li key={companero._id} className='flex flex-items items-center p-1'>
                                <Avatar
                                    isBordered
                                    color={companero.genero === "M" ? "primary" : "danger"}
                                    src={companero.foto_perfil !== "/image/foto-perfil/default.svg" ? companero.foto_perfil : undefined}
                                    name={companero.foto_perfil === "/image/foto-perfil/default.svg" ? companero.nombre.nombres.slice(0, 1) + companero.nombre.a_paterno.slice(0, 1) : undefined}
                                />
                                <p className='ml-4 text-gray-700'>{companero.nombre.nombres + " " + companero.nombre.a_paterno + " " + companero.nombre.a_materno}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default CursoAlumno
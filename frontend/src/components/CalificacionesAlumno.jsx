'use client'

import { useAppState } from '../data/dataAlumnoZustand'
import React, { useEffect, useState } from 'react';
import { disenarCalificaciones, calcularPromedioGeneral } from '@/utils/disenarCalificaciones';

function CalificacionesAlumno() {
  const { calificaciones, alumno } = useAppState();
  const [tablaCalificaciones, setTablaCalificaciones] = useState([]);
  const [promGeneral, setPromGeneral] = useState(0);
  const [situacion, setSituacion] = useState(false);

  useEffect(() => {
    const tabla = disenarCalificaciones(calificaciones);
    const promedioSituacion = calcularPromedioGeneral(tabla);
    setTablaCalificaciones(tabla);
    setPromGeneral(promedioSituacion.promedio);
    setSituacion(promedioSituacion.aprobado);
  }, [calificaciones])

  if (!tablaCalificaciones || tablaCalificaciones.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="mt-5 bg-blue-900 p-5 border-2 border-white rounded-lg mb-5">
        <h2 className="text-3xl font-bold text-blue-50 text-left">{`Calificaciones: ${alumno.nombre.nombres.split(" ")[0]} ${alumno.nombre.a_paterno}`}</h2>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
          <thead className="text-xs text-white uppercase bg-gray-500 border-b border border-gray-400">
            <tr>
              {tablaCalificaciones[0].map((header, index) => (
                <th key={index} scope="col" className={`px-1 py-3 text-center `}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tablaCalificaciones.slice(1).map((fila, index) => (
              <tr key={index} className={`bg-white border-b border-gray-400 text-black`}>
                {fila.map((celda, index) => (
                  <td key={index} className={`px-6 py-1 text-center ${celda < 4 ? "text-red-500 font-bold" :
                      celda >= 4 && celda <= 4.5 ? "text-red-700" :
                        celda > 4.5 && celda <= 5.9 ? "text-blue-800" :
                          celda > 5.9 && celda <= 7 ? "text-blue-500 font-bold" :
                            celda === "-" ? "text-gray-400" : ""} 
                    ${index > tablaCalificaciones[0].length - 3 ? 'bg-gray-100' : ''} 
                    ${index === tablaCalificaciones[0].length - 2 ? 'bg-gray-200 font-bold' : ''} 
                    ${index === 0 || index === 1 ? 'bg-gray-100' : ''}
                    `}>
                    {/^\d+(\.\d+)?$/.test(celda) ? parseFloat(celda.toFixed(1)): celda}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-4 mr-4 flex flex-items items-end justify-end'>
        <small className='text-right mr-2'>Promedio General:</small>
        <p className='font-bold'>{parseFloat(promGeneral.toFixed(1))}</p>
      </div>
      <div className='mt-4 mr-4 flex flex-items items-end justify-end'>
        <small className='text-right mr-2'>Situación:</small>
        <p className='font-bold'>{!situacion ? "Reprobado" : "Aprobado"}</p>
      </div>
    </>

  );
}

export default CalificacionesAlumno
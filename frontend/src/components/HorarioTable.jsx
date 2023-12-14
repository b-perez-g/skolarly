'use client'

import { useAppState } from '../data/dataAlumnoZustand'
import React, { useEffect, useState } from 'react';
import { disenarHorario } from '@/utils/disenarHorario';


const HorarioTable = ({params}) => {
  const { curso, bloquesHorarios, asignaturas, alumno } = useAppState();
  const [tablaHorario, setTablaHorario] = useState([]);

  useEffect(() => {
    const Horario = disenarHorario(curso, bloquesHorarios, asignaturas);
    setTablaHorario(Horario)
  }, [])

  if (!tablaHorario || tablaHorario.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="mt-5 bg-blue-900 p-5 border-2 border-white rounded-lg mb-5">
        <h2 className="text-3xl font-bold text-blue-50 text-left">{`Horario: ${alumno.nombre.nombres.split(" ")[0]} ${alumno.nombre.a_paterno}`}</h2>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
          <thead className="text-xs text-white uppercase bg-gray-500 border-b border border-gray-400">
            <tr>
              {tablaHorario[0].map((header, index) => (
                <th key={index} scope="col" className={`px-6 py-3 text-center ${index < 3 ? 'w-20' : ''}`}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tablaHorario.slice(1).map((fila, index) => (
              <tr key={index} className="bg-white border-b border-gray-400">
                {fila.map((celda, index) => (
                  <td key={index} className={`px-6 py-4 text-center  ${index < 3 ? 'w-20 bg-gray-500 text-white' : ''} ${index%2!==0 && index>2? "bg-gray-200 text-black" :"text-black"}`}>
                    {celda}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </>
  );
};

export default HorarioTable;

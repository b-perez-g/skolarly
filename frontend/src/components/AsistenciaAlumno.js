'use client'

import { useAppState } from '../data/dataAlumnoZustand'
import React, { useEffect, useState } from 'react';
import { Avatar, Pagination } from "@nextui-org/react";
import { formatearFecha } from '@/utils/formatearFecha';
import {Chip} from "@nextui-org/react";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";


function AsistenciaAlumno() {
  const { asistencia, alumno } = useAppState();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = asistencia.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
    <div className="mt-5 bg-blue-900 p-5 border-2 border-white rounded-lg mb-5">
        <h2 className="text-3xl font-bold text-blue-50 text-left">{`Horario: ${alumno.nombre.nombres.split(" ")[0]} ${alumno.nombre.a_paterno}`}</h2>
      </div>
      
    <div className='flex flex-items grid grid-cols-1 mx-auto w-[60%]'>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-black text-center">
          <thead className="text-xs text-white uppercase bg-gray-500 border-b border border-gray-400">
            <tr>
              <th scope="col" className={`px-1 py-3 text-center w-[25%]`}>
                Fecha
              </th>
              <th scope="col" className={`px-1 py-3 text-center w-[25%]`}>
                Asistencia
              </th>
              <th scope="col" className={`px-1 py-3 text-center w-[50%]`}>
                Profesor
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((data) => (
              <tr key={data.asistencia._id} className="bg-white border-b border-gray-400">
                <td className={`px-1 py-1 text-center`}>
                  {formatearFecha(data.asistencia.createdAt)}
                </td>
                <td className={`px-1 py-1 text-center`}>
                  {data.asistencia.asiste ? <Chip
                    endContent={<FaCheckCircle size={18} />}
                    variant="bordered"
                    color="success"
                  >
                    Asiste
                  </Chip>
                    :
                    <Chip
                      endContent={<FaCircleXmark size={18} />}
                      variant="bordered"
                      color="danger"
                    >
                      No asiste
                    </Chip>
                  }
                </td>
                <td className={`px-1 py-2 items-center`}>
                  <div className='flex flex-items gap-4 mx-auto'>
                    <Avatar
                      isBordered
                      className='h-[20px] w-[20px]'
                      color={data.profesor.genero === "M" ? "primary" : "danger"}
                      src={data.profesor.foto_perfil !== "/image/foto-perfil/default.svg" ? data.profesor.foto_perfil : undefined}
                      name={data.profesor.foto_perfil === "/image/foto-perfil/default.svg" ? data.profesor.nombre.nombres.slice(0, 1) + data.profesor.nombre.a_paterno.slice(0, 1) : undefined}
                    />
                    <p>
                      {`${data.profesor.nombre.nombres} ${data.profesor.nombre.a_paterno} ${data.profesor.nombre.a_materno}`}
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>



      </div>
      <Pagination
        total={Math.ceil(asistencia.length / itemsPerPage)}
        page={currentPage}
        onChange={paginate}
        className="justify-self-center mt-4"
        color="primary"
      />
    </div>
    </>
  );
}

export default AsistenciaAlumno;

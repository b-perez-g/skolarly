import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Avatar, Image } from "@nextui-org/react";
import { formatearFechaTexto } from '@/utils/formatearFecha';
import { formatearHora } from '@/utils/formatearHora';

function AnotacionesNegativas({ anotaciones }) {

  const aNegativas = anotaciones.filter(elem => elem.anotacion.tipo === "Negativa");

  return (
    <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2'>
      {aNegativas.map((elem) => (
        <div key={elem.anotacion._id} className='p-4 justify-center'> 
          <Card>
          <div className={` w-full h-[15px] ${elem.anotacion.tipo==="Negativa" ? "bg-danger":"bg-success"}`}></div>
            <CardHeader className="justify-between">
            <div className="flex gap-5">
                <Avatar isBordered color={elem.profesor.genero === "M" ? 'primary' : 'danger'} radius="full" size="md" src={elem.profesor.foto_perfil} />
                <div className="flex flex-col gap-1 items-start justify-center">
                  <h4 className="text-small font-semibold leading-none text-default-600">{`Prof. ${elem.profesor.nombre.nombres} ${elem.profesor.nombre.a_paterno} ${elem.profesor.nombre.a_materno}`}</h4>
                </div>
              </div>
            </CardHeader>
            <CardBody className="px-3 py-0 text-md text-default-700">
              <span className='text-sm text-default-500'>Tipo:</span>
              <p>{elem.anotacion.tipo}</p>
              <span className='text-sm text-default-500 mt-4'>Descripción:</span>
              <p>{elem.anotacion.contenido}</p>
            </CardBody>
            <CardFooter className=" flex gap-3 justify-right">
                <p className=" text-default-500 text-sm">{`${formatearFechaTexto(elem.anotacion.createdAt)} a las ${formatearHora(elem.anotacion.createdAt)}`}</p>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default AnotacionesNegativas;

import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { getUsersByRutApoderado } from '@/utils/obtenerUsuario';
import Link from 'next/link';

function AlumnosApoderado({ user, tipoUser }) {
    const [alumnos, setAlumnos] = useState([]);

    useEffect(() => {
        const getAlumnos = async (rutUser) => {
            const alumnos = await getUsersByRutApoderado(rutUser);
            console.log("alumnos", alumnos);
            await setAlumnos(alumnos);
        }
        getAlumnos(user.rut);
    }, [])


    return (
        <div>
            <h2 className='font-bold text-lg'>Alumnos a mi cargo: </h2>
            <div className='grid grid-cols-4 gap-4 border-2 border-gray-200 rounded-lg p-4'>
                {alumnos.map((alumno) => (
                    <Link key={alumno.datos._id} href={`/${tipoUser}/alumno/${alumno.datos._id}`}>
                        <Card className="col-span py-4">
                            <CardHeader className="overflow-visible py-2">
                                <Image
                                    alt="Card background"
                                    className="object-cover rounded-xl"
                                    src={alumno.datos.foto_perfil}
                                    width={270}
                                />

                            </CardHeader>
                            <CardBody className="pb-0 pt-2 px-4 flex-col items-start">

                                <h4 className="font-bold text-md">{alumno.datos.nombre.nombres.split(" ")[0] + " " + alumno.datos.nombre.a_paterno}</h4>
                                <p className="text-tiny uppercase font-bold">{"Curso: " + alumno.curso.grado + "°" + alumno.curso.letra}</p>


                            </CardBody>
                        </Card>
                    </Link>
                ))}

            </div>
        </div>
    )
}

export default AlumnosApoderado
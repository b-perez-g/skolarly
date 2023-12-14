'use client';

import React, { useState, useEffect } from 'react';
import DatosUsuario from '@/components/DatosApoderado';
import FotoPerfil from '@/components/FotoPerfil';
import { consultarCookie } from '@/utils/validarLogin';
import { getUser } from '@/utils/obtenerUsuario';
import LoadingGif from '@/components/LoadingGIF';
import AlumnosApoderado from '@/components/AlumnosApoderado';



function Pagina({ params }) {
    const [user, setUser] = useState({});

    useEffect(() => {
        const usuarioLogueado = async () => {
            try {
                const datosCookie = await consultarCookie();
                const usuario = await getUser(datosCookie.ID);
                setUser(usuario);
            } catch (error) {
                console.error('Error al obtener los datos del usuario:', error);
            }
        };
        usuarioLogueado();
    }, []);

    return (
        <>
            <div className="bg-blue-900 p-5 border-2 border-white rounded-lg mb-5">
                <h2 className="text-3xl font-bold text-blue-50 text-left">Mi perfil</h2>
            </div>
            {user && Object.keys(user).length > 0 ? (
                <>
                    <div className='text-center flex flex-col items-center'>
                        <FotoPerfil user={user} tipoUser={params.tipo_usuario} />
                        <h1 className='text-3xl font-bold mt-4 mb-4'>{`${user.nombre.nombres} ${user.nombre.a_paterno} ${user.nombre.a_materno}`}</h1>
                    </div>
                    <div className='mb-8'>
                    <DatosUsuario user={user} tipoUser={params.tipo_usuario} />
                    </div>
                    <div className='mb-8'>
                    <AlumnosApoderado user={user} tipoUser={params.tipo_usuario} />
                    </div>
                </>
            ) : (
                <LoadingGif className="mx-auto" />
            )}
        </>
    );
}

export default Pagina;

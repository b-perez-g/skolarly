'use client'
import React, {useState, useEffect} from 'react'
import { consultarCookie } from '@/utils/validarLogin';
import { obtenerUsuario } from '@/utils/obtenerUsuario';

function DatosUsuario({ tipoUser }) {
    const [user, setUser] = useState({});

    useEffect(() => {
        const usuarioLogueado = async () => {
          const datosCookie = await consultarCookie();
          const usuario = await obtenerUsuario(datosCookie.ID);
          await setUser(usuario)
        }
        usuarioLogueado();
      }, [])
    
    
      useEffect(() => {}, []);

    return (
        <div>{user._id}</div>
    )
}

export default DatosUsuario
'use client'

import LoadingGif from "@/components/LoadingGIF";
import RestringirAcceso from "@/components/RestringirAcceso";
import React, {useEffect, useState} from "react";
import { consultarCookie } from "@/utils/validarLogin";

export default function page({ params }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usuarioLogueado = async () => {
      const datosCookie = await consultarCookie();
      setUser(datosCookie);
    }
    usuarioLogueado();
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 250);
      return () => clearTimeout(timeoutId);
  }, [user]);

  if(loading){
    return(<LoadingGif />)
  }
    
  if(user.TIPO){
    return (
        <div className='w-[80%] m-auto mb-5'>
            <h2>Página principal</h2>
            <p>{`ID: ${user.ID}`}</p>
            <p>{`RUT: ${user.RUT}`}</p>
            <p>{`TIPO: ${user.TIPO}`}</p>
        </div>
    )
  }
  return (<RestringirAcceso />)
  
}
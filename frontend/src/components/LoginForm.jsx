'use client'

//React
import React, { useEffect, useState } from "react";
//Next
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation'

//NextUI
import { Input, Button } from "@nextui-org/react";
//Utils
import { toggleVisibility, handleRut, handleInputPassword } from "@/utils/handle";
import { validarLogin, consultarCookie } from "@/utils/validarLogin";
import { Spinner } from "@nextui-org/react";

import LoadingGif from "./LoadingGIF";



function LoginForm() {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [rut, setRut] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [verificando, setVerificando] = useState(false);
  const [lblError, setLblError] = useState(false);

  useEffect(() => {
    const usuarioLogueado = async () => {
      const datosCookie = await consultarCookie();
      setUser(datosCookie);
      if(datosCookie.RUT){
        router.push(`/${datosCookie.TIPO}/${datosCookie.TIPO==="Apoderado" ?"perfil":"chat"}`);
      }else{
        setLoading(false);
      }
    }
    usuarioLogueado();
  }, [])


  useEffect(() => {}, [loading]);

  if (!loading) {
    return (
      <form
      onSubmit={(e) => {
        e.preventDefault();
        setLblError(false);
        setVerificando(true);
      
        validarLogin(rut, inputPassword).then((autenticacion) => {
          if (autenticacion.validado) {
            router.push(`/${autenticacion.tipo_usuario}/${autenticacion.tipo_usuario==="Apoderado" ? "perfil": "chat"}`);
          } else {
            const timeoutId = setTimeout(() => {
              setVerificando(false);
              setLblError(true);
            }, 700);
            return () => clearTimeout(timeoutId);
          }
        });
      }}
        className="mt-5 lg:col-start-2 lg:col-end-4 lg:flex lg:justify-center lg:items-center" >
        <div className="w-[80%] m-auto p-2 lg:w-full">
          <h1 className="text-center text-3xl font-bold text-blue-800" >Hola, ¡Bienvenido a Skolarly!</h1>

          <Input
            className="mb-5 mt-5"
            type="text"
            name='Rut'
            variant='underlined'
            label="Rut"
            value={rut}
            placeholder="Ingresa tu Rut (xxxxxxxx-x)"
            onChange={(e) => {
              setRut(handleRut(e));
              setLblError(false);
            }
            }
          />

          <Input
            className="w-full"
            name="Contrasena"
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
            variant="underlined"
            value={inputPassword}
            onChange={(e) => {
              const result = handleInputPassword(e);
              setLblError(false);
              if (result !== null) setInputPassword(result);
            }}
            endContent={
              <button className="focus:outline-none" type="button" onClick={() => setIsVisible(toggleVisibility(isVisible))}>
                {isVisible ? (
                  <Image src="/image/icons/ver_contrasena.svg" alt="ver contraseña" width={20} height={20}></Image>
                ) : (
                  <Image src="/image/icons/ocultar_contrasena.svg" alt="ocultar contraseña" width={20} height={20}></Image>
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
          />

          <div className="text-center text-primary-800 mb-8 mt-2">
            <Link href="/">
              <small >¿Olvidaste tu contraseña?</small>
            </Link>
          </div>
          <div>
            <Button type="submit" className="bg-blue-900 text-white w-full mb-4">
              Ingresar
            </Button>
            {verificando ? <Spinner color="primary" className="w-full mb-4" /> : null}
            {lblError ? <p className="text-red-500 text-center">Credenciales incorrectas.</p> : null}
          </div>
        </div>
      </form>
    )
  }


  return (<div className="mt-5 lg:col-start-2 lg:col-end-4 lg:flex lg:justify-center lg:items-center">
    <LoadingGif />
  </div>)
}

export default LoginForm

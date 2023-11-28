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

import LoadingGif from "./LoadingGIF";



function LoginForm() {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [rut, setRut] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  useEffect(() => {
    const usuarioLogueado = async () => {
      const datosCookie = await consultarCookie();
      setUser(datosCookie);
    }
    usuarioLogueado();
  }, [])

  useEffect(() => {
    if (user.RUT) {
      router.push('/skolarly');
    } else {
      setLoading(false);
    }
  }, [user]);

  if (!loading) {
    return (
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const autenticado = await validarLogin(rut, inputPassword);
          if (autenticado) {
            router.push('/skolarly');
          }
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
            onChange={(e) =>
              setRut(handleRut(e))
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
          <Button type="submit" className="bg-blue-900 text-white w-full mb-4">
            Ingresar
          </Button>

        </div>
      </form>
    )
  }


  return (<div className="mt-5 lg:col-start-2 lg:col-end-4 lg:flex lg:justify-center lg:items-center">
    <LoadingGif />
  </div>)
}

export default LoginForm

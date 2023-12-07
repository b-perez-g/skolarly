'use client'

import LoadingGif from "@/components/LoadingGIF";
import { solicitarEscuela } from "@/utils/solicitarEscuela";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import { Image } from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/react";
import {Divider} from "@nextui-org/react";

export default function page({ params }) {
  const [loading, setLoading] = useState(true);
  const [escuela, setEscuela] = useState({});
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const funcion = async () => {
      const result = await solicitarEscuela();
      setEscuela(result);
    }
    funcion();
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 150);
    return () => clearTimeout(timeoutId);
  }, []);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? escuela.carrusel.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === escuela.carrusel.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };


  if (loading) {
    return (<LoadingGif />)
  }

  if (params.tipo_usuario) {
    return (
      <>
        <div className="bg-blue-900 p-5 grid grid-cols-10 gap-4 border-2 border-white rounded-lg mb-5">
          <h2 className=" col-span-9 text-3xl font-bold text-blue-50 text-left">{escuela.nombre}</h2>
          <img className="col-span-1 w-[100px]" src={escuela.ruta_logo} />
        </div >
        <Image
          isZoomed
          width={5000}
          alt=""
          src={escuela.portada}
        />
        <div>
          <h2 className="text-2xl font-bold mt-5">Nosotros</h2>
          <p className="mt-5">{escuela.descripcion}</p>
          <p className="mb-5 mt-5">{escuela.acerca_de[0].descripcion}</p>

        </div>

        <Divider orientation="horizontal" />

        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-4 xl:grid-cols-3 xl:gap-4 mt-5">
          <Card className="mb-5">
            <CardBody className="bg-blue-200">
              <h2 className="text-xl font-bold">Misión</h2>
              <p className="text-sm">{escuela.acerca_de[0].mision}</p>
            </CardBody>
          </Card>
          <Card className="mb-5">
            <CardBody className="bg-blue-200">
            <h2 className="text-xl font-bold">Visión</h2>
              <p className="text-sm">{escuela.acerca_de[0].vision}</p>
            </CardBody>
          </Card>
          <Card className="mb-5">
            <CardBody className="bg-blue-200 ">
            <h2 className="text-xl font-bold">Valores</h2>
              <p className="text-sm">{escuela.acerca_de[0].valores}</p>
            </CardBody>
          </Card>
        </div>

        <Divider orientation="horizontal" />
        
        <div className='max-w-[1400px] h-[780px] w-full m-auto py-16 px-4 relative group'>
          <div
            style={{ backgroundImage: `url(${escuela.carrusel[currentIndex].ruta})` }}
            className='w-full h-full rounded-2xl bg-center bg-cover duration-500'
          ></div>
          {/* Left Arrow */}
          <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
            <BsChevronCompactLeft onClick={prevSlide} size={30} />
          </div>
          {/* Right Arrow */}
          <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
            <BsChevronCompactRight onClick={nextSlide} size={30} />
          </div>
          <div className='flex top-4 justify-center py-2'>
            {escuela.carrusel.map((slide, slideIndex) => (
              <div
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className='text-2xl cursor-pointer'
              >
                <RxDotFilled />
              </div>
            ))}
          </div>
        </div>
      </>
    )

  }
}
'use client'
//MdOutlineAnalytics,
import { cerrarSesion } from "@/utils/validarLogin";
import React from "react";
import { Link } from "@nextui-org/react";

//Iconos
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import { MdOutlineLogout, MdOutlineMail } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { BiMessageSquareDots } from "react-icons/bi";
import { AiOutlineSchedule } from "react-icons/ai";
import { SiGoogleclassroom } from "react-icons/si";
import { LuCalendarDays } from "react-icons/lu";
import { RiAdvertisementLine, RiBook2Line, RiSchoolLine } from "react-icons/ri";

function SideNavbar({tipo_usuario}) {
  return (
    <div>
      <Disclosure as="nav">
        <Disclosure.Button className=" absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-800 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
          <GiHamburgerMenu
            className="block lg:hidden h-6 w-6"
            aria-hidden="true"
          />
        </Disclosure.Button>
        <div className="p-6 w-60 h-screen bg-blue-950 z-20 fixed top-0 -left-60 lg:left-0 lg:w-60  peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
          <div className="flex flex-col justify-start item-center">
            <Link href={`/${tipo_usuario}/perfil`}>
              <div className=" text-center w-full">
                <img className="w-24 mx-auto mb-2" src="/image/skolarly/logo_icon.svg" />
                <img className="w-24 mx-auto" src="/image/skolarly/logo_text.svg" />
              </div>
            </Link>

              <div className=" my-4 border-b border-blue-900 pb-4">

                <Link href="#">
                  <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                    <CgProfile className="text-2xl text-blue-400 group-hover:text-white " />
                    <h3 className="text-base text-blue-100 group-hover:text-white font-semibold ">
                      Perfil
                    </h3>
                  </div>
                </Link>

                <Link href="#">
                  <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                    <SiGoogleclassroom className="text-2xl text-blue-400 group-hover:text-white " />
                    <h3 className="text-base text-blue-100 group-hover:text-white font-semibold ">
                      Mis cursos
                    </h3>
                  </div>
                </Link>

                <Link href="#">
                  <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                    <AiOutlineSchedule className="text-2xl text-blue-400 group-hover:text-white " />
                    <h3 className="text-base text-blue-100 group-hover:text-white font-semibold ">
                      Horario
                    </h3>
                  </div>
                </Link>

                <Link href="#">
                  <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                    <LuCalendarDays className="text-2xl text-blue-400 group-hover:text-white " />
                    <h3 className="text-base text-blue-100 group-hover:text-white font-semibold ">
                      Calendario
                    </h3>
                  </div>
                </Link>

                <Link href={`/${tipo_usuario}/chat`}>
                  <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                    <BiMessageSquareDots className="text-2xl text-blue-400 group-hover:text-white " />
                    <h3 className="text-base text-blue-100 group-hover:text-white font-semibold ">
                      Chat
                    </h3>
                  </div>
                </Link>

                <Link href="#">
                  <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                    <MdOutlineMail className="text-2xl text-blue-400 group-hover:text-white " />
                    <h3 className="text-base text-blue-100 group-hover:text-white font-semibold ">
                      Comunicaciones
                    </h3>
                  </div>
                </Link>

                <Link href="#">
                  <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                    <RiAdvertisementLine className="text-2xl text-blue-400 group-hover:text-white " />
                    <h3 className="text-base text-blue-100 group-hover:text-white font-semibold ">
                      Anuncios
                    </h3>
                  </div>
                </Link>

                <Link href="#">
                  <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                    <RiBook2Line className="text-2xl text-blue-400 group-hover:text-white " />
                    <h3 className="text-base text-blue-100 group-hover:text-white font-semibold ">
                      Libro de clases
                    </h3>
                  </div>
                </Link>

                <Link href={`/${tipo_usuario}/mi-escuela`}>
                  <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                    <RiSchoolLine className="text-2xl text-blue-400 group-hover:text-white " />
                    <h3 className="text-base text-blue-100 group-hover:text-white font-semibold ">
                      Mi escuela
                    </h3>
                  </div>
                </Link>

              </div>

              {/* logout */}
            <Link href="/">
              <div className=" my-4" onClick={() => cerrarSesion()}>
                <div className="flex mb-2 justify-start items-center gap-4 pl-5 border border-blue-400  hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                  <MdOutlineLogout className="text-2xl text-blue-400 group-hover:text-white " />
                  <h3 className="text-base text-blue-100 group-hover:text-white font-semibold ">
                    Cerrar sesión
                  </h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </Disclosure >
    </div >
  );
}

export default SideNavbar;
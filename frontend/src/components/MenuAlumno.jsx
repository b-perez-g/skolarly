'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import {
  Breadcrumbs,
  BreadcrumbItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { FaChevronDown } from 'react-icons/fa6';

function MenuAlumno({ tipoUser, alumnoID }) {
  const [currentPage, setCurrentPage] = useState('music');
  const router = useRouter();

  return (
    <div className="flex justify-center">
      <Breadcrumbs
        separator="|"
        color="primary"
        itemClasses={{
          item: 'px-2',
          separator: 'px-0',
        }}
      >
        {/* Use Link for all BreadcrumbItems */}
        <BreadcrumbItem >
          <Link href={`/${tipoUser}/alumno/${alumnoID}`}>
            Mi estudiante
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link href={`/${tipoUser}/alumno/${alumnoID}/horario`}>
            Horario
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link href={`/${tipoUser}/alumno/${alumnoID}/estadisticas`}>
            Estadísticas
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem
          classNames={{
            item: 'px-0',
          }}
        >
          <Dropdown>
            <DropdownTrigger>
              <Button
                className="h-6 pr-2 text-small text-primary"
                endContent={<FaChevronDown className="text-default-500 text-primary" />}
                radius="full"
                size="sm"
                variant="light"
              >
                Libro de clases
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Routes">
              <DropdownItem>
                <Link href={`/${tipoUser}/alumno/${alumnoID}/calificaciones`}>
                  Calificaciones
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link href={`/${tipoUser}/alumno/${alumnoID}/asistencia`}>
                  Asistencia
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link href={`/${tipoUser}/alumno/${alumnoID}/anotaciones`}>
                  Anotaciones
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </BreadcrumbItem>
      </Breadcrumbs>
    </div>
  );
}

export default MenuAlumno;

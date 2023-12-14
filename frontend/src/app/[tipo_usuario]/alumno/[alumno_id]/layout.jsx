'use client'
import MenuAlumno from "@/components/MenuAlumno";
import React, { useEffect } from 'react';
import { getUser } from '@/utils/obtenerUsuario';
import { getDataAlumno } from "@/utils/getDataAlumno";
import LoadingGif from '@/components/LoadingGIF';

import { useAppState } from "@/data/dataAlumnoZustand";

export default function RootLayout({ children, params }) {
  const { alumno, curso, asignaturas, calificaciones, asistencia, anotaciones, companeros, apoderado, profJefe, bloquesHorarios,
    setAlumno, setCurso, setAsignaturas, setCalificaciones, setAsistencia, setAnotaciones, setCompaneros, setApoderado, setProfJefe, setBloquesHorarios } = useAppState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setAlumno({});
        setCurso({});
        setAsignaturas([]);
        setCalificaciones();
        setAsistencia([]);
        setAnotaciones([]);
        setCompaneros([]);
        setApoderado({});
        setProfJefe({});
        setBloquesHorarios([]);

        const Alumno = await getUser(params.alumno_id);
        const Datos = await getDataAlumno(Alumno.curso_id, params.alumno_id, Alumno.rut_apoderado);
        const Curso = Datos[0];
        const Asignaturas = Datos[1];
        const Calificaciones = Datos[2];
        const Asistencia = Datos[3];
        const Anotaciones = Datos[4];
        const Companeros = Datos[5];
        const Apoderado = Datos[6];
        const ProfJefe = Datos[7];
        const BloquesHorarios = Datos[8];

        setAlumno(Alumno);
        setCurso(Curso);
        setAsignaturas(Asignaturas);
        setCalificaciones(Calificaciones);
        setAsistencia(Asistencia);
        setAnotaciones(Anotaciones);
        setCompaneros(Companeros);
        setApoderado(Apoderado);
        setProfJefe(ProfJefe);
        setBloquesHorarios(BloquesHorarios);
        
      } catch (error) {
        console.error("Error al obtener información:", error);
      }
    };

    fetchData();
  }, [params.alumno_id, setAlumno, setCurso, setAsignaturas, setCalificaciones, setAsistencia, setAnotaciones, setCompaneros, setApoderado, setBloquesHorarios]);

  return (
    <div>
      {alumno && Object.keys(alumno).length > 0 && curso && Object.keys(curso).length > 0 && asignaturas && asignaturas.length > 0 && calificaciones && calificaciones.length > 0
        && asistencia && asistencia.length > 0 && anotaciones && anotaciones.length > 0 && companeros && companeros.length > 0 && apoderado && Object.keys(apoderado).length > 0
        && profJefe && Object.keys(profJefe).length > 0 && bloquesHorarios && bloquesHorarios.length > 0
        ? (<>
          <MenuAlumno tipoUser={params.tipo_usuario} alumnoID={params.alumno_id} />
          {children}
        </>
        ) : (
          <LoadingGif className="mx-auto" />
        )}
    </div>
  );
}
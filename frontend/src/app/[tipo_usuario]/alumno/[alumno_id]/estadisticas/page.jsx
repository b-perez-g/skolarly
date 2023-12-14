'use client'

import React, { useState } from 'react'
import SelectorGraficos from '@/components/SelectorGraficos';
import { useAppState } from '../../../../../data/dataAlumnoZustand'
import CalifXasign from '@/components/Graficos/CalifXasign';
import PromXtime from '@/components/Graficos/PromXtime';
import GrafAsistencia from '@/components/Graficos/GrafAsistencia';


function page() {
  const [tipo, setTipo] = useState("califXasign");
  const { alumno } = useAppState();

  return (
    <div>
      <div className="mt-5 bg-blue-900 p-5 border-2 border-white rounded-lg mb-5">
        <h2 className="text-3xl font-bold text-blue-50 text-left">{`Gráficos y estadísticas: ${alumno.nombre.nombres.split(" ")[0]} ${alumno.nombre.a_paterno}`}</h2>
      </div>
      <SelectorGraficos tipo={tipo} setTipo={setTipo} />
      {
        tipo === "califXasign" ?
          <CalifXasign />
          :
          tipo === "promXtime" ?
            <PromXtime />
            :
            tipo === "asistencia" ?
            <GrafAsistencia />
            :
            null
      }
    </div>
  )
}

export default page
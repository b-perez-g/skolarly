'use client'

import React, { useState } from 'react'
import SelectorAnotaciones from '@/components/SelectorAnotaciones'
import { useAppState } from '../../../../../data/dataAlumnoZustand'
import AllAnotaciones from '@/components/AllAnotaciones'
import AnotacionesNegativas from '@/components/AnotacionesNegativas'
import AnotacionesPositivas from '@/components/AnotacionesPositivas'

function page() {
  const [tipo, setTipo] = useState("todas");
  const { alumno, anotaciones } = useAppState();

  return (
    <div>
      <div className="mt-5 bg-blue-900 p-5 border-2 border-white rounded-lg mb-5">
        <h2 className="text-3xl font-bold text-blue-50 text-left">{`Anotaciones: ${alumno.nombre.nombres.split(" ")[0]} ${alumno.nombre.a_paterno}`}</h2>
      </div>
      <SelectorAnotaciones tipo={tipo} setTipo={setTipo} />
      {
        tipo === "todas" ?
          <AllAnotaciones anotaciones={anotaciones} />
          :
          tipo === "positivas" ?
            <AnotacionesPositivas anotaciones={anotaciones} />
            :
            <AnotacionesNegativas anotaciones={anotaciones} />
      }
    </div>
  )
}

export default page
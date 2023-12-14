'use client'

import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useAppState } from "@/data/dataAlumnoZustand";
import { gr_calificacionesAsignatura, comboBox } from '@/utils/graficosData/gr_calificacionesAsignatura';
import { Select, SelectItem } from "@nextui-org/react";
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const options = {
  responsive: true,
  scales: {
    x: {
      title: {
        display: true,
        text: 'Calificaciones',
        color: "#9A9B9E",
        font: {
          size: 14
        }
      }
    },
    y: {
      title: {
        display: true,
        text: 'Nota',
        color: "#9A9B9E",
        font: {
          size: 14
        }
      }
    }
  },
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: ''
    },
    datalabels: {
      anchor: 'end',
      align: 'top',
      formatter: (value, context) => value,
      weight: 'bold',
    },
   
  },
};



export function CalifXasign() {
  const { calificaciones } = useAppState();
  const [data, setData] = useState({});


  //gr_calificacionesAsignatura(calificaciones, calificaciones);
  const cb = comboBox(calificaciones);

  const handleSelectChange = (e) => {
    const id_asignatura = e.target.value;
    const dataGrafico = gr_calificacionesAsignatura(calificaciones, id_asignatura)
    setData(dataGrafico);
  };


  return (
    <>
      <h1 className='p-4 text-left text-xl text-blue-800 font-bold'>Calificaciones por asignatura:</h1>
      <Select
        items={cb}
        label="Asignaturas"
        placeholder="Selecciona una asignatura"
        className="max-w-xs  text-center"
        searchable
        onChange={(e) => handleSelectChange(e)}
      >
        {(asignatura) => <SelectItem key={asignatura.id}>{asignatura.nombre}</SelectItem>}
      </Select>
      <div className='w-[70%] mx-auto'>
        {Object.keys(data).length > 0 ?
          <Bar options={options} data={data} />
          : null}
      </div>
    </>
  );
}

export default CalifXasign
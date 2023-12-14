import React, { useEffect, useRef } from 'react';
import { useAppState } from '@/data/dataAlumnoZustand';
import Chart from 'chart.js/auto';

function GrafAsistencia() {
  const { asistencia } = useAppState();
  const chartRef = useRef(null);

  useEffect(() => {
    let asisteCount = 0;
    let noAsisteCount = 0;

    for (const data of asistencia) {
      if (data.asistencia.asiste) {
        asisteCount++;
      } else {
        noAsisteCount++;
      }
    }

    const total = asisteCount + noAsisteCount;

    const asistePercentage = ((asisteCount / total) * 100).toFixed(2);
    const noAsistePercentage = ((noAsisteCount / total) * 100).toFixed(2);

    const backgroundColors = ['rgb(75, 192, 192)', 'rgb(255, 99, 132)'];

    const ctx = chartRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: [
          `Asiste (${asistePercentage}%)`,
          `No asiste (${noAsistePercentage}%)`,
        ],
        datasets: [
          {
            data: [asisteCount, noAsisteCount],
            backgroundColor: backgroundColors,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
          },
        },
        tooltips: {
          enabled: false,
        },
        elements: {
          center: {
            text: '',
          },
        },
      },
    });
  }, [asistencia]);

  return (
    <div>
      <h1 className='p-4 text-left text-xl text-blue-800 font-bold'>Porcentaje de asistencia:</h1>
      {asistencia.length > 0 ? (
        <div className='w-[500px] mx-auto'>
          <canvas ref={chartRef}></canvas>
        </div>
      ) : (
        <p>No hay calificaciones disponibles.</p>
      )}
    </div>
  );
}

export default GrafAsistencia;

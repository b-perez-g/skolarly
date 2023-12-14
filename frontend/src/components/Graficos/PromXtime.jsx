'use client'

import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { gr_promedioTiempo } from '@/utils/graficosData/gr_promedioTiempo';
import { useAppState } from '@/data/dataAlumnoZustand';
import { disenarCalificaciones, calcularPromedioGeneral } from '@/utils/disenarCalificaciones';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);




const PromXtime = () => {
    const { calificaciones } = useAppState();
    const [data, setData] = useState({});

    useEffect(() => {
        const notas = gr_promedioTiempo(calificaciones);
        const tabla = disenarCalificaciones(calificaciones);
        const promedio = parseFloat(calcularPromedioGeneral(tabla).promedio.toFixed(1));
        notas[1][notas[1].length - 2] = promedio + 0.02;
        notas[1][notas[1].length - 1] = promedio;
        const promedioLinea = Array(notas[1].length).fill(promedio);
        const etiquetas = promedioLinea.map((valor, index) => (index === parseInt(promedioLinea.length / 2) ? valor : null));
        const data = {
            labels: notas[0],
            datasets: [

                {
                    label: 'Línea de promedio acumulado',
                    data: promedioLinea,
                    borderColor: 'rgba(0, 0, 0, 1)',
                    backgroundColor: 'rgba(0, 0, 0, 1)',
                    fill: false,
                    pointRadius: 0,
                    pointStyle: 'none',
                    datalabels: {
                        display: true,
                        anchor: 'end', // Muestra la etiqueta solo al final de la línea
                        align: 'end', // Ajusta la alineación de la etiqueta
                        formatter: (value, context) => etiquetas[context.dataIndex], // Utiliza el valor de etiquetas
                    },
                },
                {
                    label: 'Promedio acumulado',
                    data: notas[1],
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    datalabels: {
                        display: false,
                    }


                }

            ],
        };
        setData(data);
    }, [])

    const options = {
        responsive: true,
        scales: {
            x: {
            title: {
                display:true,
                text:'Fecha',
                color: "#9A9B9E",
                font: {
                    size: 14
                }
            }
            },
            y: {
                title: {
                    display:true,
                    text:'Promedio',
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
                display: false,
                text: 'Chart.js Line Chart',
            },
        },

    };

    return (
        <div>
            <h1 className='p-4 text-left text-xl text-blue-800 font-bold'>Evolución del promedio:</h1>
            {Object.keys(data).length > 0 ? (
                <div className='w-[70%] mx-auto'>
                    <Line options={options} data={data} />
                </div>
            ) : (
                <p>No hay calificaciones disponibles.</p>
            )}
        </div>
    );
};

export default PromXtime;

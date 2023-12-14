'use client'

import React from 'react'
import { Tabs, Tab } from "@nextui-org/react";
import { FaTableTennisPaddleBall } from "react-icons/fa6";

function SelectorGraficos({tipo, setTipo}) {
    
    return (
            <div className="flex justify-center mb-4">
                <Tabs aria-label="Options" color="primary" variant="bordered" selectedKey={tipo}
                    onSelectionChange={setTipo}>
                    <Tab
                        key="califXasign"
                        title={
                            <div className="flex items-center space-x-2">
                                <FaTableTennisPaddleBall />
                                <span>Calificaciones</span>
                            </div>
                        }
                        onClick={() => setTipo("califXasign")}
                    />
                    <Tab
                        key="promXtime"
                        title={
                            <div className="flex items-center space-x-2">
                                <FaTableTennisPaddleBall />
                                <span>Promedio</span>
                            </div>
                        }
                        onClick={() => setTipo("promXtime")}
                    />
                     <Tab
                        key="asistencia"
                        title={
                            <div className="flex items-center space-x-2">
                                <FaTableTennisPaddleBall />
                                <span>Asistencia</span>
                            </div>
                        }
                        onClick={() => setTipo("asistencia")}
                    />
                </Tabs>
            </div>
    );
}

export default SelectorGraficos;

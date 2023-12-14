'use client'

import React from 'react'
import { Tabs, Tab } from "@nextui-org/react";
import { FaTableTennisPaddleBall } from "react-icons/fa6";

function SelectorAnotaciones({tipo, setTipo}) {
    
    return (
        <>
            <div className="flex justify-center">
                <Tabs aria-label="Options" color={tipo === "todas" ? "primary" : tipo === "positivas" ? "success" : "danger"} variant="bordered" selectedKey={tipo}
                    onSelectionChange={setTipo}>
                    <Tab
                        key="todas"
                        title={
                            <div className="flex items-center space-x-2">
                                <FaTableTennisPaddleBall />
                                <span>Todas</span>
                            </div>
                        }
                        onClick={() => setTipo("todas")}
                    />
                    <Tab
                        key="positivas"
                        title={
                            <div className="flex items-center space-x-2">
                                <FaTableTennisPaddleBall />
                                <span>Positivas</span>
                            </div>
                        }
                        onClick={() => setTipo("positivas")}
                    />
                    <Tab
                        key="negativas"
                        title={
                            <div className="flex items-center space-x-2">
                                <FaTableTennisPaddleBall />
                                <span>Negativas</span>
                            </div>
                        }
                        onClick={() => setTipo("negativas")}
                    />
                </Tabs>
            </div>
        </>
    );
}

export default SelectorAnotaciones;

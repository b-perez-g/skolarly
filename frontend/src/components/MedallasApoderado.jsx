import React from 'react'
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { Progress } from "@nextui-org/react";

function MedallasApoderado() {
    return (
        <>
            <div className="mt-5 bg-blue-900 p-5 border-2 border-white rounded-lg mb-5">
                <h2 className="text-3xl font-bold text-blue-50 text-left">Mis medallas:</h2>
            </div>
            <h1 className='font-bold mb-4 text-xl'>Ganadas:</h1>
            <div className='grid grid-cols-4 gap-4 p-4'>
                <Card className="py-4">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                        <h4 className="font-bold text-large text-center">Perfil completo</h4>

                    </CardHeader>
                    <CardBody className="overflow-visible py-2">
                        <Image
                            alt="Card background"
                            className="object-cover rounded-xl"
                            src="/image/medallas/perfil-completo.png"
                            width={270}
                        />
                        <div>
                            <span className='text-tiny'>Progreso:</span>
                            <Progress
                                aria-label="Progreso"
                                size="md"
                                value={100}
                                color="success"
                                showValueLabel={true}
                                className="max-w-md text-center"
                            />
                        </div>
                    </CardBody>
                </Card>

            </div>

            <h1 className='font-bold mb-4 text-xl mt-8 mb-4'>En proceso:</h1>
            <div className='grid grid-cols-4 gap-4 p-4'>


                <Card className="py-4">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                        <h4 className="font-bold text-large text-center">Colaborador destacado</h4>

                    </CardHeader>
                    <CardBody className="overflow-visible py-2">
                        <div className='flex mx-auto'>
                            <Image
                                alt="Card background"
                                className="object-cover rounded-xl"
                                src="/image/medallas/contribuyente.png"
                                width={250}
                            />
                        </div>
                        <div>
                            <span className='text-tiny'>Progreso:</span>
                            <Progress
                                aria-label="Progreso"
                                size="md"
                                value={50}
                                color="success"
                                showValueLabel={true}
                                className="max-w-md text-center"
                            />
                        </div>
                    </CardBody>
                </Card>

                <Card className="py-4">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                        <h4 className="font-bold text-large text-center">Siempre presente</h4>

                    </CardHeader>
                    <CardBody className="overflow-visible py-2">
                        <div className='flex mx-auto'>
                            <Image
                                alt="Card background"
                                className="object-cover rounded-xl"
                                src="/image/medallas/atento.png"
                                width={270}
                            />
                        </div>
                        <div>
                            <span className='text-tiny'>Progreso:</span>
                            <Progress
                                aria-label="Progreso"
                                size="md"
                                value={11}
                                color="success"
                                showValueLabel={true}
                                className="max-w-md text-center"
                            />
                        </div>
                    </CardBody>
                </Card>

            </div>
            
        </>
    )
}

export default MedallasApoderado
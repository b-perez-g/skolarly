'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { useAppState } from '../data/dataAlumnoZustand'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";


const AsignaturasAlumno = () => {
    const { asignaturas } = useAppState();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedAsignatura, setSelectedAsignatura] = useState(null);

    const openModal = (asignatura) => {
        setSelectedAsignatura(asignatura);
        onOpen();
    };

    return (
        <>
            {selectedAsignatura &&
                <Modal isOpen={isOpen} onClose={onClose} backdrop="blur" size="3xl">
                    <ModalContent>
                        <ModalHeader className="flex flex-col gap-1 text-blue-700 text-2xl font-bold">{selectedAsignatura.dataAsignatura.asignatura.nombre}</ModalHeader>
                        <ModalBody>
                            {selectedAsignatura && (
                                <div className='grid grid-cols-2 gap-4'>
                                    <Image
                                        alt="Card background"
                                        className="object-cover rounded-xl"
                                        src={selectedAsignatura.dataAsignatura.asignatura.foto}
                                        width="w-full"
                                    />
                                    <div>
                                        <small className='text-blue-500'>Código de la asignatura:</small>
                                        <p className='text-sm mb-4'>{selectedAsignatura.dataAsignatura.asignatura.codigo}</p>
                                        <small className='text-blue-500'>Profesor:</small>
                                        <p className='text-sm mb-4'>{`${selectedAsignatura.dataAsignatura.docente.nombre.nombres} ${selectedAsignatura.dataAsignatura.docente.nombre.a_paterno} ${selectedAsignatura.dataAsignatura.docente.nombre.a_materno}`}</p>
                                        <small className='text-blue-500'>Descripción:</small>
                                        <p className='text-sm mb-4'>{selectedAsignatura.dataAsignatura.asignatura.descripcion}</p>
                                    </div>
                                </div>
                            )}
                        </ModalBody>
                        <ModalFooter>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            }

            <h2 className='font-bold text-lg'>Asignaturas: </h2>
            <div className='border-2 border-gray-200 rounded-lg p-4'>
                <div className='grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-4 '>
                    {asignaturas.map((asignatura) => (
                        <Card isPressable key={asignatura.dataAsignatura.asignatura._id} className="py-4" onPress={() => openModal(asignatura)}>

                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                <Image
                                isZoomed
                                    alt="Card background"
                                    className="object-cover rounded-xl"
                                    src={asignatura.dataAsignatura.asignatura.foto}
                                    width={270}
                                    style={{ height: '200px' }}
                                />

                            </CardHeader>
                            <CardBody className="overflow-visible py-2">
                                <h4 className="font-bold text-large">{asignatura.dataAsignatura.asignatura.nombre}</h4>
                                <p className="text-tiny uppercase">{asignatura.dataAsignatura.asignatura.codigo}</p>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AsignaturasAlumno;


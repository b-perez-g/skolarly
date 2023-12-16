'use client'
import React, { useState } from 'react'
import { Card, CardHeader, CardBody, Button } from "@nextui-org/react";
import { Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Page() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [autenticado, setAutenticado] = useState(false);

    const handleButton = () => {
        setAutenticado(true);
        toast.success('Autorización otorgada', {
            position: toast.POSITION.TOP_RIGHT,
        });
        onClose();  // Cierra el modal después de mostrar la notificación
    }

    if (autenticado) {
        return (
            <>
                <div className="mt-5 bg-blue-900 p-5 border-2 border-white rounded-lg mb-5">
                    <h2 className="text-3xl font-bold text-blue-50 text-left">{`Permisos y autorizaciones`}</h2>
                </div>
                <p>No hay autorizaciones pendientes.</p>
                <ToastContainer />
            </>
        )
    } else {
        return (
            <div>
                
                <div className="mt-5 bg-blue-900 p-5 border-2 border-white rounded-lg mb-5">
                    <h2 className="text-3xl font-bold text-blue-50 text-left">{`Permisos y autorizaciones`}</h2>
                </div>

                <Modal isOpen={isOpen} onClose={onClose} isDismissable={false}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                                <ModalBody>
                                    <img src="/image/clave-unica/1.png" />
                                    <span className='text-lg text-gray-600 font-bold mt-4' >RUN</span>
                                    <Input size="xl" type="text" value="16538134-1" />
                                    <span className='text-lg text-gray-600 font-bold mt-4'>Tú ClaveÚnica</span>
                                    <Input size="xl" type="password" />
                                    <Button color="primary" className="mt-4" onPress={handleButton}>
                                        Autenticar
                                    </Button>
                                </ModalBody>
                                <ModalFooter>
                                    <img src="/image/clave-unica/2.png" />
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
                <Card className="py-4">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <h4 className="font-bold text-large">Paseo fin de año 8°A</h4>
                        <small>Alumno(a): Francisca Moreira</small>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2">
                        <div className='flex justify-end'>
                            <Button color='primary' onPress={onOpen}>
                                Permitir
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default Page;
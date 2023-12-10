import React from 'react'
import DatosUsuario from '@/components/DatosUsuario'

function page({ params }) {
    return (
        <>
            <div className="bg-blue-900 p-5 border-2 border-white rounded-lg mb-5">
                <h2 className="text-3xl font-bold text-blue-50 text-left">Mi perfil</h2>
            </div>
            <div className='grid grid-cols-10'>
                <div className='col-span-3'></div>
                <DatosUsuario className='col-span-7' tipoUser={params.tipo_usuario} />
            </div>
        </>
    )
}

export default page
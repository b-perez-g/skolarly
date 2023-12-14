
import { formatearFecha } from "@/utils/formatearFecha"

function DatosUsuario({ user, tipoUser }) {

  return (//1997-05-20T00:00:00-03:00
    <>
      <h2 className='font-bold text-lg'>Información personal: </h2>

      <div className='grid grid-cols-6 border-2 border-gray-200 rounded-lg p-4'>
        <div className="col-span-5">
        <div className='grid grid-cols-6 gap-4 items-center mb-2'>
            <p className=' col-span-1 font-bold text-sm'>Rut:</p>
            <p className='col-span-5'>{user.rut}</p>
          </div>
          <div className='grid grid-cols-6 gap-4 items-center mb-2'>
            <p className=' col-span-1 font-bold text-sm'>Tipo de usuario:</p>
            <p className='col-span-5'>{user.tipo_usuario}</p>
          </div>
          <div className='grid grid-cols-6 gap-4 items-center mb-2'>
            <p className=' col-span-1 font-bold text-sm'>Fecha de nacimiento:</p>
            <p className='col-span-5'>{formatearFecha(user.fecha_nac)}</p>
          </div>
          <div className='grid grid-cols-6 gap-4 items-center mb-2'>
            <p className=' col-span-1 font-bold text-sm'>Correo:</p>
            <p className='col-span-5'>{user.correo}</p>
          </div>
          <div className='grid grid-cols-6 gap-4 items-center mb-2'>
            <p className=' col-span-1 font-bold text-sm'>Celular:</p>
            <p className='col-span-5'>{"+56" + user.celular}</p>
          </div>
          <div className='grid grid-cols-6 gap-4 items-center mb-2'>
            <p className=' col-span-1 font-bold text-sm'>Dirección:</p>
            <p className='col-span-5'>{user.direccion.calle + " #" + user.direccion.numero + ", " + user.direccion.comuna + ", " + user.direccion.region + "."}</p>
          </div>

          <div className='grid grid-cols-6 gap-4 items-center mb-2'>
            <p className=' col-span-1 font-bold text-sm'>Género:</p>
            <p className='col-span-5'>{user.genero === "F" ? "Femenino" : "Masculino"}</p>
          </div>
          <div className='grid grid-cols-6 gap-4 items-center mb-2'>
            <p className=' col-span-1 font-bold text-sm'>Estado civil:</p>
            <p className='col-span-5'>{user.estado_civil.charAt(0).toUpperCase() + user.estado_civil.slice(1)}</p>
          </div>
        </div>
        <div className="col-span-1">
            <p className="text-right underline decoration-solid cursor-pointer text-blue-700 text-sm">Editar</p>
        </div>
      </div>
    </>
  )
}

export default DatosUsuario
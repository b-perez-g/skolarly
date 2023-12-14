import {Avatar} from "@nextui-org/react";
import { useAppState } from '../data/dataAlumnoZustand'

function FotoPerfil({user, tipoUser }) {
    return (
        <Avatar src={user.foto_perfil} className="w-[200px] h-[200px] text-large" />
    )
}

export default FotoPerfil
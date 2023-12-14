import {Avatar} from "@nextui-org/react";
import { useAppState } from '../data/dataAlumnoZustand'

function FotoPerfilAlumno() {
    const { alumno} = useAppState();
    return (
        <Avatar src={alumno.foto_perfil} className="w-[200px] h-[200px] text-large" />
    )
}

export default FotoPerfilAlumno
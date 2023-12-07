import { consultarCookie } from "./validarLogin";

export const solicitarEscuela = async () =>{
    const usuario = await consultarCookie();
    const id_usuario = usuario.ID;
    let userData = null;
    let schoolData = null;

    try {
        //BUSCAR USUARIO
        const response = await fetch(`http://localhost:4000/api/usuarios/${id_usuario}`);
        //SI SE ENCUENTRA EL USUARIO
        if (response.ok) {
            userData = await response.json();
            try{
                const response = await fetch(`http://localhost:4000/api/escuelas/${userData.escuela_id}`);
                if (response.ok){
                    schoolData = await response.json();
                    return schoolData;
                }
            }catch (error) {
                console.error('Error al obtener escuela', error);
                return schoolData;
            }
        } else {
            return schoolData;
        }

    } catch (error) {
        console.error('Error al obtener el usuario', error);
        return schoolData;
    };
    return schoolData;
}
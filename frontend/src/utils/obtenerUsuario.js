export const obtenerUsuario = async (id) => {
    let user = {};

    try {
        //BUSCAR USUARIO
        const response = await fetch(`http://localhost:4000/api/usuarios/${id}`);
        //SI SE ENCUENTRA EL USUARIO
        if (response.ok) {
            user = await response.json();
        }
    } catch (error) {
        console.error('Error al obtener el usuario', error);
    };
    return user;
}
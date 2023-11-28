export const validarLogin = async (rut, contrasena) => {
    let validado = false;
    let user = {};

    try {
        //BUSCAR USUARIO
        const response = await fetch(`http://localhost:4000/api/usuarios/rut/${rut}`);
        //SI SE ENCUENTRA EL USUARIO
        if (response.ok) {
            user = await response.json();

            //SI LOS INPUTS SON CORRECTOS
            if (rut === user.rut && contrasena === user.contrasena) {

                //GENERAR TOKEN
                try {
                    const response = await fetch('http://localhost:4000/api/auth', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ ID: user._id, RUT: user.rut, TIPO: user.tipo_usuario })
                    });
                    const data = await response.json();

                    //SI EL TOKEN FUE CREADO
                    if (response.ok) {
                        validado = true;
                        //Crear Cookie
                        document.cookie = `user=${data.token}; path=/`

                        //SI NO SE GENERA TOKEN
                    } else {
                        console.error('Error:', data.error);
                    }
                } catch (error) {
                    console.error('Error al crear el token', error);
                    return validado;
                }

                //SI LOS INPUTS SON INCORRECTOS
            } else {
                console.log("Rut o contraseña incorrecta");
                return validado;
            }

            // SI NO HAY RESPUESTA DEL USUARIO
        } else {
            return validado;
        }

    } catch (error) {
        console.error('Error al obtener el usuario', error);
        return validado;
    };
    return validado;
}

export const consultarCookie = async () => {
    let userData = {};

    //Obtener cookies
    const cookiesArray = document.cookie.split('; ');
    const cookies = {};
    cookiesArray.forEach(cookie => {
        const [name, value] = cookie.split('=');
        cookies[name] = decodeURIComponent(value);
    });

    // Obtener el valor de la cookie usuario
    const cookieUser = cookies['user'];

    if (cookieUser !== undefined){
        try {
            const response = await fetch(`http://localhost:4000/api/auth/${cookieUser}`);
            if (!response.ok) {
                console.error('Error:', response.status);
            }else{
                if (response.headers.get('content-type') && response.headers.get('content-type').includes('application/json')) {
                     userData = await response.json();
                } else {
                    console.error('Error en el formato de respuesta');
                }
            }
        } catch (error) {
            console.error('Error al validar el token', error);
        }
    } else {
        console.log('Cookie is undefined');
    }
    return userData;
    //if (userData && Object.keys(userData).length > 0){
        
    //}
}
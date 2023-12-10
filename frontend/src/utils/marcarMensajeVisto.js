export const marcarVisto = async (chat_id) =>{
    try {
        const url = `http://localhost:4000/api/chats/visto/${chat_id}`;
        const nuevoVisto = true;

        const datosAEnviar = {
            visto: nuevoVisto,
        };

        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosAEnviar),
        });

        if (response.ok) {
            console.log('Chat actualizado exitosamente');
        } else {
            console.error('Error al actualizar el chat');
        }

    } catch (error) {
        console.error('Error:', error);
    }
}
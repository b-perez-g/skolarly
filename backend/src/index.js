require('dotenv').config()

const {app, server} = require('./app')
require('./database')

//Lógica para ejecutar el servidor
async function main(){
    await server.listen(app.get('port'));
    console.log('El servidor se está ejecutando en el puerto: ', app.get('port')); 
}

main();
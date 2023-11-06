require('dotenv').config()

const app = require('./app')
require('./database')

//Lógica para ejecutar el servidor
async function main(){
    await app.listen(app.get('port'))
    console.log('El servidor se está ejecutando en el puerto: ', app.get('port')); 
}

main();
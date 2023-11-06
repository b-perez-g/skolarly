const mongoose = require('mongoose')

//Cadena de conexión
const URI = process.env.MONGODB_URI
            ? process.env.MONGODB_URI
            : 'mongodb://127.0.0.1/dbskolarly'

//Intentar conectar a la base de datos
try{
    mongoose.connect(URI)
    const connection = mongoose.connection;

    connection.once('open',()=>{
        console.log('La base de datos ha sido conectada: ', URI);
    })
    
}catch (error) {
    
}
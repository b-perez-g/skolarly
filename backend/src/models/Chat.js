const {Schema, model, default: mongoose} =require('mongoose')
const moment = require('moment-timezone');

const chatSchema = new Schema ({
    participantes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    }],
    createdAt: {
        type: String,
        default: moment().tz('America/Santiago').format()
    },
    updatedAt:{
        type: String,
        default: moment().tz('America/Santiago').format()
    }
})

module.exports =  model('Chat', chatSchema, 'Chats')
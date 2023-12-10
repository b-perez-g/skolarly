const {Schema, model, default: mongoose} =require('mongoose')
const moment = require('moment-timezone');

const chatSchema = new Schema ({
    participantes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    }],
    visto:{
        type:Boolean,
        default: false
    },
    createdAt: {
        type: String,
        default: () => moment().tz('America/Santiago').format()
    },
    updatedAt:{
        type: String,
        default: () => moment().tz('America/Santiago').format()
    }
})

chatSchema.pre('save', function (next) {
    this.updatedAt = moment().tz('America/Santiago').format();
    next();
});

module.exports =  model('Chat', chatSchema, 'Chats')
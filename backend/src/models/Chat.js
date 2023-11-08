const {Schema, model, default: mongoose} =require('mongoose')

const chatSchema = new Schema ({
    participantes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    }],
},{
    timestamps: true
})

module.exports =  model('Chat', chatSchema, 'Chats')
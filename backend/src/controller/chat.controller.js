const chatCtrl = {}
const Chat = require('../models/Chat')

// Crear nuevo chat
chatCtrl.createChat = async (req, res) => {
  try {
    const chatNuevo = new Chat(req.body);
    const chatGuardado = await chatNuevo.save();
    res.status(201).json(chatGuardado);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el chat' });
  }
}

// Obtener todos los chats
chatCtrl.getChats = async (req, res) => {
  try {
    const chats = await Chat.find();
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los chats' });
  }
}

// Obtener un chat por su ID
// Obtener un chat por participantes
chatCtrl.getChatByParticipants = async (req, res) => {
  //try {

    console.log(req.params);
  
/*
    const chat = await Chat.findOne({
      'participantes': {
        $all: [
          mongoose.Types.ObjectId(user1),
          mongoose.Types.ObjectId(user2)
        ]
      }
    });

    if (!chat) {
      return res.status(404).json({ error: 'Chat no encontrado' });
    }

    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el chat' });
  }*/
};


chatCtrl.getChatById = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat) {
      return res.status(404).json({ error: 'Chat no encontrado' });
    }
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el chat' });
  }
}

chatCtrl.getChatByUsers = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat) {
      return res.status(404).json({ error: 'Chat no encontrado' });
    }
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el chat' });
  }
}

// Actualizar un chat por su ID
chatCtrl.updateChat = async (req, res) => {
  try {
    const chatActualizado = await Chat.findByIdAndUpdate(req.params.id, req.body);
    if (!chatActualizado) {
      return res.status(404).json({ error: 'Chat no encontrado' });
    }
    res.status(200).json(chatActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el chat' });
  }
}

// Eliminar un chat por su ID
chatCtrl.deleteChat = async (req, res) => {
  try {
    const chatEliminado = await Chat.findByIdAndDelete(req.params.id);
    if (!chatEliminado) {
      return res.status(404).json({ error: 'Chat no encontrado' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el Chat' });
  }
}

module.exports = chatCtrl;
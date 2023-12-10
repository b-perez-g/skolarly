const chatCtrl = {}
const { default: mongoose } = require('mongoose');
const Chat = require('../models/Chat')



chatCtrl.getChatsByUserId = async (req, res) => {
  try {
    const userId = req.params.id;

    const chats = await Chat.find({
      'participantes': userId
    }).sort({ updatedAt: 1 });

    if (!chats || chats.length === 0) {
      return res.status(404).json({ error: 'No se encontraron chats para el usuario especificado' });
    }

    res.status(200).json(chats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los chats' });
  }
};





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

// Obtener un chat por participantes
chatCtrl.getChatByParticipantes = async (req, res) => {
  try {
    const { participante1, participante2 } = req.params;

    // Buscar el chat que tiene ambos participantes
    const chat = await Chat.findOne({
      participantes: { $all: [participante1, participante2] },
    });

    if (!chat) {
      return res.status(404).json({ mensaje: 'Chat no encontrado' });
    }

    return res.json(chat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
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
    // Extrae el campo 'updatedAt' del cuerpo de la solicitud
    const { updatedAt, visto } = req.body;

    // Verifica si 'updatedAt' está presente en el cuerpo de la solicitud
    if (!updatedAt) {
      return res.status(400).json({ error: 'Campo "updatedAt" no proporcionado en el cuerpo de la solicitud' });
    }

    // Crea un objeto que contiene solo el campo 'updatedAt'
    const updatedAtActualizado = { updatedAt, visto };

    // Utiliza Chat.findByIdAndUpdate para actualizar solo el campo 'updatedAt'
    const chatActualizado = await Chat.findByIdAndUpdate(req.params.id, updatedAtActualizado, { new: true });

    if (!chatActualizado) {
      return res.status(404).json({ error: 'Chat no encontrado' });
    }

    res.status(200).json(chatActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el chat' });
  }
};

//actualizar visto
chatCtrl.updateChatVisto = async (req, res) => {
  try {
    const { visto } = req.body;

    if (visto === undefined || visto === null) {
      return res.status(400).json({ error: 'Campo "visto" no proporcionado en el cuerpo de la solicitud' });
    }

    const vistoActualizado = { visto };

    const chatActualizado = await Chat.findByIdAndUpdate(req.params.visto, { $set: vistoActualizado }, { new: true });

    if (!chatActualizado) {
      return res.status(404).json({ error: 'Chat no encontrado' });
    }

    res.status(200).json(chatActualizado);
  } catch (error) {
    console.error('Error al actualizar el chat:', error);
    res.status(500).json({ error: `Error al actualizar el chat: ${error.message}` });
  }
};


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
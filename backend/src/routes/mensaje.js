const {Router} = require('express')
const router = Router();

const {getMensajes, createMensaje, getMensajeById, deleteMensaje, updateMensaje, getMensajesByChatId, getUltimoMensajePorChat} = require('../controller/mensaje.controller')

router.route('/')
    .get(getMensajes)
    .post(createMensaje)

router.route('/:id')
    .get(getMensajeById)
    .delete(deleteMensaje)
    .put(updateMensaje)

router.route('/chat-id/:id_chat')
    .get(getMensajesByChatId)

router.route('/lastest/:id_chat')
    .get(getUltimoMensajePorChat)

module.exports = router;
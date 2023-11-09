const {Router} = require('express')
const router = Router();

const {getMensajes, createMensaje, getMensajeById, deleteMensaje, updateMensaje} = require('../controller/mensaje.controller')

router.route('/')
    .get(getMensajes)
    .post(createMensaje)

router.route('/:id')
    .get(getMensajeById)
    .delete(deleteMensaje)
    .put(updateMensaje)

module.exports = router;
const {Router} = require('express')
const router = Router();

const {getAutorizaciones, createAutorizacion, getAutorizacionById, deleteAutorizacion, updateAutorizacion} = require('../controller/autorizacion.controller')

router.route('/')
    .get(getAutorizaciones)
    .post(createAutorizacion)

router.route('/:id')
    .get(getAutorizacionById)
    .delete(deleteAutorizacion)
    .put(updateAutorizacion)

module.exports = router;
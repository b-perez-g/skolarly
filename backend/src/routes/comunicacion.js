const {Router} = require('express')
const router = Router();

const {getComunicaciones, createComunicacion, getComunicacionById, deleteComunicacion, updateComunicacion} = require('../controller/comunicacion.controller')

router.route('/')
    .get(getComunicaciones)
    .post(createComunicacion)

router.route('/:id')
    .get(getComunicacionById)
    .delete(deleteComunicacion)
    .put(updateComunicacion)

module.exports = router;
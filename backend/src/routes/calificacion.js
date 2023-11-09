const {Router} = require('express')
const router = Router();

const {getCalificaciones, createCalificacion, getCalificacionById, deleteCalificacion, updateCalificacion} = require('../controller/calificacion.controller')

router.route('/')
    .get(getCalificaciones)
    .post(createCalificacion)

router.route('/:id')
    .get(getCalificacionById)
    .delete(deleteCalificacion)
    .put(updateCalificacion)

module.exports = router;
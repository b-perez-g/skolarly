const {Router} = require('express')
const router = Router();

const {getCalificaciones, createCalificacion, getCalificacionById, deleteCalificacion, updateCalificacion, getCalificacionByAlumnoAndAsignatura} = require('../controller/calificacion.controller')

router.route('/')
    .get(getCalificaciones)
    .post(createCalificacion)

router.route('/:id')
    .get(getCalificacionById)
    .delete(deleteCalificacion)
    .put(updateCalificacion)

router.route('/:alumno_id/:asignatura_id')
    .get(getCalificacionByAlumnoAndAsignatura)

module.exports = router;
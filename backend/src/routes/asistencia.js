const {Router} = require('express')
const router = Router();

const {getAsistencias, createAsistencia, getAsistenciaById, deleteAsistencia, updateAsistencia, getAsistenciasByAlumnoId} = require('../controller/asistencia.controller')

router.route('/')
    .get(getAsistencias)
    .post(createAsistencia)

router.route('/:id')
    .get(getAsistenciaById)
    .delete(deleteAsistencia)
    .put(updateAsistencia)

router.route('/alumno/:alumnoId')
    .get(getAsistenciasByAlumnoId)

module.exports = router;
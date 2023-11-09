const {Router} = require('express')
const router = Router();

const {getAsistencias, createAsistencia, getAsistenciaById, deleteAsistencia, updateAsistencia} = require('../controller/asistencia.controller')

router.route('/')
    .get(getAsistencias)
    .post(createAsistencia)

router.route('/:id')
    .get(getAsistenciaById)
    .delete(deleteAsistencia)
    .put(updateAsistencia)

module.exports = router;
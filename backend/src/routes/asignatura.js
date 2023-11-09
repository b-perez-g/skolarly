const {Router} = require('express')
const router = Router();

const {getAsignaturas, createAsignatura, getAsignaturaById, deleteAsignatura, updateAsignatura} = require('../controller/asignatura.controller')

router.route('/')
    .get(getAsignaturas)
    .post(createAsignatura)

router.route('/:id')
    .get(getAsignaturaById)
    .delete(deleteAsignatura)
    .put(updateAsignatura)

module.exports = router;
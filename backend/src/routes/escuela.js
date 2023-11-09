const {Router} = require('express')
const router = Router();

const {getEscuelas, createEscuela, getEscuelaById, deleteEscuela, updateEscuela} = require('../controller/escuela.controller')

router.route('/')
    .get(getEscuelas)
    .post(createEscuela)

router.route('/:id')
    .get(getEscuelaById)
    .delete(deleteEscuela)
    .put(updateEscuela)

module.exports = router;
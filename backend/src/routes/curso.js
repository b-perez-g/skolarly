const {Router} = require('express')
const router = Router();

const {getCursos, createCurso, getCursoById, deleteCurso, updateCurso} = require('../controller/curso.controller')

router.route('/')
    .get(getCursos)
    .post(createCurso)

router.route('/:id')
    .get(getCursoById)
    .delete(deleteCurso)
    .put(updateCurso)

module.exports = router;
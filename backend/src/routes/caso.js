const {Router} = require('express')
const router = Router();

const {getCasos, createCaso, getCasoById, deleteCaso, updateCaso} = require('../controller/caso.controller')

router.route('/')
    .get(getCasos)
    .post(createCaso)

router.route('/:id')
    .get(getCasoById)
    .delete(deleteCaso)
    .put(updateCaso)

module.exports = router;
const {Router} = require('express')
const router = Router();

const {getAnotaciones, createAnotacion, getAnotacionById, deleteAnotacion, updateAnotacion} = require('../controller/anotacion.controller')

router.route('/')
    .get(getAnotaciones)
    .post(createAnotacion)

router.route('/:id')
    .get(getAnotacionById)
    .delete(deleteAnotacion)
    .put(updateAnotacion)

module.exports = router;
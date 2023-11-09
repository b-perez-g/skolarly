const {Router} = require('express')
const router = Router();

const {getCapacitaciones, createCapacitacion, getCapacitacionById, deleteCapacitacion, updateCapacitacion} = require('../controller/capacitacion.controller')

router.route('/')
    .get(getCapacitaciones)
    .post(createCapacitacion)

router.route('/:id')
    .get(getCapacitacionById)
    .delete(deleteCapacitacion)
    .put(updateCapacitacion)

module.exports = router;
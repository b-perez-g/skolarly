const {Router} = require('express')
const router = Router();

const {getMedallas, createMedalla, getMedallaById, deleteMedalla, updateMedalla} = require('../controller/medalla.controller')

router.route('/')
    .get(getMedallas)
    .post(createMedalla)

router.route('/:id')
    .get(getMedallaById)
    .delete(deleteMedalla)
    .put(updateMedalla)

module.exports = router;
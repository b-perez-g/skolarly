const {Router} = require('express')
const router = Router();

const {getMedallasApoderados, createMedallaApoderado, getMedallaApoderadoById, deleteMedallaApoderado, updateMedallaApoderado} = require('../controller/medallaapoderado.controller')

router.route('/')
    .get(getMedallasApoderados)
    .post(createMedallaApoderado)

router.route('/:id')
    .get(getMedallaApoderadoById)
    .delete(deleteMedallaApoderado)
    .put(updateMedallaApoderado)

module.exports = router;
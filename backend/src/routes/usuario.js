const {Router} = require('express')
const router = Router();

const {createUsuario, getUsuarios, getUsuarioById, deleteUsuario, updateUsuario, getUsuarioByRut, getUsuarioByRutApoderado, getUsuarioByCurso} = require('../controller/usuario.controller')

router.route('/')
    .get(getUsuarios)
    .post(createUsuario)

router.route('/:id')
    .get(getUsuarioById)
    .delete(deleteUsuario)
    .put(updateUsuario)

router.route('/rut/:rut')
    .get(getUsuarioByRut)

router.route('/rut-apoderado/:rut')
    .get(getUsuarioByRutApoderado)

router.route('/curso/:id_curso')
    .get(getUsuarioByCurso)

module.exports = router;
const {Router} = require('express')
const router = Router();

const {getChats, createChat, getChatById, deleteChat, updateChat} = require('../controller/chat.controller')

router.route('/')
    .get(getChats)
    .post(createChat)

router.route('/:id')
    .get(getChatById)
    .delete(deleteChat)
    .put(updateChat)

module.exports = router;
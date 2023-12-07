const {Router} = require('express')
const router = Router();

const {getChats, createChat, getChatById, deleteChat, updateChat, getChatByUsers} = require('../controller/chat.controller')

router.route('/')
    .get(getChats)
    .post(createChat)

router.route('/:id')
    .get(getChatById)
    .delete(deleteChat)
    .put(updateChat)

router.route('/:user1/:user2')
    .get(getChatByUsers)


module.exports = router;
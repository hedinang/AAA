const express = require('express');
const chatService = require('../service/ChatService')
const router = express.Router();
// router.post('/get/:userId', async function (req, res) {
//     let result = await chatService.get(req.params.userId);
//     res.send(result)
// })
router.get('/all', async function (req, res) {
    let result = await chatService.getAll()
    res.send(result)
})
router.post('/create', async function (req, res) {
    let result = await chatService.createChat(req.body)
    res.send(result)
})
// router.put('/update', async function (req, res) {
//     let result = await chatService.updateUser(req.body)
//     res.send(result)
// })
// router.delete('/delete/:userId', async function (req, res) {
//     let result = await chatService.deleteUser(req.params.userId)
//     res.send(result)
// })
module.exports = router
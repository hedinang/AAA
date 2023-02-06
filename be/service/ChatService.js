const mongodb = require('../model/index')
var uuid = require('uuid');
async function getAll() {
    let apiResponse = {}
    let result = await mongodb.Chat.find().lean()

    apiResponse.data = result
    apiResponse.status = 'OK'
    return apiResponse
}
async function createChat(data) {
    let apiResponse = {}
    let result = await mongodb.Chat.create({
        id: uuid.v4(),
        userList: data.memberList,
        name: data.groupName
    })
    // apiResponse.data = result
    apiResponse.status = 'OK'
    return apiResponse
}

async function sendMessage(data) {
    let apiResponse = {}
    if (data.id) {
        let chat = await mongodb.Chat.findById(data.id).lean()
        chat.content.push(data.message)
    }
    return apiResponse
}
async function getDetailMessage(data) {
    let apiResponse = {}
    let chat = await mongodb.Chat.find({ id: data.id }).lean()
    apiResponse.data = chat
    apiResponse.status = 'OK'
    return apiResponse
}
module.exports = {
    getAll, createChat, sendMessage, getDetailMessage
}
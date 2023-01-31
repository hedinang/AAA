const mongodb = require('../model/index')

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
        userList:data.userList
    })
    apiResponse.data = result
    apiResponse.status = 'OK'
    return apiResponse
}

async function sendMessage(data) {
    let apiResponse = {}
    if (data.id){
        let chat = await mongodb.Chat.findById(data.id).lean()
        chat.content.push(data.message)
    }
    return apiResponse
}
module.exports = {
    getAll, createChat, sendMessage
}
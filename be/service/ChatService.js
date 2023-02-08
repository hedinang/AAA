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
    data.memberList.push(data.hostId)
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
        let chats = await mongodb.Chat.find({ id: data.id }).lean()
        if (chats.length) {
            let chat = chats[0]
            chat.content.push({
                userId: data.userId,
                message: data.message,
                time: new Date().toISOString()
            })
            try {
                let result = await mongodb.Chat.findOneAndUpdate({ id: data.id }, chat, { new: true });
                apiResponse.data = result;
                apiResponse.status = 'OK'
            } catch (error) {
                apiResponse.message = 'Update data wrong'
                apiResponse.status = 'Bad Request'
            }
        }
    } else {
        apiResponse.message = 'Update data wrong'
        apiResponse.status = 'Bad Request'
    }
    return apiResponse
}
async function getDetailMessage(data) {
    let apiResponse = {}
    let chats = await mongodb.Chat.find({ id: data.id }).lean()
    if (chats.length) {
        apiResponse.data = chats[0]
        apiResponse.status = 'OK'
    } else {
        apiResponse.message = 'Update data wrong'
        apiResponse.status = 'Bad Request'
    }
    return apiResponse
}
module.exports = {
    getAll, createChat, sendMessage, getDetailMessage
}
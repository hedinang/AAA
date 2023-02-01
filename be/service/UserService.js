const mongodb = require('../model/index')

async function getAll() {
    let apiResponse = {}
    let result = await mongodb.User.find().lean();
    apiResponse.data = result
    apiResponse.status = 'OK'
    return apiResponse
}
async function initial(data) {
    let apiResponse = {}
    let result = await mongodb.User.find({
        id: { $ne: data.id }
    }).lean();
    apiResponse.data = result
    apiResponse.status = 'OK'
    return apiResponse
}
async function login(data) {
    let apiResponse = {}
    let result = await mongodb.User.find({
        username: data.username,
        password: data.password
    }).lean();
    if (result.length) {
        apiResponse.status = 'OK'
        apiResponse.data = result[0]
    } else {
        apiResponse.message = 'This account is not existed'
        apiResponse.status = 'Not Found'
    }
    return apiResponse
}
async function deleteUser(userId) {
    let apiResponse = {}
    let result = await mongodb.User.deleteOne({ id: userId })
    apiResponse.data = result
    apiResponse.status = 'OK'
    return apiResponse
}
async function createUser(data) {
    let apiResponse = {}

    let user = await mongodb.User.find({ name: data.name }).lean();
    if (user.length) {
        apiResponse.message = 'This email is existed'
        apiResponse.status = 'Bad Request'
    } else {
        try {
            let result = await mongodb.User.create(data)
            apiResponse.status = 'OK'
        } catch (error) {
            apiResponse.message = 'Update data wrong'
            apiResponse.status = 'Bad Request'
        }
    }
    return apiResponse
}
async function updateUser(data) {
    let apiResponse = {}
    try {
        let filter = { id: id };
        let result = await mongodb.User.findOneAndUpdate(filter, data, { new: true });
        apiResponse.status = 'OK'
        apiResponse.data = result
    } catch (error) {
        apiResponse.message = 'Update data wrong'
        apiResponse.status = 'Bad Request'
    }
    return apiResponse
}

module.exports = {
    deleteUser, getAll, createUser, updateUser, initial, login
}
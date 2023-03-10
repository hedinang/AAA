import axios from './axiosNodeClient';
const rootUrl = process.env.ROOT_URL


async function login(body) {
    return await axios.post('http://' + rootUrl + ':8000/user/login', body, { timeout: 8000 });
}
async function allUser() {
    return await axios.get('http://' + rootUrl + ':8000/user/all', { timeout: 8000 });
}
async function initialGroupUserList(body) {
    return await axios.post('http://' + rootUrl + ':8000/user/initial', body, { timeout: 8000 });
}
async function deleteUser(userId) {
    return await axios.delete('http://' + rootUrl + ':8000/user/delete/' + userId, { timeout: 8000 });
}
async function editUser(body) {
    return await axios.put('http://' + rootUrl + ':8000/user/update', body, { timeout: 8000 });
}
async function createUser(body) {
    return await axios.post('http://' + rootUrl + ':8000/user/create', body, { timeout: 8000 });
}


async function allChatGroup(body) {
    return await axios.post('http://' + rootUrl + ':8000/chat/all', body, { timeout: 8000 });
}
// async function deleteUser(userId) {
//     return await axios.delete('http://' + rootUrl + ':8000/user/delete/' + userId, { timeout: 8000 });
// }
async function sendMessage(body) {
    return await axios.put('http://' + rootUrl + ':8000/chat/message', body, { timeout: 8000 });
}
async function createChatGroup(body) {
    return await axios.post('http://' + rootUrl + ':8000/chat/create', body, { timeout: 8000 });
}
async function detailChat(body) {
    return await axios.post('http://' + rootUrl + ':8000/chat/detail', body, { timeout: 8000 });
}
async function updateFirebaseToken(body) {
    return await axios.put('http://' + rootUrl + ':8000/user/firebase/update', body, { timeout: 8000 });
}
export {
    initialGroupUserList, login, allUser, deleteUser, updateFirebaseToken,
    editUser, createUser, allChatGroup, createChatGroup, detailChat, sendMessage
}

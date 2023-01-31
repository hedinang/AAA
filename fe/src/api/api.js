import axios from './axiosNodeClient';
async function login(body) {
    return await axios.post('http://localhost:8000/user/login', body, { timeout: 8000 });
}
async function allUser() {
    return await axios.get('http://localhost:8000/user/all', { timeout: 8000 });
}
async function initialGroupUserList(body) {
    return await axios.post('http://localhost:8000/user/initial', body, { timeout: 8000 });
}
async function deleteUser(userId) {
    return await axios.delete('http://localhost:8000/user/delete/' + userId, { timeout: 8000 });
}
async function editUser(body) {
    return await axios.put('http://localhost:8000/user/update', body, { timeout: 8000 });
}
async function createUser(body) {
    return await axios.post('http://localhost:8000/user/create', body, { timeout: 8000 });
}


async function allChatGroup() {
    return await axios.get('http://localhost:8000/chat/all', { timeout: 8000 });
}
// async function deleteUser(userId) {
//     return await axios.delete('http://localhost:8000/user/delete/' + userId, { timeout: 8000 });
// }
// async function editUser(body) {
//     return await axios.put('http://localhost:8000/user/update', body, { timeout: 8000 });
// }
async function createChatGroup(body) {
    return await axios.post('http://localhost:8000/chat/create', body, { timeout: 8000 });
}
export { initialGroupUserList, login, allUser, deleteUser, editUser, createUser, allChatGroup, createChatGroup }

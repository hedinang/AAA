// const { DataTypes } = require('sequelize')
// const sequelize = require('./index.js')
// const User = sequelize.define('users', {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     email: {
//         type: DataTypes.TEXT,
//         allowNull: false
//     },
//     password: {
//         type: DataTypes.TEXT,
//         allowNull: false
//     },
//     first_name: {
//         type: DataTypes.TEXT,
//         allowNull: false
//     },
//     last_name: {
//         type: DataTypes.TEXT,
//     },
//     country: {
//         type: DataTypes.TEXT
//     },
//     city: {
//         type: DataTypes.TEXT,
//     },
//     phone_number: {
//         type: DataTypes.TEXT
//     },
//     position: {
//         type: DataTypes.TEXT,
//     },
//     company_id: {
//         type: DataTypes.STRING
//     },
//     created_at: {
//         type: DataTypes.STRING,
//     },
//     updated_at: {
//         type: DataTypes.STRING
//     }
// }, {
//     timestamps: false
// })
// module.exports = { User }


var _ = require('lodash');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promise = require('bluebird');
var uuid = require('uuid');
var models = 'users';
mongoose.Promise = Promise;
var user = new Schema({
    id: {
        type: String,
        index: true,
        required: true,
        default: uuid.v4()

    },
    name: {
        type: String,
        required: true
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    privateKey: {
        type: String
    },
    publicKey: {
        type: String
    },
    // content contains {
    //userId
    //message
    //}
});
module.exports = mongoose.model(models, user);
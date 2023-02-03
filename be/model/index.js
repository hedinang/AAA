'use strict'
const { Sequelize } = require('sequelize');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
require('dotenv').config();

const connection = new Sequelize({
    database: "interview",
    username: "postgres",
    password: "daniel1995",
    host: "localhost",
    port: 5432,
    dialect: "postgres"
});

connection.authenticate().then(e => {
    console.log('Connect successfully')
}).catch(f => {
    console.log('Connect by sequelize failed')
})
mongoose.connect(process.env.CONNECTION_ATLAS, {
    dbName: process.env.MONGO_DBNAME,
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    retryWrites: false

}).catch(function (e) {
    logger && logger.log('error', '-------> Fatal Error connection mongoose %s', e);
});
mongoose.connection.on('error', err => {
    logger && logger.log('error', '-------> Error connection mongoose %s', err);
});
const db = {};
db.Chat = require('./Chat');
db.User = require('./User');
module.exports = db

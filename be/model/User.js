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
    }
});
module.exports = mongoose.model(models, user);
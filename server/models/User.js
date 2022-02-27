const mongoose = require('mongoose')

const User = mongoose.model(
    'users',
    new mongoose.Schema({
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    })
)

module.exports = User

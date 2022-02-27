const mongoose = require('mongoose')
const Schema = mongoose.Schema
// bàn thắng
const Goal = mongoose.model(
    'goals',
    new Schema({
        scheduler: {
            type: Schema.Types.ObjectId,
            ref: 'schedulers',
        },
        team: {
            type: Schema.Types.ObjectId,
            ref: 'teams',
        },
        player: {
            type: Schema.Types.ObjectId,
            ref: 'players',
        },
        videoId: {
            type: String,
        },
        atTime: {
            type: Number,
            min: 0,
            required: true,
        },
    })
)

module.exports = Goal

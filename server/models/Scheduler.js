const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Lịch đấu
const Scheduler = mongoose.model(
    'schedulers',
    new Schema({
        tournament: {
            type: Schema.Types.ObjectId,
            ref: 'tournaments',
        },
        team1: {
            type: Schema.Types.ObjectId,
            ref: 'teams',
        },
        team2: {
            type: Schema.Types.ObjectId,
            ref: 'teams',
        },
        time: {
            type: Date,
        },
        goals: [
            {
                type: Schema.Types.ObjectId,
                ref: 'goals',
            },
        ],
    })
)

module.exports = Scheduler

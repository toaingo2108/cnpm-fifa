const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Giải đấu
const Tournament = mongoose.model(
    'tournaments',
    new Schema({
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        status: {
            type: String,
            enum: ['Initializing', 'Going on', 'Finished'],
            default: 'Initializing',
        },
        image: {
            type: String,
        },
        teams: [
            {
                type: Schema.Types.ObjectId,
                ref: 'teams',
            },
        ],
    })
)

module.exports = Tournament

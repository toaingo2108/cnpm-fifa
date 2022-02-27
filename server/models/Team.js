const mongoose = require('mongoose')
const Schema = mongoose.Schema

// đội bóng
const Team = mongoose.model(
    'teams',
    new Schema({
        name: {
            type: String,
            required: true,
            unique: true,
        },
        logo: {
            type: String,
        },
        // Huấn luyện viên
        trainer: {
            type: String,
        },
        tournaments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'tournaments',
            },
        ],
    })
)

module.exports = Team

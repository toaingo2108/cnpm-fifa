const mongoose = require('mongoose')
const Schema = mongoose.Schema
// cầu thủ
const Player = mongoose.model(
    'players',
    new Schema({
        name: { type: String, required: true },
        age: { type: Number, index: true },
        // vị trí
        position: {
            type: String,
            enum: ['Thủ môn', 'Hậu vệ', 'Tiền vệ', 'Tiền đạo'],
        },
        number: { type: Number }, // số áo
        avatar: { type: String }, // ảnh cá nhân
        height: { type: Number }, // chiều cao
        weight: { type: Number }, // cân nặng
        goals: [
            {
                type: Schema.Types.ObjectId,
                ref: 'goals',
            },
        ],
        team: {
            type: Schema.Types.ObjectId,
            ref: 'teams',
        },
    })
)

module.exports = Player

const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Goal = require('../models/Goal')
const Scheduler = require('../models/Scheduler')
const Player = require('../models/Player')

router.get('/:schedulerId', async (req, res) => {
    const schedulerId = req.params.schedulerId
    try {
        const goals = await Goal.find({
            scheduler: { _id: schedulerId },
        })
            .populate('scheduler')
            .populate({
                path: 'player',
            })
            .populate('team')
            .sort({ atTime: 1 })
        res.json({
            success: true,
            goals,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống',
        })
    }
})

router.get('/details/:id', async (req, res) => {
    const id = req.params.id
    try {
        const goal = await Goal.findById(id)
            .populate('scheduler')
            .populate({
                path: 'player',
            })
            .populate('team')
            .sort({ atTime: 1 })
        res.json({
            success: true,
            goal,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống',
        })
    }
})

router.post('/', verifyToken, async (req, res) => {
    const { schedulerId, teamId, playerId, videoId, atTime } = req.body

    // Simple validation
    if (!schedulerId) {
        return res
            .status(400)
            .json({ success: false, message: 'Lịch thi đấu không tồn tại' })
    }
    if (!teamId) {
        return res
            .status(400)
            .json({ success: false, message: 'Đội bóng không tồn tại' })
    }
    if (!playerId) {
        return res
            .status(400)
            .json({ success: false, message: 'Cầu thủ không tồn tại' })
    }

    if (!atTime) {
        return res
            .status(400)
            .json({ success: false, message: 'Cần nhập phút ghi bàn' })
    }

    try {
        const newGoal = new Goal({
            scheduler: schedulerId,
            team: teamId,
            player: playerId,
            videoId,
            atTime,
        })
        await newGoal.save()

        const scheduler = await Scheduler.findByIdAndUpdate(
            schedulerId,
            { $push: { goals: newGoal._id } },
            { new: true, useFindAndModify: false }
        )

        const player = await Player.findByIdAndUpdate(
            playerId,
            { $push: { goals: newGoal._id } },
            { new: true, useFindAndModify: false }
        )

        res.json({
            success: true,
            message: 'Thành công',
            goal: newGoal,
            scheduler,
            player,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống',
        })
    }
})

module.exports = router

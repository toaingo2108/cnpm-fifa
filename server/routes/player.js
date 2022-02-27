const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Player = require('../models/Player')
const Team = require('../models/Team')

router.get('/:teamId', async (req, res) => {
    try {
        const players = await Player.find({
            team: { _id: req.params.teamId },
        })
            .populate('team', ['name'])
            .sort({ name: 1 })
        res.json({
            success: true,
            players,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống',
        })
    }
})

router.get('/details/:playerId', async (req, res) => {
    const playerId = req.params.playerId
    try {
        const player = await Player.findById(playerId)
            .populate('goals')
            .populate({
                path: 'goals',
                populate: { path: 'team' },
            })
            .populate({
                path: 'goals',
                populate: { path: 'player' },
            })
            .populate('team')
        res.json({
            success: true,
            player,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống',
        })
    }
})

router.get('/', async (req, res) => {
    try {
        const players = await Player.find()
            .populate('team', ['name'])
            .sort({ name: 1 })
        res.json({
            success: true,
            players,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống',
        })
    }
})

// @route POST api/players
// @desc Create player
// @access Private
router.post('/', verifyToken, async (req, res) => {
    const { name, age, position, number, avatar, height, weight, teamId } =
        req.body

    // simple validation
    if (!teamId) {
        return res
            .status(400)
            .json({ success: false, message: 'Team is required' })
    }
    if (!name) {
        return res
            .status(400)
            .json({ success: false, message: 'Name is required' })
    }
    if (!position) {
        return res.status(400).json({
            success: false,
            message: 'Please choose a position for the player',
        })
    }

    try {
        const newPlayer = new Player({
            name,
            age,
            position,
            number,
            avatar,
            height,
            weight,
            goals: [],
            team: teamId,
        })
        await newPlayer.save()

        res.json({
            success: true,
            message: 'Thành công',
            player: newPlayer,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống',
        })
    }
})

// @route PUT api/players
// @desc Update player
// @access Private
router.put('/:id', verifyToken, async (req, res) => {
    const { name, age, position, number, avatar, height, weight, scored } =
        req.body

    // simple validation
    if (!name) {
        return res
            .status(400)
            .json({ success: false, message: 'Name is required' })
    }
    if (!position) {
        return res.status(400).json({
            success: false,
            message: 'Please choose a position for the player',
        })
    }

    try {
        let updatedPlayer = {
            name,
            age: age || '',
            position,
            number: number || '',
            avatar: avatar || '',
            height: height || '',
            weight: weight || '',
            scored: scored,
        }

        const playerUpdateCondition = { _id: req.params.id, user: req.userId }
        updatedPlayer = await Player.findOneAndUpdate(
            playerUpdateCondition,
            updatedPlayer,
            { new: true }
        )

        // User not authorized to update player or player not found
        if (!updatedPlayer) {
            return res.status(401).json({
                success: false,
                message: 'Player not found or user not authorized',
            })
        }

        res.json({
            success: true,
            message: 'Excellent progress!',
            player: updatedPlayer,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống',
        })
    }
})

// @route DELETE api/players
// @desc Delete player
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const playerDeleteCondition = { _id: req.params.id, user: req.userId }
        const deletedPlayer = await Player.findOneAndDelete(
            playerDeleteCondition
        )

        // User not authorized to delete player or player not found
        if (!deletedPlayer) {
            return res.status(401).json({
                success: false,
                message: 'Player not found or user not authorized',
            })
        }

        res.json({
            success: true,
            message: 'Excellent progress!',
            player: deletedPlayer,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống',
        })
    }
})

module.exports = router

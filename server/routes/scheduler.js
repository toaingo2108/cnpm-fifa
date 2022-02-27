const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Scheduler = require('../models/Scheduler')
const Team = require('../models/Team')
const Tournament = require('../models/Tournament')

router.get('/:tournamentId', async (req, res) => {
    const tournamentId = req.params.tournamentId
    try {
        const schedulers = await Scheduler.find({
            tournament: { _id: tournamentId },
        })
            .populate('team1')
            .populate('team2')
            .populate('goals')
            .sort([['time', 1]])
        res.json({
            success: true,
            schedulers,
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
        const scheduler = await Scheduler.findById(id)
            .populate('team1')
            .populate('team2')
            .populate('goals')
        res.json({
            success: true,
            scheduler,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống',
        })
    }
})

router.post('/:tournamentId', verifyToken, async (req, res) => {
    const tournamentId = req.params.tournamentId
    try {
        const tournament = await Tournament.findById(tournamentId)
        const { teams } = tournament
        const TeamsLength = teams.length

        // Validate
        if (teams.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Giải đấu không tồn tại đội nào',
            })
        }

        let team1 = {}
        let team2 = {}

        let newScheduler = {}
        for (let i = 0; i < TeamsLength; i++) {
            for (let j = i + 1; j < TeamsLength; j++) {
                team1 = teams[i]._id
                team2 = teams[j]._id
                let time = new Date()
                time.setDate(
                    time.getDate() + Math.floor(Math.random() * 10) + 1
                )
                // console.log(time)
                newScheduler = new Scheduler({
                    tournament: tournamentId,
                    team1,
                    team2,
                    time,
                })

                // console.log(newScheduler)
                await newScheduler.save()
            }
        }
        await tournament.updateOne({ status: 'Going on' })

        res.json({
            success: true,
            message: 'Đã tạo lịch thi đấu!',
            tournament,
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

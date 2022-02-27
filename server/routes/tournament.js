const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Tournament = require('../models/Tournament')
const Team = require('../models/Team')

router.get('/', async (req, res) => {
    try {
        const tournaments = await Tournament.find()
            .populate('teams')
            .sort({ name: 1 })
        res.json({
            success: true,
            tournaments,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống',
        })
    }
})

router.get('/search/:key', async (req, res) => {
    const key = req.params.key
    try {
        const tournaments = await Tournament.find({
            name: { $regex: key },
        })
            .populate('teams')
            .sort({ name: 1 })
        res.json({
            success: true,
            tournaments,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống',
        })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const tournament = await Tournament.findById(req.params.id).populate(
            'teams'
        )

        res.json({
            success: true,
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

router.post('/', verifyToken, async (req, res) => {
    const tournament = req.body

    try {
        const tournamentT = await Tournament.findOne({ name: tournament.name })
        if (tournamentT) {
            return res.status(400).json({
                success: false,
                message: 'Tên giải đấu đã tồn tại',
            })
        }
        const newTournament = await Tournament.create(tournament)
        res.json({
            success: true,
            message: 'Thành công',
            tournament: newTournament,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống',
        })
    }
})

router.put('/addTeam/:id', verifyToken, async (req, res) => {
    const tournamentId = req.params.id
    const { teamId } = req.body
    try {
        const updatedTournament = await Tournament.findByIdAndUpdate(
            tournamentId,
            { $push: { teams: teamId } },
            { new: true, useFindAndModify: false }
        )

        await Team.findByIdAndUpdate(
            teamId,
            { $push: { tournaments: tournamentId } },
            { new: true, useFindAndModify: false }
        )

        res.json({
            success: true,
            message: 'Thành công!',
            tournament: updatedTournament,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống',
        })
    }
})

router.put('/:id', verifyToken, async (req, res) => {
    const tournamentId = req.params.id
    const { name, description, status } = req.body

    try {
        let updatedTournament = {
            name,
            description: description || '',
            status,
        }

        updatedTournament = await Tournament.findByIdAndUpdate(
            tournamentId,
            updatedTournament,
            { new: true }
        )

        res.json({
            success: true,
            message: 'Thành công!',
            tournament: updatedTournament,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống',
        })
    }
})

router.delete('/:id', verifyToken, async (req, res) => {
    const tournamentId = req.params.id
    try {
        // const tournament = await Tournament.findById(tournamentId)

        // const deleteTournamentOnTeam = ({ teams }) => {
        //     teams.map((team) => Team.findByIdUpdate(
        //         team._id,
        //         {}
        //         ))
        // }

        // await deleteTournamentOnTeam(tournament)

        const deletedTournament = await Tournament.findByIdAndDelete(
            tournamentId
        )
        res.json({
            success: true,
            message: 'Thành công!',
            tournament: deletedTournament,
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

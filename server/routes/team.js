const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Team = require('../models/Team')

router.get('/', async (req, res) => {
    try {
        const teams = await Team.find()
            .populate('tournaments', '-__v -teams')
            .sort({ name: 1 })

        res.json({
            success: true,
            teams,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống',
        })
    }
})

router.get('/details/:teamId', async (req, res) => {
    const teamId = req.params.teamId
    try {
        const team = await Team.findById(teamId).populate(
            'tournaments',
            '-__v -teams'
        )

        res.json({
            success: true,
            team,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống',
        })
    }
})

router.get('/:tournamentId', async (req, res) => {
    try {
        const teams = await Team.find({
            tournaments: { _id: req.params.tournamentId },
        })
            .populate('tournaments')
            .sort({ name: 1 })
        res.json({
            success: true,
            teams,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống',
        })
    }
})

router.get('/canAdd/:tournamentId', async (req, res) => {
    const tournamentId = req.params.tournamentId
    try {
        const teams = await Team.find({
            tournaments: { $ne: { _id: tournamentId } },
        }).populate('tournaments')

        res.json({
            success: true,
            teams,
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
    const team = req.body
    const { name } = team
    try {
        const checkTeam = await Team.findOne({ name })
        if (checkTeam) {
            return res
                .status(400)
                .json({ success: false, message: 'Tên đội bóng đã tồn tại' })
        }
        const newTeam = await Team.create(team)

        res.json({
            success: true,
            message: 'Thành công',
            team: newTeam,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống',
        })
    }
})

//
// router.put('/:id', verifyToken, async (req, res) => {
//     const { name, playerOrder, logo, trainer } = req.body

//     // simple validation
//     if (!name) {
//         return res
//             .status(400)
//             .json({ success: false, message: 'Name is required' })
//     }

//     try {
//         const team = await Team.findOne({ name })
//         if (team) {
//             return res
//                 .status(400)
//                 .json({ success: false, message: 'Tên đội đã tồn tại' })
//         }
//         let updatedTeam = {
//             name,
//             playerOrder,
//             logo: logo || '',
//             trainer: trainer || '',
//         }

//         const teamUpdateCondition = { _id: req.params.id, user: req.userId }
//         updatedTeam = await Team.findOneAndUpdate(
//             teamUpdateCondition,
//             updatedTeam,
//             { new: true }
//         )

//         // User not authorized to update team or team not found
//         if (!updatedTeam) {
//             return res.status(401).json({
//                 success: false,
//                 message: 'Team not found or user not authorized',
//             })
//         }

//         res.json({
//             success: true,
//             message: 'Excellent progress!',
//             team: updatedTeam,
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             success: false,
//             message: 'Lỗi hệ thống',
//         })
//     }
// })

//
// router.delete('/:id', verifyToken, async (req, res) => {
//     try {
//         const teamDeleteCondition = { _id: req.params.id, user: req.userId }
//         const deletedTeam = await Team.findOneAndDelete(teamDeleteCondition)

//         // User not authorized to delete team or team not found
//         if (!deletedTeam) {
//             return res.status(401).json({
//                 success: false,
//                 message: 'Team not found or user not authorized',
//             })
//         }

//         res.json({
//             success: true,
//             message: 'Excellent progress!',
//             team: deletedTeam,
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             success: false,
//             message: 'Lỗi hệ thống',
//         })
//     }
// })

module.exports = router

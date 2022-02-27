const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/auth')

const User = require('../models/User')

// @route GET api/auth
// @desc Check if user is logged in
// @access Public
router.get('/', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password')
        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: 'Không tìm thấy người dùng' })
        }
        res.json({ success: true, user })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống',
        })
    }
})

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', async (req, res) => {
    const { username, password } = req.body

    // Simple validation
    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: 'Username hoặc password chưa phù hợp',
        })
    }

    try {
        // Check for existing user
        const user = await User.findOne({ username })
        if (user) {
            return res
                .status(400)
                .json({ success: false, message: 'Username đã tồn tại' })
        }

        // All good

        // hash password
        const hashedPassword = await argon2.hash(password)
        const newUser = new User({
            username,
            password: hashedPassword,
        })

        // save newUser
        await newUser.save()

        // Return token
        const accessToken = jwt.sign(
            { userId: newUser._id },
            process.env.ACCESS_TOKEN_SECRET
        )

        res.json({
            success: true,
            message: 'Đăng ký thành công!',
            accessToken,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Lỗi hệ thống',
        })
    }
})

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post('/login', async (req, res) => {
    const { username, password } = req.body

    // Simple validation
    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: 'Username hoặc password chưa phù hợp',
        })
    }

    try {
        // Check for existing user
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Username hoặc password chưa chính xác',
            })
        }
        // Username found
        const passwordValid = await argon2.verify(user.password, password)
        if (!passwordValid) {
            return res.status(400).json({
                success: false,
                message: 'Username hoặc password chưa chính xác',
            })
        }

        // All good
        // Return token
        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET
        )

        res.json({
            success: true,
            message: 'Đăng nhập thành công!',
            accessToken,
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

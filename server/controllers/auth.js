import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import Users from '../models/authSchema.js'

export const signup = async (req, res) => {
    try {

        const { name, email, password } = req.body
        const existingUser = await Users.findOne({ email: email })

        //Check if email already exists or not ?
        if (existingUser) { return res.status(404).json({ message: "User already exists!" }) }

        // Hash password and save user to DB
        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = await Users.create({
            name,
            email,
            password: hashedPassword
        })

        // Assign Token
        const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.status(201).json({
            status: 'Success',
            token,
            message: "User created",
            user: newUser
        })


    } catch (err) { res.status(500).json({ message: 'SOmething went wrong' }) }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const existingUser = await Users.findOne({ email: email })

        //Check User on Basis of Email
        if (!existingUser) { return res.status(404).json({ message: "Incorrect Credentials" }) }

        // Compare Password
        const correctPassword = await bcrypt.compare(password, existingUser.password)

        if (!correctPassword) { return res.status(404).json({ message: "Invalid Credentials" }) }

        // Generate token
        const token =  jwt.sign({ email, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' })

        // Send Token
        res.status(201).json({
            status: 'Success',
            token,
            user: existingUser
        })

    } catch (err) {
        res.status(500).json({ message: 'SOmething went wrong' })
    }

}
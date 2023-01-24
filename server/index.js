import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import Stripe from 'stripe'
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const stripe = new Stripe("sk_test_51MRccSSBHS26neoyD9rRLQaZA0NA9Md2xndOfdTYE71RxTJpi93n2xYN3FopTvXlbb8gaRY0FDibPyesPXysvUid006YWvjw2D")

import { createPost } from './controllers/Posts.js';
import { handlePayment } from './routes/payment.js';

import userRoutes from './routes/userRoutes.js'
import questionRouter from './routes/QuestionRoutes.js'
import answerRoutes from './routes/answerRoutes.js';
import postRouter from './routes/postRoutes.js';

import multer from 'multer';
const upload = multer({ dest: 'uploads/' })
dotenv.config({ path: './config.env' })
const app = express();


// MIDDLEWARES
app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true}))
app.use(cors())
app.use('/uploads',express.static('uploads'))

app.use('/user', userRoutes)
app.use('/questions', questionRouter)
app.use('/answer', answerRoutes)
app.post('/post/create',upload.single('image'),createPost)
app.use('/post', postRouter)
app.post('/payment',cors(), handlePayment)
app.get('/', (req, res) => {
    res.send("Hello from backend")
})

// DATABASE CONNECTION 
const PORT = process.env.PORT
const DB = process.env.CONNECTION_URL
mongoose.set('strictQuery', true)
mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log(`DB Connection Success`) })
    .catch(err => { console.log(err) })


app.listen(PORT, () => { console.log(`Server Running on PORT:${PORT}`) })
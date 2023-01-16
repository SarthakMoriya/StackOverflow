import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes.js'
import questionRouter from './routes/QuestionRoutes.js'
import answerRoutes from './routes/answerRoutes.js';

dotenv.config({path:'./config.env'})
const app = express();


// MIDDLEWARES
app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.use('/user',userRoutes)
app.use('/questions',questionRouter)
app.use('/answer',answerRoutes)

// DATABASE CONNECTION 
const PORT=process.env.PORT 
const DB =process.env.CONNECTION_URL 
mongoose.set('strictQuery', true)
mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => { console.log(`DB Connection Success`) })
.catch(err => { console.log(err)  })


app.listen(PORT, () => { console.log(`Server Running on PORT:${PORT}`) })
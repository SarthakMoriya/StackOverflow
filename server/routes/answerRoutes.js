import express from 'express'
import {postAnswer,deleteAnswer} from '../controllers/Answers.js'


const answerRouter=express.Router();

answerRouter.patch('/post/:id',postAnswer)
answerRouter.patch('/delete/:id',deleteAnswer)

export default answerRouter;
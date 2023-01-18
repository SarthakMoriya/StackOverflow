import express from 'express'
import { askQuestion,getAllQuestions,deleteQuestion,voteQuestion } from '../controllers/Question.js'

const questionRouter = express.Router();

questionRouter.post('/ask', askQuestion)
questionRouter.get('/get',getAllQuestions)
questionRouter.delete('/delete/:id',deleteQuestion)
questionRouter.patch('/vote/:id',voteQuestion)

export default questionRouter;
import mongoose from "mongoose";
import Question from '../models/QuestionSchema.js'

export const postAnswer = async (req, res) => {
    try {
        const { id: _id } = req.params;
        const { noOfAnswers, answerBody, userAnswered, userId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send('question unavailable')
        }

        updateNoOfAnswers(_id, noOfAnswers)

        const updatedQuestion = await Question.findOneAndUpdate(_id, { $addToSet: { 'answer': [{ answerBody, userAnswered, userId }] } })
        //addtoset means append to it answer wali aarray me append krdo

        res.status(200).json(updatedQuestion)

    } catch (error) {
        res.status(400).json(error)
    }
}

const updateNoOfAnswers = async (_id, noOfAnswers) => {
    try {
        await Question.findOneAndUpdate(_id, { $set: { 'noOfAnswers': noOfAnswers } })
    } catch (error) {
        console.log(error);
    }
}

export const deleteAnswer = async (req, res) => {
    try {
        const { id: _id } = req.params;
        const { answerId, noOfAnswers } = req.body;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send('question unavailable')
        }

        if (!mongoose.Types.ObjectId.isValid(answerId)) {
            return res.status(404).send('question unavailable')
        }

        await Question.updateOne({ _id }, { $pull: { 'answer': { _id: answerId } } })
        res.status(200).json({ message: "Successffuulllyy ddeelleetteedd!!" })
    } catch (error) {
        return res.status(404).send('question unavailable')
    }
}
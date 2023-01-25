import mongoose from "mongoose";
import Question from '../models/QuestionSchema.js'


const updateNoOfAnswers = async (_id, noOfAnswers) => {
    try {
        console.log(_id);
        await Question.findByIdAndUpdate(_id, { $set: { 'noOfAnswers': noOfAnswers } })
    } catch (error) {
        console.log(error);
    }
}

export const postAnswer = async (req, res) => {
    try {
        const { id: _id } = req.params;
        const { noOfAnswers, answerBody, userAnswered, userId } = req.body;

        // if (!mongoose.Types.ObjectId.isValid(_id)) {
        //     return res.status(404).send('question unavailable')
        // }
        updateNoOfAnswers(_id, noOfAnswers)
        
        const updatedQuestion = await Question.findByIdAndUpdate(_id, { $addToSet: { 'answer': [{ answerBody, userAnswered, userId }] } })
        //addtoset means append to it answer wali aarray me append krdo
        // console.log("Question ID",_id);
        // console.log("Question ID",id);
        console.log(updatedQuestion._id);
        res.status(200).json(updatedQuestion)

    } catch (error) {
        res.status(400).json(error )
    }
}



export const deleteAnswer = async ( req, res ) => {
    const { id:_id } = req.params;
    const { answerId, noOfAnswers } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('Question unavailable...');
    }
    if(!mongoose.Types.ObjectId.isValid(answerId)){
        return res.status(404).send('Answer unavailable...');
    }
    updateNoOfAnswers( _id, noOfAnswers)
    try{
        await Question.updateOne(
            { _id }, 
            { $pull: { 'answer': { _id: answerId } } }
        )
        res.status(200).json({ message: "Successfully deleted..."})
    }catch(error){
        res.status(405).json(error)
    }
}
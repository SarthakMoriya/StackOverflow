import mongoose from 'mongoose';

const QuestonSchema = mongoose.Schema({
    questionTitle: { type: String, required: [true, 'A question must have a title'] },
    questionBody: { type: String, required: [true, 'A question must have a body'] },
    questionTags: { type: [String], required: [true, 'A question must have Related Tags'] },
    noOfAnswers: { type: Number, default: 0 },
    upVote: { type: [String], default: [] },
    downVote: { type: [String], default: [] },
    userPosted: { type: String, required: [true, 'Question must have a author'] },
    askedOn: { type: Date, default: Date.now },
    answer: [{
        answerBody: String,
        userAnswered: String,
        userId: String,
        answeredOn: { type: Date, default: Date.now }
    }],
    userId:String
})

const Question=mongoose.model('Question',QuestonSchema)

export default Question
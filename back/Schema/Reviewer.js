const mongoose = require('mongoose')

const reviewerSchema = new mongoose.Schema({
    name: String,
    description: String,
    cards: [
        {
            _id: {type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId()},
            question: String,
            answer: String,
            isCorrect: Boolean,
        }
    ]
})

const reviewerModel = mongoose.model('Reviewer', reviewerSchema)

module.exports = reviewerModel
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const reviewerModel = require('./Schema/Reviewer')

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3001, () => {
    console.log('Server running on port 3001')
})

mongoose.connect('mongodb+srv://mikedacanay6:mikedacanay6@flashcards.73nwv.mongodb.net/?retryWrites=true&w=majority&appName=FlashCards', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB')
}).catch((err) => {
    console.log(err)
})

app.post('/add', (req, res) => {
    const { name, description } = req.body

    reviewerModel.create({ name, description })
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err))
})

app.get('/reviewers', (req, res) => {
    reviewerModel.find()
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err))
})

app.get('/reviewers/:id', (req, res) => {
    const { id } = req.params

    reviewerModel.findById(id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err))
})

app.delete('/reviewers/:id', (req, res) => {
    const { id } = req.params
    
    reviewerModel.findByIdAndDelete(id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err))
})

app.patch('/reviewers/:id', (req, res) => {
    const { id } = req.params
    const { name, description, cards } = req.body

    reviewerModel.findByIdAndUpdate(id, { name, description, cards }, { new: true })
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err))
})


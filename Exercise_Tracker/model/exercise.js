const mongoose = require('mongoose');

const exercise = new mongoose.Schema({
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('Exercise', exercise);
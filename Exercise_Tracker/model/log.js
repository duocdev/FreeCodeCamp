const mongoose = require('mongoose');

const log = new mongoose.Schema({
    log: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Exercise',
        required: true
    }],
    user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
    count: { type: Number }
})

module.exports = mongoose.model('Log', log);
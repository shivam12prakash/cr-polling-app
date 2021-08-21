const mongoose = require('mongoose')


const Schema = mongoose.Schema;

const crVotesSchema = new Schema({
    party: {
        type: String,
        required: true
    },
    points: {
        type: String,
        required: true
    }
})


const Crvotes = mongoose.model('Crvotes', crVotesSchema);

module.exports = Crvotes;
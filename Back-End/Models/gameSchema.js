const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },

})

//Create Model
const Games = new mongoose.model("Games", gameSchema);

module.exports = Games;
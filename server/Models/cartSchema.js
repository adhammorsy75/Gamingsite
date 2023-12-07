const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    games: [
        {
            game: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Games',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
});

// Create Model
const Cart = mongoose.model("Carts", CartSchema);

module.exports = Cart;

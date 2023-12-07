const Cart = require("../Models/cartSchema");
const cartController = {}

cartController.fetchCart = async (req, res) => {
    try {
        const user = req.params.userID;
        const cart = await Cart.findOne({ user })
            .populate('user')
            .populate('games.game');
        if (cart) {
            res.status(200).json(cart);
        }
        else {
            res.status(404).send('Cart Not Found');
        }
    } catch (error) {
        console.log('Error while fetching cart ', error);
        res.status(500).send('Internal Server Error');
    }
};

cartController.createCart = async (req, res) => {
    try {
        const { gameID, userID, quantity } = req.body;

        // Check if the user has an existing cart
        let userCart = await Cart.findOne({ user: userID });

        // If the user doesn't have a cart, create a new one with the data from the request
        if (!userCart) {
            userCart = new Cart({
                user: userID,
                games: [{ game: gameID, quantity }],
            });
        } else {

            // Check if the game is already in the cart
            const existingGameIndex = userCart.games.findIndex(game => game.game.equals(gameID));

            if (existingGameIndex !== -1) {

                // If the game is already in the cart, update the quantity
                userCart.games[existingGameIndex].quantity += quantity;
            } else {

                // If the game is not in the cart, add it
                userCart.games.push({ game: gameID, quantity });
            }
        }
        // Save the updated cart
        await userCart.save();
        res.status(200).send('Cart Updated!');
    } catch (error) {
        console.error('Error while creating cart ', error);
        res.status(500).send('Internal Server Error');
    }
};

cartController.clearCart = async (req, res) => {
    try {
        const cartID = req.params.cartID;
        await Cart.findOneAndDelete({ _id: cartID });
        res.status(200).send('Cart Cleared');
    } catch (error) {
        console.error('Error while clearing cart ', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = cartController;
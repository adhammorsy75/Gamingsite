const express = require('express');
const cors = require('cors');
// const mongoose = require('mongoose');
require('dotenv').config();

//Express Server Setup
const app = express();
const port = process.env.PORT || 3002;

//MongoDB Databse
const DB = require('./DB');

//Express Middlewares
app.use(express.json());
app.use(cors());

//show route controllers
const userController = require('./Controllers/userController')
const gameController = require('./Controllers/gameController');
const cartController = require('./Controllers/cartController');

//Server status endpoint
app.get('/', (req, res) => {
    res.send('Server is Up!');
});

//Users Routes
app.post('/user/login', userController.login)
app.post('/user/register', userController.register);

//Games Routes
app.get('/games/fetch', gameController.fetchGames);

//Cart Routes
app.post('/cart/create', cartController.createCart);
app.get('/cart/fetch/:userID', cartController.fetchCart);
app.delete('/cart/clear/:cartID', cartController.clearCart);

app.listen(port, () => {
    console.log(`Node/Express Server is Up......\nPort: localhost:${port}`);
});

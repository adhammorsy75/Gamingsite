const Game = require("../Models/gameSchema");
const gameController = {}
gameController.fetchGames = async (req, res) => {
    try {
        const games = await Game.find();
        if (games && games.length > 0) {
            res.status(200).json(games);
        }
        else {
            res.status(404).send('No Games Found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const CreateGame = async () => {
    const game = new Game({
        name: 'GTA ^',
        details: 'Online shooter game ',
        image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/intermediary/f/10dcc543-7e30-4a6f-8fc0-a00134700b8c/d950ij0-aa860152-fbf7-4dcd-89cd-c71cb12e2c8a.jpg'
    });
    const savedGame = await game.save();
    if (savedGame) {
        console.log('Game Created');
    }
}
CreateGame();

module.exports = gameController;

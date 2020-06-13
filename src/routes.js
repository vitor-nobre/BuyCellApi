const express = require('express');
const ProdutoController = require('./controllers/ProdutoController')
//const DevController = require('./controllers/DevController');
//const LikeController = require('./controllers/LikeController');
//const DislikeController = require('./controllers/DislikeController');
const routes = express.Router();

routes.get('/produtos',ProdutoController.index)
//routes.post('/devs',DevController.store);
//routes.post('/devs/:devId/likes',LikeController.store);
//routes.post('/devs/:devId/dislikes',DislikeController.store);

module.exports = routes;
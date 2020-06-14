const express = require('express')
const { celebrate, Joi } = require('celebrate')
const ProdutoController = require('./controllers/ProdutoController')

const routes = express.Router();

routes.get('/produtos', ProdutoController.index)

routes.post('/produto',
    celebrate({
        body: Joi.object().keys({
            modelo: Joi.string().required(),
            marca: Joi.string().required(),
            description: Joi.string().required(),
            preco: Joi.number().required(),
            image: Joi.string().required(),
            armazenamento: Joi.number().required(),
            ram: Joi.number().required(),
            cor: Joi.string().required(),
            so: Joi.string().required(),
            tela:Joi.string().required(),
            bateria: Joi.number().required()
        })
    },{
        abortEarly: false,
    }), 
    ProdutoController.create
)
routes.delete('/produto', ProdutoController.delete)

routes.put('/produto', ProdutoController.update)


module.exports = routes;
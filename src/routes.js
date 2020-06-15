const express = require('express')
const { celebrate, Joi } = require('celebrate')
const ProdutoController = require('./controllers/ProdutoController')
const UsuarioController = require('./controllers/UsuarioController')
const FuncionarioController = require('./controllers/FuncionarioController')

const routes = express.Router()

routes.get('/produto', ProdutoController.index)

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

routes.get('/usuario', UsuarioController.index)

routes.post('/usuario',
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            password: Joi.string().required(),
            number: Joi.number().required(),
            cpf: Joi.number().required(),
        })
    },{
        abortEarly: false,
    }), 
    UsuarioController.create
)
routes.delete('/usuario', UsuarioController.delete)

routes.put('/usuario', UsuarioController.update)


module.exports = routes;
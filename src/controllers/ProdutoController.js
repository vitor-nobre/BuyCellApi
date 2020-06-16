const firebase = require('../config/firebase')

module.exports = {

    async index(req, res){
        const produtos = []

        await firebase.firestore()
            .collection("products")
            .get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    const { marca, 
                            description, 
                            preco, 
                            image, 
                            armazenamento, 
                            ram, 
                            cor, 
                            so, 
                            tela, 
                            bateria 
                        } = doc.data()

                    const produto = {
                        modelo:doc.id,
                        marca, 
                        description, 
                        preco, 
                        image, 
                        armazenamento, 
                        ram, 
                        cor, 
                        so, 
                        tela, 
                        bateria
                    }
                    produtos.push(produto)
                })
            })
            .catch((err) => {
                console.log('Error getting documents', err)
            })
            
       return res.json(produtos)
    },

    async show(req, res){
        const { modelo } = req.params

        let produto = {}

        await firebase.firestore()
            .collection("products")
            .doc(modelo)
            .get()
            .then(snapshot => {
                if(snapshot) {
                    
                    const { marca, 
                            description, 
                            preco, 
                            image, 
                            armazenamento, 
                            ram, 
                            cor, 
                            so, 
                            tela, 
                            bateria 
                        } = snapshot.data()

                    produto = {
                        modelo:snapshot.id,
                        marca, 
                        description, 
                        preco, 
                        image, 
                        armazenamento, 
                        ram, 
                        cor, 
                        so, 
                        tela, 
                        bateria
                    }
                    
                }
            })
            .catch((err) => {
                console.log('Error getting documents', err)
            })
            
       return res.json(produto)
    },

    async create(req, res) {
        const { modelo, 
                marca, 
                description, 
                preco, 
                image, 
                armazenamento, 
                ram, 
                cor, 
                so, 
                tela, 
                bateria 
            } = req.body

        await firebase.firestore()
            .collection('products').doc(modelo).set({
                marca,
                description,
                preco, 
                image, 
                armazenamento, 
                ram, 
                cor, 
                so, 
                tela, 
                bateria
            })
    
        return res.status(200).json({ message: "Success"})
        
    },

    async delete(req, res) {
        const { modelo } = req.headers

        if(!modelo){
            return res.status(404).json({ message:"Erro modelo não especificado" })
        }

        await firebase.firestore()
            .collection('products')
            .doc(modelo)
            .delete()
       
        return res.status(200).json({ result: "OK"})
    },

    async update(req, res) {

        const { modelo, 
            marca, 
            description, 
            preco, 
            image, 
            armazenamento, 
            ram, 
            cor, 
            so, 
            tela, 
            bateria 
        } = req.body

        await firebase.firestore()
            .collection('products').doc(modelo).set({
                marca,
                description,
                preco, 
                image, 
                armazenamento, 
                ram, 
                cor, 
                so, 
                tela, 
                bateria
            })

        return res.status(200).json({ message: "Success"})
    }
}
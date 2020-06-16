const firebase = require('../config/firebase')

module.exports = {

    async index(req, res){
        const usuarios = []

        await firebase.firestore()
            .collection("users")
            .get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    const { 
                        email,
                        name,
                        number,
                        } = doc.data()

                    const produto = {
                        cpf:doc.id,
                        email,
                        name,
                        number,
                    }
                    usuarios.push(produto)
                })
            })
            .catch((err) => {
                console.log('Error getting documents', err)
            })
            
       return res.json(usuarios)
    },

    async show(req, res){

        const { cpf } = req.params

        let usuario = {}

        await firebase.firestore()
            .collection("users")
            .doc(cpf)
            .get()
            .then(doc => {
                if(doc) {
                    const { 
                        email,
                        name,
                        number,
                        password
                        } = doc.data()

                    usuario = {
                        cpf:doc.id,
                        email,
                        name,
                        number,
                        password
                    }
                }
            })
            .catch((err) => {
                console.log('Error getting documents', err)
            })
       return res.json(usuario)
    },

    async create(req, res) {
        
        const { 
            cpf,
            name,
            email,
            number,
            password, 
            } = req.body

        await firebase.firestore()
            .collection('users').doc(cpf.toString()).set({
                email,
                name,
                number,
                password,
            })
    
        return res.status(200).json({ message: "Success"})
        
    },

    async delete(req, res) {
        const { cpf } = req.headers

        if(!cpf){
            return res.status(404).json({ message:"Erro email não especificado" })
        }

        await firebase.firestore()
            .collection('users')
            .doc(cpf.toString())
            .delete()
       
        return res.status(200).json({ result: "OK"})
    },

    async update(req, res) {

        const { 
            cpf,
            name,
            email,
            number,
            password, 
            } = req.body

        await firebase.firestore()
            .collection('users').doc(cpf.toString()).set({
                email,
                name,
                number,
                password,
            })
    
        return res.status(200).json({ message: "Success"})
    }
}
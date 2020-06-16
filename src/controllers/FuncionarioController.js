const firebase = require('../config/firebase')

module.exports = {

    async index(req, res){
        const funcionarios = []

        await firebase.firestore()
            .collection("funcionarios")
            .get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    const { 
                        name,
                        number,
                        } = doc.data()

                    const funcionario = {
                        email:doc.id,
                        name,
                        number,
                    }
                    funcionarios.push(funcionario)
                })
            })
            .catch((err) => {
                console.log('Error getting documents', err)
            })
            
       return res.json(funcionarios)
    },

    async show(req, res){
        
        const { email } = req.params

        let funcionario = {}

        await firebase.firestore()
            .collection("funcionarios")
            .doc(email)
            .get()
            .then(doc => {
                if(doc) {
                    const { name, number, password } = doc.data()

                    funcionario = {
                        email:doc.id,
                        name,
                        number,
                        password
                    }
                }
            })
            .catch((err) => {
                console.log('Error getting documents', err)
            })
            
       return res.json(funcionario)
    },

    async create(req, res) {
        const { 
            name,
            email,
            number,
            password, 
            } = req.body

        await firebase.firestore()
            .collection('funcionarios').doc(email).set({
                name,
                number,
                password,
            })
    
        return res.status(200).json({ message: "Success"})
        
    },

    async delete(req, res) {
        const { email } = req.headers

        if(!email){
            return res.status(404).json({ message:"Erro email não especificado" })
        }

        await firebase.firestore()
            .collection('funcionarios')
            .doc(email)
            .delete()
       
        return res.status(200).json({ result: "OK"})
    },

    async update(req, res) {
        const { 
            name,
            email,
            number,
            password, 
            } = req.body

        await firebase.firestore()
            .collection('funcionarios').doc(email).set({
                name,
                number,
                password,
            })
    
        return res.status(200).json({ message: "Success"})
    }
}
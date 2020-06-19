const firebase = require('../config/firebase')

module.exports ={
    async index(req, res){
        const {email, password} = req.body;
        
     await firebase.auth().signInWithEmailAndPassword(email, password)
     .then((u) =>{
        console.log(u)
        return res.status(200).json({ message: "Success"})

    }).catch((err)=>{
        console.log(err)
        return res.status(500).json({ message: "ERRO"})

    })
    }
}
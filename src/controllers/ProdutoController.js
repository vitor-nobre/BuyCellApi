const firebase = require('../config/firebase')

module.exports = {
    async index(req, res){
        const produtos = []
        await firebase.firestore()
            .collection("Produtos")
            .get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    const { name, description, preco, url } = doc.data()
                    const  produto = {
                        id:doc.id,
                        name,
                        description,
                        preco,
                        url
                    }
                    produtos.push(produto)
                    //console.log(doc.id, doc.data())
                });
            })
            .catch((err) => {
                console.log('Error getting documents', err);
            })
        console.log(produtos)    
       return res.json(produtos);
    },

    async store(req, res) {
      /*  const { username } = req.body;
 
        const userExists = await Dev.findOne({ user : username }); 
        
        if(userExists){
            return res.json(userExists);
        }

        const response = await axios.get(`https://api.github.com/users/${username}`);
 
        const { name, bio, avatar_url: avatar }= response.data;

        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar
        })

        return res.json(dev);
        */
    }
}
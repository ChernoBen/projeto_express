class UserController{
    async index(req,res){}

    async create(req,res){
        console.log(req.body)
        return res.json({response:req.body})
        res.send("Pegando corpo da requisição!")

    }
}


module.exports = new UserController();
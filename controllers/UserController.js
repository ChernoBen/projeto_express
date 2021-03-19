class UserController{
    async index(req,res){}

    async create(req,res){
        console.log(req.body)
        //detruturing
        var {email,name,password} = req.body;
        
        if(email == undefined){

            return res.status(400).json({error:"Email undefined"})

        }else if(name == undefined){

            return res.status(400).json({error:"Name undefined"})

        }else if(password==undefined){

            return res.status(400).json({error:"Password undefined"})
        }

        return res.json({response:req.body})
        //res.send("Pegando corpo da requisição!")

    }
}


module.exports = new UserController();
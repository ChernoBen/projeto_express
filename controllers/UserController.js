var User = require("../models/User")
class UserController{
    async index(req,res){}

    async create(req,res){
 
        //detruturing
        var {email,name,password} = req.body;
        
        
        

        if(email == undefined){

            return res.status(400).json({error:"Email undefined"})

        }else if(name == undefined){

            return res.status(400).json({error:"Name undefined"})

        }else if(password==undefined){

            return res.status(400).json({error:"Password undefined"})
        }

        var email_exists = await User.findEmail(email).catch(err=>{
            
            console.log(err)
        })

        if (email_exists){

            return res.status(406).json({error:"Email já existe"})
        }

        await User.new(email,password,name).then(response=>{
            
            //console.log(res)
            return res.json({message:"Usuario cadastrado com sucesso"})

        }).catch(err=>{

            console.log(err)
            return res.status(400).json({err:err})
        })

        
        //res.send("Pegando corpo da requisição!")

    }
}


module.exports = new UserController();
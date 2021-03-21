const knex = require('../database/connection');
const User = require('./User');

class PasswordToken{

    async create(email){
       
        let user = await User.findByEmail(email).catch(error=>{

            return {status:false,error:"Email passado nao existe"}
        })

        if (user != undefined){

            await knex.insert({

                user_id:user.idusers,
                used:0,
                token:new Date()

            }).table('passwordTokens').then(rs=>{
                
                console.log(rs)
                return {status:true,message:"token gerado com sucesso!"}

            }).catch(err=>{

                return {status:false,error:"Email passado nao existe"}

            })

        }else{

            return {status:false,error:"Email passado nao existe"}
            
        }

    }
    async validade(token){
        
        try{

            var result = await knex.select().where({token:token}).table("passwordTokens")
            if(result.lengh > 0 ){

                var tk = result[0]
                if(tk.used){

                    return {status:false,token:token.token,id:token.user_id,message:"token já utilizado"}

                }else{

                    return {status:false,message:"token valido"}
                }
                
            }else{

                return {status:false,error:"falha ao obter token"}
            }

        }catch(e){

            console.log(error)
            return {status:false,error:"erro ao obter token"}
        }
        
    }

    async setUsed(token){

        await knex.update({used:1}).where({token:token}).table('passwordTokens')
        .then(response=>{
            
            return {status:true}
        })
        .catch(err=>{

            return {status:false}
        })
    }
   
}

module.exports = new PasswordToken()
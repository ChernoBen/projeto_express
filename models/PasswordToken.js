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
   
}

module.exports = new PasswordToken()
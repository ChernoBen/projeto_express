var knex = require("../database/connection")
var bcrypt = require("bcrypt")
const { response } = require("express")


class User {


    async findAll() {

        let result = await knex.select(["idusers","email","role","name"]).table("users").catch(err => {

            return []
        })

        return result
    }
    
    async findById(id){

        let result = await knex.select(["idusers","email","role","name"]).from("users").where({idusers:id}).catch(err => {

            return []
        })

        return result
    }

    async new(email, password, name) {

        var hash = await bcrypt.hash(password, 10).catch(error => {

            console.log(error)
        });

        await knex.insert({ email, password: hash, name, role: 0 }).table("users").catch(err => {

            console.log(err)
        })

    }

    async findEmail(email) {

        var result = await knex.select("email").from("users").where({ email: email }).catch(err => {

            console.log(err)

        })

        if (result.length > 0) {

            return true

        } else {

            return false
        }

    }

    async update(id,email,name,role){

        await this.findById(id).then(async rs=>{

            var edit_user = {}
            if (rs[0]){

                if (email != undefined){

                    if(email != rs.email){

                        let result = await this.findEmail(email)

                        if (!result){

                            edit_user.email = email

                        }else{

                            return {status:false, err:"email já existe"}
                        }

                    }

                }
                
                if (name != undefined){

                    if (name != rs.name){

                        edit_user.name = name
                        
                    }else{

                        return {status:false, err:"nome já existe"}
                    }
                }

                if (role !=undefined){

                    if(role != rs.role){

                        edit_user.role = role

                    }else{

                        return {status:false, err:"role já setado"}
                    }
                }

                await knex.update(edit_user).where({idusers:id}).table("users").then(response=>{

                    return {status:true}
                    
                }).catch(err=>{
                    
                    return {status:false, err:err}
                })

            }else{

                return {status:false,err:"usuario não existe"}
            }
        })
        
    }
}

module.exports = new User()
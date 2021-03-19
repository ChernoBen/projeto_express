var knex = require("../database/connection")
var bcrypt = require("bcrypt")


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

}

module.exports = new User()
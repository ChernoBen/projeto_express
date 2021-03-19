const { response } = require("express");
var User = require("../models/User")
class UserController {

    async index(req, res) {

        await User.findAll().then(response => {

            return res.json({ users: response })

        }).catch(err => {

            return res.status(400).json({ err: err })
        })


    }

    async findUser(req, res) {

        var id = req.params.id

        await User.findById(id).then(rs => {

            return res.json({ response: rs })

        }).catch(err => {

            return res.status(400).json({ error: err })
        })
    }

    async create(req, res) {

        //detruturing
        var { email, name, password } = req.body;

        if (email == undefined) {

            return res.status(400).json({ error: "Email undefined" })

        } else if (name == undefined) {

            return res.status(400).json({ error: "Name undefined" })

        } else if (password == undefined) {

            return res.status(400).json({ error: "Password undefined" })
        }

        var email_exists = await User.findEmail(email).catch(err => {

            console.log(err)
        })

        if (email_exists) {

            return res.status(406).json({ error: "Email já existe" })
        }

        await User.new(email, password, name).then(response => {

            //console.log(res)
            return res.json({ message: "Usuario cadastrado com sucesso" })

        }).catch(err => {

            console.log(err)
            return res.status(400).json({ err: err })
        })

    }

    async edit(req, res) {

        var { id, name, role, email } = req.body

        await User.update(id, email, name, role).then(response => {

            return res.json({ response: "Usuario atualizado com sucesso!" })

        }).catch(err => {

            return res.status(400).json({ error: err })
        })
    }

}

module.exports = new UserController();
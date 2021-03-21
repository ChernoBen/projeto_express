const User = require("../models/User");
const PasswordToken = require('../models/PasswordToken');
const jwt = require('jsonwebtoken');
const secret = '19216811';
const bcrypt = require("bcrypt");

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

    async remove(req, res) {

        let id = req.params.id

        await User.delete(id).then(response => {

            return res.json({ message: "Usuario removido com sucesso!" })

        }).catch(err => {

            return res.status(400).json({ error: "Falha ao deletar usuario!" })
        })
    }

    async recoverPassword(req, res) {

        let email = req.body.email;

        await PasswordToken.create(email).then(rs => {

            console.log("------->",rs,"<-------------")
            return res.json({ response: rs})


        }).catch(err => {

            return res.status(400).json({ error: "Falha ao obter token" })
        })
    }

    async changePassword(req,res){

        var token = req.body.token
        var password = req.body.password
        var isTokenValid = await PasswordToken.validade(token)

        if (isTokenValid.status){

            await User.changePassword(password,isTokenValid.user_id,isTokenValid.token)
            let result = await PasswordToken.setUsed(token)

            if ( !result.status ){

                return res.status(400).json({error:"erro ao setar token"})
            }
            
            return res.json({message:"senha alterada"})

        } else {

            return res.status(406).json({error:"token inválido"})
        }

    }

    async login(req,res){

        var {email,password} = req.body
        var user =  await User.findByEmail(email);

        if (user != undefined){

            var result = await bcrypt.compare(password,user.password);
            
            if (result){

                var token = jwt.sign({email:user.email,role:user.role},secret)
                return res.json({token:token})

            } else {

                return res.status(406).json({error:"senha incorreta"});
            }
            
        } else{

            return res.status(400).json({error:"Usuario nao encontrado"})
        }
    }
}

module.exports = new UserController();
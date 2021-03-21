const jwt = require('jsonwebtoken');
const secret = '19216811';

module.exports = function (req, res, next) {

    //verifica se o usuario está logado
    // se autenticado, user está liberado para as rotas
    const authToken = req.headers['authorization']

    if (authToken != undefined) {

        const bearer = authToken.split(' ')
        var token = bearer[1]
        try {
            
            var decoded = jwt.verify(token, secret);

            if (decoded.role ==  1){
                next();
            }

            return res.status(403).json({error:"voce não possui permissão de adm"})

        } catch (e) {

            return res.status(403).json({error:'token inválido!'})

        }
        

    } else {

        return res.status(403).json({ error: "usuario não atorizado!" })
    }
}
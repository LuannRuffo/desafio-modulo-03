const jwt = require('jsonwebtoken')
require('dotenv').config()
const pool = require('../conexao')

const autenticarToken = async (req, res, next) => {

    const { authorization } = req.headers

    if (!authorization) {

        return res.status(401).json({
            mensagem: "Você precisa estar logado para acessar esta página."
        })
    }

    const token = authorization.split(' ')[1]
    
    try {

        const { id } = jwt.verify(token, process.env.SENHA_SEGURA)
        const usuario = await pool.query(
            'select * from usuarios where id = $1', [id]
        )

        if (!usuario) {

            return res.status(401).json({
                mensagem: "Usuário não autorizado."
            })
        }

        req.usuario = usuario.rows

        next()        

    } catch (error) {
        
        return res.status(401).json({
            mensagem: "Usuário não autorizado."
        })
    }
}

module.exports = autenticarToken
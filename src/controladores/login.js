const pool = require('../conexao')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const login = async (req, res) => {

    try {

        const { email, senha } = req.body

        if (!email || !senha) {
            return  res.status(400).json({
                mensagem: "Email e senha são obrigatórios."
            })
        }

        const usuario = await pool.query(
            'select * from usuarios where email = $1',[email]
        )

        if (usuario.rowCount === 0) {

            return res.status(404).json({
                mensagem: "Senha ou email incorreto"
            })
        }

        if (!await bcrypt.compare(senha, usuario.rows[0].senha)) {

            return res.status(404).json({
                mensagem: "Senha ou email incorreto"
            })
        }

        let { senha: senhaUsuario, ...usuarioSemSenha } = usuario.rows[0]

        const token = jwt.sign(
            {
                id: usuarioSemSenha.id,
                email: usuarioSemSenha.email
            },
            process.env.SENHA_SEGURA,
            {
                'expiresIn': '8h'
            }
        )

        return res.status(200).json({
            mensagem: usuarioSemSenha,
            token
        })

        
    } catch (error) {
        
        return res.status(500).json({
            mensagem: error.message
        })
    }
}

module.exports = login
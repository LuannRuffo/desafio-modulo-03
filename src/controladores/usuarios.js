const pool = require('../conexao')
const bcrypt = require('bcrypt')

const cadastroUsuario = async (req, res) => {
    
    try {

        const { nome, email, senha } = req.body

        if (!nome || !email || !senha) {
            return res.status(400).json({
                 mensagem: "Todos os campos devem ser obrigatórios."
                })
        }

        const verificarEmail = await pool.query(
            'select * from usuarios where email = $1', [email]
            )
        
        if (verificarEmail.rowCount > 0) {
            return res.status(400).json({
                mensagem: "Já existe cadastro com esse e-mail"
            })
        }

        const senhaCryptografada = await bcrypt.hash(senha, 10)

        const cadastro = await pool.query(
            `insert into usuarios
            (nome, email, senha)
            values ($1, $2, $3)
            returning id, nome, email;
            `,
            [nome, email, senhaCryptografada]
        )

        if (cadastro.rowCount === 0) {
            return  res.status(400).json({
                mensagem: "Não foi possivel efetuar o cadastro"
            })
        }

        return res.status(201).json(cadastro.rows[0]);
    
    } catch (error) {

        return res.status(500).json({ mensagem: error.message })
    }
}

const detalharUsuario = (req, res) => {
    
    const { id, nome, email } = req.usuario[0]

    return res.status(200).json({
        id,
        nome,
        email
    })
}

const atualizarUsuario = async (req, res) => {

  try {

    const { nome, email, senha } = req.body

    if (!nome || !email || !senha) {
        return res.status(400).json({
             mensagem: "Todos os campos devem ser obrigatórios."
            })
    }

    const verificarEmail = await pool.query(
        'select * from usuarios where email = $1', [email]
        )
    
    if (verificarEmail.rowCount > 0) {
        return res.status(400).json({
            mensagem: "Já existe cadastro com esse e-mail"
        })
    }

    const senhaCryptografada = await bcrypt.hash(senha, 10)

    await pool.query(
        `update usuarios
        set nome = $1,
        email = $2,
        senha = $3
        where id = $4
        `, 
        [nome, email, senhaCryptografada, req.usuario[0].id]
    )

    return res.status(204).json()

  } catch (error) {

    return res.status(500).json({ mensagem: error.message })
  }  
}

module.exports = {
    cadastroUsuario,
    detalharUsuario,
    atualizarUsuario
}
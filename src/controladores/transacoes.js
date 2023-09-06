const pool = require('../conexao')

const criarTransacao = async (req, res) => {
   
    try {

        const { descricao, valor, data, categoria_id, tipo } = req.body
        const id_usuario = req.usuario[0].id


        if (!descricao || !valor || !data || !categoria_id || !tipo) {

            return res.status(400).json({
                mensagem: "Todos os campos devem ser obrigatórios."
            })
        }

        const categoriaUsuario = await pool.query(
            'select usuario_id from categorias where id = $1', [categoria_id]
        )

        if (categoriaUsuario.rows[0].usuario_id !== id_usuario) {

            return res.status(400).json({
                mensagem: "A categoria não pertence ao usuário ou não existe."
            })
        }

        pool.query(
            `insert into transacoes
            (descricao, valor, data, categoria_id, tipo, usuario_id)
            values ($1, $2, $3, $4, $5, $6)
            `, [descricao, valor, data, categoria_id, tipo, id_usuario]
        )

        const verificarDados =  await pool.query(
            `select cat.usuario_id, trans.* from categorias as cat
            left join transacoes as trans on cat.id = trans.categoria_id
            where cat.id = $1`,
            [categoria_id])

        return res.status(201).json(verificarDados.rows[0])
        
    } catch (error) {
     
        return res.status(500).json({ mensagem: error.message })
    }
}

const listarTransacoes = async (req, res) => {

    try {

        const id_usuario = req.usuario[0].id

        const lista = await pool.query(
            'select * from transacoes where usuario_id = $1',
            [id_usuario]
        )

        return res.status(200).json(lista.rows)
        
    } catch (error) {
        
        return res.status(500).json({ mensagem: error.message })
    }
}

module.exports = {
    criarTransacao,
    listarTransacoes
}
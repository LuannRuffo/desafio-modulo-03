const pool = require('../conexao')

const criarCategoria = async (req, res) => {

    try {

        const { descricao } = req.body
        const { id } = req.usuario[0]

         if (!descricao) {
            
            return res.status(404).json({
                mensagem: "A descrição da categoria deve ser informada."
            })
         }

         const cadastroCategoria = await pool.query(
            `insert into categorias
            (usuario_id, descricao)
            values ($1, $2)
            returning *
            `,
            [id, descricao]
         )

         return res.status(201).json(cadastroCategoria.rows[0])
        
    } catch (error) {

        return res.status(500).json({ mensagem: error.message })
    }
}

const listarCategoria = async (req, res) => {
    
    try {
        
        const { id } = req.usuario[0]

        const dadosListar = await pool.query(
            'select * from categorias where usuario_id = $1',
            [id]
        )

        return res.status(200).json(dadosListar.rows)

    } catch (error) {
        
        return res.status(500).json({ mensagem: error.message })
    }
}

const detalharCategoriaLogado = async (req, res) => {

    try {

        const id_usuario = req.usuario[0].id
        const id_categoria = req.params.id

        const detalhar =  await pool.query(
            'select * from categorias where id = $1 and usuario_id = $2',
            [id_categoria, id_usuario]
        )

        if (detalhar.rowCount < 1) {

            return res.status(404).json({
                mensagem: "A categoria não pertence ao usuário ou não existe."
            })
        }

        return res.status(200).json(detalhar.rows)
        
    } catch (error) {

        return res.status(500).json({ mensagem: error.message })
    }
}

const atualizarCategoria = async (req, res) => {

    try {

        const id_usuario = req.usuario[0].id
        const id_categoria = req.params.id
        const { descricao } = req.body

        if (!descricao) {

            return res.status(400).json({
                mensagem: "A descrição deve ser informada"
            })
        }

        const verificarDados =  await pool.query(
            'select * from categorias where id = $1 and usuario_id = $2',
            [id_categoria, id_usuario]
        )
        

        if (verificarDados.rowCount < 1) {

            return res.status(404).json({
                mensagem: "A categoria não pertence ao usuário ou não existe."
            })
        }

        await pool.query(
            `update categorias
            set descricao = $1
            where id = $2
            `, [descricao, id_categoria]
        )

        return res.status(204).json()
        
    } catch (error) {
        
        return res.status(500).json({ mensagem: error.message })
    }
}

const deletarCategoria = async (req, res) => {

    const id_usuario = req.usuario[0].id
    const id_categoria = req.params.id

    try {

        const verificarDados =  await pool.query(
            `select cat.*, trans.* from categorias as cat
            left join transacoes as trans on cat.id = trans.categoria_id
            where cat.id = $1 and cat.usuario_id = $2`,
            [id_categoria, id_usuario])

        if (verificarDados.rowCount < 1) {

            return res.status(404).json({
                mensagem: "A categoria não pertence ao usuário ou não existe."
            })
        }

        if (verificarDados.rows[0].id) {

            return res.status(403).json({
                mensagem: "Categoria não pode ser excluída pois há uma transação vinculada a ela."
            })
        }

        await pool.query(
            'delete from categorias where id = $1', [id_categoria]
        )


        return res.status(204).json()
        
    } catch (error) {
        
        return res.status(500).json({ mensagem: error.message })
    }

}

module.exports = {
    criarCategoria,
    listarCategoria,
    detalharCategoriaLogado,
    atualizarCategoria,
    deletarCategoria
}
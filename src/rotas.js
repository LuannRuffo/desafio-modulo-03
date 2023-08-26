const { Router } = require('express');
const { cadastroUsuario, detalharUsuario, atualizarUsuario } = require('./controladores/usuarios');
const login = require('./controladores/login');
const autenticarToken = require('./verificadores/autenticadortoken');
const { criarCategoria, listarCategoria, detalharCategoriaLogado, atualizarCategoria, deletarCategoria } = require('./controladores/categorias');

const rotas = Router()

rotas.post('/usuario', cadastroUsuario)
rotas.post ('/login', login)

rotas.use(autenticarToken)

rotas.get('/usuario', detalharUsuario)
rotas.put('/usuario', atualizarUsuario)
rotas.post('/categoria', criarCategoria)
rotas.get('/categoria', listarCategoria)
rotas.get('/categoria/:id', detalharCategoriaLogado)
rotas.put('/categoria/:id', atualizarCategoria)
rotas.delete('/categoria/:id', deletarCategoria)

module.exports = rotas
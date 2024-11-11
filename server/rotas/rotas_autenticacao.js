import express from 'express'
import { login_funcao, registro_funcao } from '../controlador/controlador_autenticacao.js'

const rotas_autenticao = express.Router()

rotas_autenticao.post('/registro', registro_funcao)
rotas_autenticao.post('/login', login_funcao)

export { rotas_autenticao}
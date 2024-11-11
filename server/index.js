import Express from 'express'
import { User, criarTabelas } from './db.js'
import cors from 'cors'
import { rotas_autenticao } from './rotas/rotas_autenticacao.js'
import { rotas_usuarios } from './rotas/rotas_usuarios.js'

const app = Express()
app.use(Express.json())
app.use(cors())
// criarTabelas()

app.use('/autenticacao', rotas_autenticao)
app.use('/usuario', rotas_usuarios)

app.listen(8000)
import Express  from 'express'
import { User, criarTabelas } from './db.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
const app = Express()
app.use(Express.json())

// criarTabelas()
app.post('/registro', async function(req,res) {
    try{
        const{nome, sobrenome, email, senha, dataNascimento} = req.body
        if(!nome || !sobrenome || !email || !senha || !dataNascimento){
            res.status(406).send('Todos os campos devem ser enviados!')
            return
        }

        if(await User.findOne({where:{email:email}})){
            res.status(400).send('Usuario já exixstente no sistema')
            return
        }
    const senhaSegura = bcryptjs.hashSync(senha,10)

       const novoUsuario = User.create ({
        nome: nome, 
        sobrenome: sobrenome,
        email: email,
        senha: senhaSegura,
        dataNascimento: dataNascimento
       })
        res.status(201).send('ok, usuario criado')
    }catch(erro){
        console.log(erro)
    }
})

app.post('/login', async function(req, res) {
    try{
    const { email, senha } = req.body
    if(!email || !senha ){
        res.status(400)("Todos os campos devem ser preenchidos")
        return
    }
    const usuario = await User.findOne({where:{email:email}})
    if(!usuario){
    res.send('Este email não está cadastrado')
return
    }
    const senhaCorreta = bcryptjs.compareSync(senha, usuario.senha)
    if (!senhaCorreta) {
        res.send('A senha está incorreta')
        return
    }
    const token = jwt.sign(
        {
        nome:usuario.nome,
        email:usuario.email,
        status:usuario.status
    },
    'chavecriptografiasupersegura',
    {expiresIn: 1000*60*60*24*30}

    )
    res.send({msg:'Você foi logado', token: token})

} catch (erro){
    console.log(erro)
    res.status(500).send("Houve um problema")
}

    

//validar informações
//verificar a resistencia do usuário 
//comparo a senha enviada com a senha do banco de dados
//criar um token de autenticação
//devolver a resposta com o token
})

app.listen(8000)
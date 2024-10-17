import  Express  from "express"

const app = Express()


app.get('/pegar', function (req, res){
    res.send('enviar esta mensagem')
})

// const server = createServer((requisicao, resposta) => {
//     console.log('ta funcionando')
//     resposta.write('essa e a resposta do meu servidor')

//     return resposta.end()
// })

app.listen(8000)
import http from 'node:http'

const users = []
const server = http.createServer((req, res)=>{
    const {method, url} = req

    //early return ou seja nada do que tiver abaixo do retun será executado , por isso não usamos else
    if(method==='GET' && url ==='/users'){
        return res
            .setHeader('Content-type','application/json ')
            .end(JSON.stringify(users))
    }

    if(method==='POST' && url ==='/users'){
        users.push({
            id:1,
            name:'Jonh Doe',
            email:'jonhdoe@example.com'
        })
        return res.end('Criação de usuários')
    }
    return res.end('Hello ignite')

})

server.listen(3333)


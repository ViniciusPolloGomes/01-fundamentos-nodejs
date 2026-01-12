# 1 Primeiro Projeto para Fundamentos NODE.JS

##  1.1 Iniciando com NODE.JS Criando package.json com 
```js
 npm init -y  
```
```json
{
  "name": "01-fundamentos-nodejs",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "node --watch src/server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module"
}
```
Ajustado package.json  node --watch src/server.js é script de iniciar aplicação e --watch reinicia servidor automatico para refletir nossas alterações sendo assim salvamos esse script como "dev"
Para iniciar aplicação usamos:

```bash
npm run dev
```
A configuração "type": "module" é justamente para conseguir importar a biblioteca node http no código a seguir ao gerar arquivo server.js.

## 1.2 Código de importação e  criação Servidor
```js
import http from 'node:http'

const server = http.createServer((req, res)=>{

    return res.end('Hello ignite')

})
server.listen(3333) 
```
# 2 Estrutura da Aplicação

## 2.1 Rotas de criação e listagem (Métodos HTTP)

Quando temos uma aplicação ela usa rotas para seguintes Métodos:

- Criar usuários
- Listagem de usuários
- Edição de usuários
- Remoção de usuários

Algo fundamentaç para qualquer API é entender como funciona método HTTP que é composta de dois principais recursos:

- Método HTTP
- URL 

Temos mais recursos mas de inicio iremos falar apenas destes.

Quando estamos consumindo nosso backend fazendo uma requisição iremos obter as duas informações  através de req.

como pode observar nessa linha:
 const {method, url} = req 
Ou\
const method = req.method\

Iremos usar uma sintaxe mais pratica, se chama desestruturação , ou seja, quando usamos const {method, url} = req , estamos indicando que vamos usar method, url que esta dentro de req.

Arquivo server.js

```js
import http from 'node:http'

const server = http.createServer((req, res)=>{
    const {method, url} = req 
    return res.end('Hello ignite')
})
server.listen(3333)
```

Se colocarmos console.log(method, url) no codigo veremos que como resultado de acessar link ex:

localhost:3333

No console retornara NO TERMINAL um GET/ por padrão e / foi endereço acessado em nossa aplicação.

### Dentro do HTTP temos varios métodos os mais comuns que serão usados são:

GET    ==> Buscar um recurso do backend\
POST   ==> Criar um recurso no backend\
PUT    ==> Atualizar um recurso no backend (Atualizar conjunto de dados de uma entidade )\
PATCH  ==> Atualizar uma informação especifica de um recurso do backend (Atualizar um dado especifico)\
DELETE ==> Deletar um recurso do backend

As rotas serão diferenciadas pela soma do método mais a URL

Ex:

GET/USERS  ==> Buscando recurso no meu backend\
POST/USERS ==> Criando usuário no meu backend

server.js
```js
import http from 'node:http'

const server = http.createServer((req, res)=>{
    const {method, url} = req

    //early return ou seja nada do que tiver abaixo do retun será executado , por isso não usamos else
    if(method==='GET' && url ==='/users'){
        return res.end('Listagem de usuários')
    }

    if(method==='POST' && url ==='/users'){
        return res.end('Criação de usuários')
    }
    return res.end('Hello ignite')

})

server.listen(3333)
```

No código a seguir iremos detalhar o significado:
```js
if(method==='GET' && url ==='/users'){
        return res.end('Listagem de usuários')
    }
 ```

Se o método for estritamente igual em valores e tipo de variável a 'GET' e url for estritamente igual em valores e tipo de variável a '/users' 
Então retorne no final da requisição texto escrito 'Listagem de usuários'

No javascript tem algo que se chama "early return" ou seja nada do que tiver abaixo do retun será executado caso seja verdadeiro, por isso não usamos else.

Caso nenhuma rota ou if seja verdadeira ela irá executar nossa rota de escape que seria Hello world.

## 2.2 Salvando usuários em memória Headers

### 2.2.1 Stateful 

conceito que se refere a uma aplicação que armazena dados em memória

### 2.2.2Stateless

conceito que se refere a uma aplicação que armazena dados em Banco de dados 

Voltando ao tema de salvar usuários iremos criar um Array[]
```js
const users = []
```

No método POST iremos criar uma lista com o usuário Jonh Doe e seu email, lembrando que usamos {} na sintaxe para que seja criado como objeto.
```js
users.push({
   id:1,
   name:'Jonh Doe',
   email:'jonhdoe@example.com'
})
```

No metodo GET retornamos a lista de usuários!

```js
return res.end(users)
```

Execute comando para iniciar servidor NODE

```bash
npm run dev
```
Divída terminal e insira comando para navegarmos na rota POST de criação do usuário
```bash
http POST localhost:3333/users
```
teremos seguinte resultado no terminal

```bash
PS C:\Users\vinic\Documents\Rocketseat\Curso Node.js\Criando Projeto Nodejs 1\01-funhttp POST localhost:3333/users
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 22
Date: Fri, 09 Jan 2026 00:37:43 GMT
Keep-Alive: timeout=5

Criação de usuários
```
Agora execute o comando:

```bash
http GET localhost:3333/users
```

Teremos um erro pois front-end não recebe os dados em array de objeto contendo diferentes tipos de variaveis como string, int, sendo assim iremos corrigir isso da seguinte forma: 

Pode ser enviado como texto(string) , Buffer , Uint8Array  ambos são usados para serviços de stream , e para converter esse Array[] em string iremos usar um recurso conhecido.

### JSON - Javascript Object Notation

Muito comum o uso para transitar dados e estrutura de dados em texto , iremos acrescentar no método GET o código:

```js
JSON.stringify(users)
```

Ao verificar método GET no console teremos esse retorno esperado:

```bash
PS C:\Users\vinic\Documents\Rocketseat\Curso Node.js\Criando Projeto Nodejs 1\01-fundamentos-nodejs>   http GET localhost:3333/users
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 58
Date: Fri, 09 Jan 2026 00:58:16 GMT
Keep-Alive: timeout=5

[{"id":1,"name":"Jonh Doe","email":"jonhdoe@example.com"}]
```

Note que linha contendo o JSON esta sem estrutura sem identação como um texto em uma linha só, por isso iremos corrigir essa apresentação adicionando código:

Nessa situação que entra os Cabeçalhos tanto na resposta como na requisição fazendo com que front-end entenda que é um arquivo JSON, ou seja , são metadados , informações adicionais de como que esse dado pode ser interpretado pelo front-end

Após a res adicionamos a linha que ira definir que retorno é em json para front-end interpretar e exibir conforme.
```js
if(method==='GET' && url ==='/users'){
     return res
         .setHeader('Content-type','application/json ')
         .end(JSON.stringify(users))
}
 ```
Access-Control-Allow-Headers

O cabeçalho de resposta Access-Control-Allow-Headers é usado na resposta à uma preflight request na qual incluí o cabeçalho Access-Control-Request-Headers para indicar quais cabeçalhos HTTP podem ser utilizados durante a requisição efetiva.
HTTP headers - MDN Web Docs - Mozilla
https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers
https://developer.mozilla.org/en-US/docs/Web/API/Headers#browser_compatibility

Agora que temos documentação iremos aprender sobre  .setHeader('Content-type','application/json ') , basicamente informamos que queremos definir um tipo de conteúdo do tipo JSON , coletamos esse cabeçalho definido como JSON na função setHeader.



server.js
```js
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
```
Resposta esperada do método GET no front-end:

```bash
PS C:\Users\vinic\Documents\Rocketseat\Curso Node.js\Criando Projeto Nodejs 1\01-fundamentos-nodejs>   http GET localhost:3333/users 
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 58
Content-type: application/json
Date: Fri, 09 Jan 2026 01:25:40 GMT
Keep-Alive: timeout=5

[
    {
        "email": "jonhdoe@example.com",
        "id": 1,
        "name": "Jonh Doe"
    }
]
```

Note que agora a resposta do método GET no console esta estruturada e identada fornecendo uma melhor visibilidade e entendimento dos dados, essa implementação é importante para organização, facilidade compriensão, praticidade.

## 3 Conhecendo HTTP status code

HTTP status code é um dado que informa o resultado de uma requisição ou resposta , por padrão esses dados são numericos seguidos de 3 digitos, geralmente sendo concluido positivamente ou negativamente como por exemplo um erro, usamos esse conceito para diferenciar os erros e o sucesso dos métodos HTTP

https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status

Os códigos de status de resposta HTTP indicam se uma solicitação HTTP específica foi concluída com sucesso. As respostas são agrupadas em cinco classes:

Respostas informativas ( 100– 199) status informativos\
Respostas bem-sucedidas ( 200– 299) status de sucesso\
Mensagens de redirecionamento ( 300– 399) status que indica que a rota não foi encontrada e redirecionada\
Respostas de erro do cliente ( 400– 499) status que indica ERROS originados por causa da requisição que foi feita pelo back-end (client error, erros gerados devido cliente informar algo errado)\ 
Respostas de erro do servidor ( 500– 599) Erros inesperados , relacionado a back-end

Para mais detalhes acesse link.


```js
if(method==='POST' && url ==='/users'){
        users.push({
            id:1,
            name:'Jonh Doe',
            email:'jonhdoe@example.com'
        })
        return res.writeHead(201).end()
}
```
Na linha do código a seguir  writeHead informa o tipo de erro que sera enviado como texto em end na resposta que sera retornada sinalizando que deu certo.

```js
 return res.writeHead(201).end()
````

No console tivemos retorno da requisição POST 

```bash
PS C:\Users\vinic\Documents\Rocketseat\Curso Node.js\Criando Projeto Nodejs 1\01-fundamentos-nodejs>         http POST localhost:3333/users
HTTP/1.1 201 Created
Connection: keep-alive
Date: Mon, 12 Jan 2026 23:36:25 GMT
Keep-Alive: timeout=5
Transfer-Encoding: chunked
```

Tivemos sucesso indicado aqui:

```js 
HTTP/1.1 201 Created
```

Caso nenhum dos métodos forem verdadeiros teremos que devolver um erro ao inves de Hello World.

```js
return res.writeHead(404).end()
```
No final dessa aula teremos o arquivo server.js no seguinte estado:

Server.js
```js
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
        return res.writeHead(201).end()
    }
    return res.writeHead(404).end()

})

server.listen(3333)
```





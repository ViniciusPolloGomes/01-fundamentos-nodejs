# Primeiro Projeto para Fundamentos NODE.JS

## Criando package.json com 
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

## Código de importação e  criação Servidor
```js
import http from 'node:http'

const server = http.createServer((req, res)=>{

    return res.end('Hello ignite')

})
server.listen(3333) 
```
# Estrutura da Aplicação

## Rotas de criação e listagem (Métodos HTTP)

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
Ou
const method = req.method

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

GET    ==> Buscar um recurso do backend
POST   ==> Criar um recurso no backend
PUT    ==> Atualizar um recurso no backend (Atualizar conjunto de dados de uma entidade )
PATCH  ==> Atualizar uma informação especifica de um recurso do backend (Atualizar um dado especifico)
DELETE ==> Deletar um recurso do backend

As rotas serão diferenciadas pela soma do método mais a URL

Ex:

GET/USERS  ==> Buscando recurso no meu backend
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















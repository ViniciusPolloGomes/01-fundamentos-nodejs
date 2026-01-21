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

### 2.2.2 Stateless

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

### 2.2.3 JSON - Javascript Object Notation

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

<<<<<<< HEAD
## 2.3 Conhecendo HTTP status code
=======
## 3 Conhecendo HTTP status code
>>>>>>> 9b60b4de6f9fb9f130cef8af10eb32eca3aac0b7

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

<<<<<<< HEAD
# 3 Streams no Node.js

## 3.1 Entendento streams no Node.js

Grandes fatores do Node.js ter destaque foi conceito de Streams no qual resolvia problemas da epoca com performance.

Basicamente Streams é metodo que node faz para trabalhar com recebimento e envio de dados e a sua reprodução em tela,

Um grande exemplo é assistir filmes netflix o video ele vem por partes e cada parte ja é reproduzida em tela sem que precise carregar todo o arquivo para depois executar. Nesse exemplo o video vem por partes e ja é reproduzido evitando demora ou esperas deixando aplicação com mais fluides. Sabendo usar esse conceito conseguimos gerir como essa transferencia de informação sera feita.
Isso se aplica principalmente para transferencias volumosas em termos de tamanho.

Conceito de stream os dados vem fracionados , são lidos , processados e reproduzidos por partes.

### 3.1.1 Readable Streams
No caso onde o usuário esta fazendo um upload de arquivo e nosso back-end esta lendo aos poucos estamos usando conceito de Readable Streams

### 3.1.2 Writeable Streams
No caso da Netflix onde estamos enviando os dados por streams para nosso front-end aos poucos estamos usando conceito de Writeable Streams.

## 3.2  Criando Stream de leitura

No node toda prota de entrada e saida é automaticamente uma stream.

As propriedades  "req" "res" do nosso código HTTP são stream tendo opção de devolver ou fazer a leitura aos poucos.

### 3.2.1 Variaveis de conexão da Stream

```js
process.stdin.pipe(process.stdout)
```

Process é uma variavel do Node.js cheia de recursos, um deles é stdin que é uma propriedade que retorna uma stream conectada ao proprio stdin que representa o que usuário digita no terminal em resumo é uma readable.read() , .pipe é uma função que representa algo do tipo um encanamento no literal portugues(Outra forma de entender é usando a palavra encaminhar). O que é muito comum no node é conectar essas streams

stdin é uma duplex stream , mas isso será falado em outro tópico.

Streams --> Streams

Ou seja, teremos a stream que faz a leitura aos poucos  e enviaremos de forma conectada para stream que ira tratar esses dados aos poucos.

Dessa maneira usaremos o Process.stdout que é retorno da aplicação no terminal.

Ou seja tudo que enviar no terminal ele retornara.

Com a aplicação em execução no console digitei comando:

```bash
node streams/fundamentals.js
```

Ao digitar ola tive seguinte resultado:

```bash
PS C:\Users\vinic\Documents\Rocketseat\Curso Node.js\Criando Projeto Nodejs 1\01-fundamentos-nodejs> node streams/fundamentals.js
ola
ola
```

Recebemos a string "ola" em forma de stream de leitura conectando com a stream de gravação mostramos em tela.

### stdin stream de leitura!

### stdout stream de gravação!

### 3.2.2 Como construir Streams do zero

```js

import {Readable} from 'node:stream'

class OneToHundredStream extends Readable{
    index = 1

    _read(){
        const i = this.index++

        if(i > 100){
            this.push(null)
        }else{
            this.push(i)
        }
    }
}

new OneToHundredStream().pipe(process.stdout)

```
Explicando código:

No código a seguir importamos  Readable da biblioteca node/stream

-Criamos uma classe chamada fluxo de um a cem, que recebe a herança de Readable, ou seja tera as mesmas caracteristicas mais o que você implementar.

-Por ser uma herança agora temos a função _read que fara a leitura da stream nesse exemplo criamos um dado primitivo que se refere a um numero inteiro.

-fizemos uma condição que i sempre sera ele mais ele mesmo a cada vez que função for executada.

- fizemos um if para tornar nulo caso passar de 100.

- fizemos um else para  adiciona um ou mais elementos ao final de um array, modificando o array original e retornando o novo comprimento (tamanho) do array por meio da função push(i)

Se tentarmos executar esse código dara erro por que streams não entende tipo de dado primitivo, devemos usar buffer.

Então faremos alteração em nosso código:

```js
import {Readable} from 'node:stream'

class OneToHundredStream extends Readable{
    index = 1

    _read(){
        const i = this.index++

        if(i > 100){
            this.push(null)
        }else{
            const buf = Buffer.from(String(i))

            this.push(buf)
        }
    }
}

new OneToHundredStream().pipe(process.stdout)

```

Basicamente tranformamos i em uma string no qual é um array de 1 a 100 e retornamos ele para console quando chega no 100.

```bash
PS C:\Users\vinic\Documents\Rocketseat\Curso Node.js\Criando Projeto Nodejs 1\01-fundamentos-nodejs> node streams/fundamentals.js
123456789101112131415161718192021222324252627282930313233343536373839404142434445464748495051525354555657585960616263646566676869707172737475767778798081828384858687888990919293949596979899100
```

Para nosso código ficar mais interassante vamos colocar if dentro da função setTimeOut(), isso fara exibir os dados por partes na medida que recebemos enviaremos , ou seja para cada leitura mesmo que não temos todo dado completo reproduziremos em tela lendo e gravando e exibindo.

```js
    setTimeout(()=>{
            if(i > 100){
                this.push(null)
            }else{
                const buf = Buffer.from(String(i))

                this.push(buf)
            }
    },1000)
```
A cara 1000 milisegundos, ou seja, 1 segundo ocorrera a leitura por stream conectando a gravação e exibição para usuário.

```js
import {Readable} from 'node:stream'

class OneToHundredStream extends Readable{
    index = 1

    _read(){
        const i = this.index++

        setTimeout(()=>{
             if(i > 100){
            this.push(null)
            }else{
                const buf = Buffer.from(String(i))

                this.push(buf)
            }
        },1000)
    }
}

new OneToHundredStream().pipe(process.stdout)
```


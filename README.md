#Primeiro Projeto para Fundamentos NODE.JS#

Criando package.json com 

```js
 npm init -y  
```

```js
import http from 'node:http'

const server = http.createServer((req, res)=>{

    return res.end('Hello ignite')

})

server.listen(3333)
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

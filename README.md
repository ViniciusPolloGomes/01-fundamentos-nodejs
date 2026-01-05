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




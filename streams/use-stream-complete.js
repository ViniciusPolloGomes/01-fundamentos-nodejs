import http from 'node:http'

const server = http.createServer(async(req, res)=>{
   const buffers =[] 
  
    for await (const chunk of req){
        buffers.push(chunk)
    }
    constfullStreamContent = Buffer.concat(buffers).toString()          

    console.log(constfullStreamContent)

    return res.end(constfullStreamContent)

})

server.listen(3334)
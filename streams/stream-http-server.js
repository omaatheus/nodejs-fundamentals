import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    console.log(transformed)

    callback(null, Buffer.from(String(transformed)))
  }
}

// req => ReadableStream
// res => WritableStream

const server = http.createServer(async(req, res) => {
    const buffers = [] // array de buffers

    // depois percorre o buffer e popula o array de buffers

    for await (const chunk of req) { //percorre
        buffers.push(chunk) //popula
    }

    //caso nao tenha percorrido ainda, nao executa o código abaixo

    const fullStreamContent = Buffer.concat(buffers).toString() //concatena os buffers

    console.log(fullStreamContent)

    return res.end(fullStreamContent)

//   return req
//     .pipe(new InverseNumberStream())
//     .pipe(res)
})

server.listen(3334)
//esse arquivo lida tanto com a requisição quanto com a resposta, ou seja, tudo vem em json e tudo vai em json

export async function json(req, res) {
    const buffers = [] // array de buffers

    // depois percorre o buffer e popula o array de buffers

    for await (const chunk of req) { //percorre
        buffers.push(chunk) //popula
    }

    try{
     req.body = JSON.parse(Buffer.concat(buffers).toString())
    }   catch {
        req.body = null;
    }
    
    res.setHeader('Content-Type', 'application/json')
}
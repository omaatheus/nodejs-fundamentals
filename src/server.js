import http from 'node:http';

const users = []

const server = http.createServer(async(req, res) => {
    const { url, method } = req;

    const buffers = [] // array de buffers

    // depois percorre o buffer e popula o array de buffers

    for await (const chunk of req) { //percorre
        buffers.push(chunk) //popula
    }

    //caso nao tenha percorrido ainda, nao executa o código abaixo
    try{
     req.body = JSON.parse(Buffer.concat(buffers).toString())
    }   catch {
        req.body = null;
    }
    

    if(method === 'GET' && url === '/users') {
        return res
      .setHeader('Content-type', 'application/json') 
      .end(JSON.stringify(users));
    }

    if(method === 'POST' && url === '/users') {
        const { name, email } = req.body;

        users.push({
            id: 1,
            name,
            email,
        })

        return res.writeHead(201).end();
    }



    return res.writeHead(404).end('Not Found');
});

server.listen(3333, () =>{
    console.log('Server is running on port 3333');
});
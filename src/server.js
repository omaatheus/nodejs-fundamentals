import http from 'node:http';

import { json } from './middlewares/json.js';
import { routes } from './middlewares/routes.js';




const server = http.createServer(async(req, res) => {
    const { url, method } = req;

   await json(req, res);

   const route = routes.find(route => {
    return route.method === method && route.path === url;
    
   })

    if(route){
        return route.handler(req, res);
    }
  
    return res.writeHead(404).end('Not Found');
});

server.listen(3333, () =>{
    console.log('Server is running on port 3333');
});
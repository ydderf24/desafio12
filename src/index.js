const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const port = 8080;
const io = require('socket.io');

const publicFolderPath = path.resolve(__dirname, '../public');
app.use(express.static(publicFolderPath));

const myServer = http.Server(app);

myServer.listen(port, () =>{console.log('Server en puerto', port)});

app.get('/', (req, res)=>{
    res.send(`<h1>hellos</h1>`)
});

const myWSServer = io(myServer);
const productos = [];

myWSServer.on('connection', (socket) =>{
    console.log("cliente conectado");
    // console.log(socket.client.id);


    socket.on('new-product', (data)=> {
        const newProduct = {
          producto: data,
        };
        data.id = productos.length + 1;
        console.log(newProduct);
        productos.push(newProduct);
        //Ahora los productos los paso del server al cliente
        // socket.emit("productos", productos)
    
        //PARA RESPONDERLE A UN SOLO CLIENTE
        // socket.emit('messages', messages);
    
        //PARA ENVIARLE EL MENSAJE A TODOS
        myWSServer.emit('productos', productos);
    
        //PARA ENVIARLE MENSAJE A TODOS MENOS AL QUE ME LO MANDO
        //socket.broadcast.emit('productos', productos);
      });
    
      socket.on('askData', (data) => {
        console.log('ME LLEGO DATA');
        socket.emit('productos', productos);
        // console.log(productos);
      });
});

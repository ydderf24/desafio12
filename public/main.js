let socket = io.connect();
let btn = document.getElementById("btn");
let alerta = document.getElementById("alerta");
let tabla = document.getElementById("tabla");

//Con esto apenas se conecta un usuario se pide la data de la tabla
socket.emit('askData');

btn.addEventListener("click", () =>{
        // const nombre = document.getElementById("nombre").value;
        // const precio = Number(document.getElementById("precio").value);
        // const thumbnail = document.getElementById("thumbnail").value;
        const producto = {
            nombre: document.getElementById("nombre").value,
            precio: Number(document.getElementById("precio").value),
            thumbnail: document.getElementById("thumbnail").value,
        }
        if(producto.nombre === "" || producto.precio ===""|| producto.thumbnail ===""){
            setTimeout(() =>{
                alerta.innerHTML = `<div class="alert alert-danger" role="alert">Hay campos vacios, rellenalos</div>`
                 },100);

        } else {
            socket.emit('new-product', producto);
            let fila="<tr><td>"+producto.nombre+"</td><td>"+producto.precio+"</td><td>"+producto.thumbnail+"</td></tr>";
            let btn1 = document.createElement("TR");
            btn1.innerHTML = fila;
            tabla.appendChild(btn1);

            alerta.innerHTML=`<div class="alert alert-success" role="alert">Producto agregado correctamente</div>`
        }
        //Aca enviamos el objeto, el primer parametro 'new-product'
        //tiene que matchear con el socket.on en el back(index.js)
       
});

    const render = (data) =>{       
        data.forEach(element => {
            let fila="<tr><td>"+element.producto.nombre+"</td><td>"+element.producto.precio+"</td><td>"+element.producto.thumbnail+"</td></tr>";
            let btn1 = document.createElement("TR");
            btn1.innerHTML = fila;
            tabla.appendChild(btn1);
            
    });
    
}


    socket.on('productos1', (data) =>{
          render(data)
        
     });

  
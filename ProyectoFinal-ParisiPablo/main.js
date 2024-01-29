//----------------------------------------------------------------------------------
//PARTE 0: Creación de variables globales

/* 
Se crean arreglos de objetos. 
Estos contienen los productos y precios del menú. 
*/

const Caliente = [
    {nombre: "CORTADO", precio: "$1000"},
    {nombre: "EXPRESSO", precio: "$1000"},
    {nombre: "CAFÉ CON LECHE", precio: "$1500"},
    {nombre: "SUBMARINO", precio: "$1450"},
];
const Frio = [
    {nombre: "LICUADO", precio: "$2000"},
    {nombre: "AGUA MINERAL", precio: "$1100"},
    {nombre: "GASEOSA", precio: "$1100"},
    {nombre: "CERVEZA", precio: "$1900"},
];
const Salado = [
    {nombre: "TOSTADOS", precio: "$2500"},
    {nombre: "TOSTADAS", precio: "$850"},
    {nombre: "SANDWICH", precio: "$1450"},
    {nombre: "BAGEL", precio: "$3500"},
];
const Tortas = [
    {nombre: "TIRAMISU", precio: "$2300"},
    {nombre: "BROWNIE", precio: "$2100"},
    {nombre: "LEMON PIE", precio: "$2300"},
    {nombre: "CHEESCAKE", precio: "$2300"},
];


/* Se crea el menu */
const menu = [Caliente,Frio,Salado,Tortas];


/* Se crea el objeto que contendra los productos agregados al carrito */
let miPedido = [];

//----------------------------------------------------------------------------------
//PARTE 1: Se completa el "contenedorBuscador".

/* Creación de los botones de búsqueda por categoría dentro del contenedorBuscador*/
const CreacionBusquedaPorTexto = () => {
    const contbuscadorTexto = document.getElementById("contenedorBuscador");
    let contBuscadorTextoDiv = document.createElement(`div`);
    contBuscadorTextoDiv.classList = `buscadorPorTexto`;
    contBuscadorTextoDiv.innerHTML +=`<img src="./assets/img/lupa.png" alt="imagen de una lupa">
                                    <input type="text" id="buscadorTexto" placeholder="Buscar productos por nombre">
                                    <button id="finBusqueda">
                                        <img src="./assets/img/cruz.png" alt="imagen de una cruz en un circulo">
                                    </button>
    `;
    contbuscadorTexto.append(contBuscadorTextoDiv);
    return;
};

/* Creación de los botones de búsqueda por categoría dentro del contenedorBuscador*/
const CreacionBusquedaPorCategoria = () => {
    const categorias = ["Caliente","Frio","Salado","Tortas"];
    const contbuscadorCategoria = document.getElementById("contenedorBuscador");
    let contbuscadorCategoriaDiv = document.createElement(`div`);
    contbuscadorCategoriaDiv.classList = `buscadorPorCategoria`;
    categorias.forEach((categoria) => {
    contbuscadorCategoriaDiv.innerHTML +=`<button class="categoria">
                                            <a href="#${categoria.toLowerCase()}">
                                            <img src="./assets/img/${categoria}.png" alt="Simbolo de la categoría ${categoria}}">
                                            <p>${categoria}</p>
                                            </a>                                            
                                        </button>`
    ;
    });
    contbuscadorCategoria.append(contbuscadorCategoriaDiv);
    return;
};

/* Creación funciónes que completarán el contenedor Buscador*/
const CreacioncontenedorBuscador = () => {
    const contbuscadorCategoria = document.getElementById("contenedorBuscador");
    let contbuscadorTituloDiv = document.createElement(`div`);
    contbuscadorTituloDiv.classList = `tituloBuscador`;
    contbuscadorTituloDiv.innerHTML += `<h2>Buscador</h2>`;
    contbuscadorCategoria.append(contbuscadorTituloDiv);
    CreacionBusquedaPorTexto();
    CreacionBusquedaPorCategoria();
};

//----------------------------------------------------------------------------------
//PARTE 2: Se completa el "contenedorPedido".
const CreacionPrecioFinal = () => {
    const contPrecioFinal = document.getElementById("contenedorPedido");
    let subtotal = document.createElement(`div`);
    subtotal.id = `subtotalPedido`;
    subtotal.innerHTML = `<h3>Subtotal: </h3>`;
    contPrecioFinal.append(subtotal);
    let envio = document.createElement(`div`);
    envio.id = `envioPedido`;
    envio.innerHTML = ` <h3>Envio: </h3>
                        <div class="envioPedidoBoton">
                            <button id="envioBoton">Si</button>
                            <button id="noEnvioBoton">No</button>
                        </div>`
    ;
    contPrecioFinal.append(envio);
    let total = document.createElement(`div`);
    total.id = `totalPedido`;
    total.innerHTML = `<h3>Total: </h3>`;
    contPrecioFinal.append(total);
    let eliminarcomprar = document.createElement(`div`);
    eliminarcomprar.id = `eliminarcomprarPedido`;
    eliminarcomprar.innerHTML = `<button id="eliminarPedido">Eliminar carrito</button>
                                 <button id="comprarPedido">Comprar</button>`;
    contPrecioFinal.append(eliminarcomprar);
    let notaProductos = document.createElement(`p`);
    notaProductos.id = `notaProductos`;
    notaProductos.innerText = `Consumo en el local con un 15% de propina`;
    contPrecioFinal.append(notaProductos);
    return;
};

const CreacioncontenedorPedido = () => {
    const contPedido = document.getElementById("contenedorPedido");
    let contPedidoTitulo = document.createElement(`div`);
    contPedidoTitulo.classList = `tituloPedido`;
    contPedidoTitulo.innerHTML += `<h2>Mi Pedido</h2>`;
    contPedido.append(contPedidoTitulo);
    let producto = document.createElement(`div`);
    producto.id = `productoPedido`;
    contPedido.append(producto);
    return;
};

//----------------------------------------------------------------------------------
/* 
PARTE 3: Se completa el "contenedorMenu"
*/

//Se muestran los productos
const MuestraProductos = (productosCategoria,nombreCategoria) => {
    nombreCategoria.forEach(productoCategoria => {
        producto = document.createElement(`div`);
        producto.classList = `producto`;
        producto.innerHTML += ` <img src="./assets/img/Bandeja.png" alt="Imagen de bandeja caliente"></img>
                                <div class="caracteristicasProducto">
                                    <p class="nombre">${productoCategoria.nombre}</p>
                                    <p class="precio">${productoCategoria.precio}</p>
                                    <button class="agregar">Agregar al pedido</button>
                                </div>`;
        productosCategoria.append(producto);
    });
    return;
};

//Se crea el menú
const CreacionMenu = () => { 
    const contMenu = document.getElementById("contenedorMenu");
    const botonComprarPedido = document.getElementById("comprarPedido");
    const botonEnvio = document.getElementById("envioBoton");
    const botonNoEnvio = document.getElementById("noEnvioBoton");
    botonComprarPedido.disabled = true;
    botonEnvio.disabled = true;
    botonNoEnvio.disabled = true;
    menu.forEach(nombreCategoria => {
        const categoria = document.createElement(`div`);
        categoria.classList = `categoriaMenu`;
        const productosCategoria = document.createElement(`div`);
        productosCategoria.classList = `productos`;
        switch (nombreCategoria){
            case Caliente:
                categoria.innerHTML += `<a name="caliente"></a>`;  
                categoria.innerHTML += `<h3>Caliente</h3>`;  
                contMenu.append(categoria);
                contMenu.append(productosCategoria);
                MuestraProductos(productosCategoria,nombreCategoria);
                break;
            case Frio:
                categoria.innerHTML += `<a name="frio"></a>`;  
                categoria.innerHTML += `<h3>Frio</h3>`;  
                contMenu.append(categoria);
                contMenu.append(productosCategoria);
                MuestraProductos(productosCategoria,nombreCategoria);
                break;
            case Salado:
                categoria.innerHTML += `<a name="salado"></a>`;  
                categoria.innerHTML += `<h3>Salado</h3>`;  
                contMenu.append(categoria);
                contMenu.append(productosCategoria);
                MuestraProductos(productosCategoria,nombreCategoria);
                break;
            case Tortas:
                categoria.innerHTML += `<a name="tortas"></a>`;  
                categoria.innerHTML += `<h3>Tortas</h3>`;  
                contMenu.append(categoria);
                contMenu.append(productosCategoria);
                MuestraProductos(productosCategoria,nombreCategoria);
                break;
        }
    });
    return;
};

//----------------------------------------------------------------------------------
/* 
PARTE 4: Se completa el "contenedorCompra"
*/

//Función que completa el contenido del contenedor con datos del cliente
const CreacionCliente = () => {    
    const contCliente = document.getElementById("contenedorCliente");
    let contClienteDiv = document.createElement(`div`);
    contClienteDiv.classList = `tituloCliente`;
    contClienteDiv.innerHTML += `<h3>Datos Cliente</h3>`;
    contCliente.append(contClienteDiv);
    let contClienteNombre = document.createElement(`div`);
    contClienteNombre.id = `contClienteNombre`;
    contClienteNombre.classList = `contClienteDato`;
    contClienteNombre.innerHTML += `<label>Nombre: </label>
                                    <input type="text" id="entradaNombre" placeholder="Ingrese su Nombre">`;
    contCliente.append(contClienteNombre);
    let contClienteDireccion = document.createElement(`div`);
    contClienteDireccion.id = `contClienteDireccion`;
    contClienteDireccion.classList = `contClienteDato`;
    contClienteDireccion.innerHTML += ` <label>Dirección: </label>
                                        <input type="text" id="entradaDireccion" placeholder="Ingrese su Dirección">`;
    contCliente.append(contClienteDireccion);
    let contClienteTelefono = document.createElement(`div`);
    contClienteTelefono.id = `contClienteTelefono`;
    contClienteTelefono.classList = `contClienteDato`;
    contClienteTelefono.innerHTML += `  <label>Teléfono: </label>
                                        <input type="text" id="entradaTelefono" placeholder="Ingrese su Teléfono">`;
    contCliente.append(contClienteTelefono);
    let contClienteDNI = document.createElement(`div`);
    contClienteDNI.id = `contClienteDNI`;
    contClienteDNI.classList = `contClienteDato`;
    contClienteDNI.innerHTML += `<label>DNI: </label>
                                 <input type="text" id="entradaDNI" placeholder="Ingrese su DNI">`;
    contCliente.append(contClienteDNI);
    return;
};

//Función que completa el contenido del contenedor con las formas de pago
const CreacionPago = () => {
    const formaPago = ["Efectivo","Tarjeta","Transferncia"];
    let formaPagoElegida;
    const contPago = document.getElementById("contenedorFormasDePago");
    let contPagoDiv = document.createElement(`div`);
    contPagoDiv.classList = `tituloPago`;
    contPagoDiv.innerHTML += `<h3>Formas de Pago</h3>`;
    contPago.append(contPagoDiv);
    formaPago.forEach(forma => {
        formaPagoElegida = document.createElement(`div`);
        formaPagoElegida.classList = `formaPago`;
        formaPagoElegida.innerHTML += ` <input type="checkbox" id="formaPago${forma}">
                                        <label for="formaPago${forma}">${forma}: </label>`
        ;
        contPago.append(formaPagoElegida);
    });
    return;
};

//Función que completa el contenido con los botones borrar datos y finalizar compra. 
const CreacionCompra = () => {
    const contCompraTitulo = document.getElementById("contenedorTituloCompra");
    contCompraTitulo.innerHTML += `<h2>Compra</h2>`;
    CreacionCliente();
    CreacionPago();
    const contCompraAtrasFin = document.getElementById("contenedorAtrasFinPago");
    let contDatosBotonAtras = document.createElement("button");
    contDatosBotonAtras.id = `borrarDatosCliente`;
    contDatosBotonAtras.innerText += `Borrar Datos`;
    contCompraAtrasFin.append(contDatosBotonAtras);
    let contDatosBotonFin = document.createElement("button");
    contDatosBotonFin.id = `terminarCompra `;
    contDatosBotonFin.innerText += `Finalizar Compra`;
    contCompraAtrasFin.append(contDatosBotonFin);
    return;
};

//----------------------------------------------------------------------------------
/* 
PARTE 5: Se realiza la función para manejar 
la búsqueda de un producto por texto. 
*/

//Función de muestra de los productos buscados
const MuestraProductosBuscados = (busqueda) => {
    const contMenu = document.getElementById("contenedorMenu");
    let categoriaBusqueda = document.createElement(`div`);
    categoriaBusqueda.classList = `categoriaMenu`;
    categoriaBusqueda.innerHTML = `<h3>Resultados de la búsqueda</h3>`;
    contMenu.append(categoriaBusqueda);
    let productosBuscadosDiv = document.createElement(`div`);
    productosBuscadosDiv.classList = `productos`;
    contMenu.append(productosBuscadosDiv);
    let productosBuscados = menu.reduce((acumulador,categoria) => {
        const productoCategoria = categoria.filter((producto) => producto.nombre.toLocaleUpperCase().includes(busqueda));
        return acumulador.concat(productoCategoria);;
    },[]);
    productosBuscados.forEach(productoEncontrado => {
        let productoEncontradoDiv = document.createElement(`div`);
        productoEncontradoDiv.classList = `producto`;
        productoEncontradoDiv.innerHTML += `<img src="./assets/img/Bandeja.png" alt="Imagen de bandeja caliente"></img>
                                            <div class="caracteristicasProducto">
                                                <p class="nombre"> ${productoEncontrado.nombre} </p> 
                                                <p class="precio"> ${productoEncontrado.precio} </p> 
                                                <button class="agregar">Agregar al pedido</button>
                                            </div>`;
        productosBuscadosDiv.append(productoEncontradoDiv);
    });
    return;
};

//Función de busqueda por texto
const BuscarPorTexto = () => {
    const contMenu = document.getElementById("contenedorMenu");
    const buscadorTexto = document.getElementById("buscadorTexto");
    buscadorTexto.addEventListener("input",() => {
        contMenu.innerHTML = ` `;
        let busqueda = buscadorTexto.value.toUpperCase();
        busqueda === "" || busqueda === " " || !isNaN(busqueda) ? CreacionMenu() : MuestraProductosBuscados(busqueda);
    });
    return;
};

//----------------------------------------------------------------------------------
/* 
PARTE 6: Se realiza la función de eliminación de texto de la busqueda
de la busqueda por texto 
*/
const EliminarBusquedaPorTexto = () => {
    const buscadorTexto = document.getElementById("buscadorTexto");
    const finBusqueda = document.getElementById("finBusqueda");
    const contMenu = document.getElementById("contenedorMenu");
    finBusqueda.addEventListener("click",() => {
        contMenu.innerHTML = "";
        CreacionMenu();
        buscadorTexto.value = "";
    });
    return;
};

//----------------------------------------------------------------------------------
/* 
PARTE 7: Se realiza la visualización de la seccion 
compra al presionar el botón comprar 
*/
const VisualizacionSectorCompra = () => {
    const comprarPedidos = document.getElementById("comprarPedido");
    const contCompra = document.getElementById("contenedorCompra");
    comprarPedidos.addEventListener("click", () => {
        contCompra.classList.remove("contenedorCompraNoVisualizar");
        contCompra.classList.add("contenedorCompraVisualizar");
        localStorage.setItem("comprarPedidoPresionado", "true");
        contCompra.scrollIntoView({behavior: "smooth"});
    });
    return;
};

//----------------------------------------------------------------------------------
/* 
PARTE 8: Se elimina el pedido
*/
const EliminarPedidoTotal = () => {
    const conEliminarPedido = document.getElementById("eliminarPedido");
    const contProductoPedido = document.getElementById("productoPedido");
    const contTotalPedido = document.getElementById("totalPedido");
    const contEnvioPedido = document.getElementById("envioPedido");
    const contSubtotalPedido = document.getElementById("subtotalPedido");
    const textoTotalPedido = contTotalPedido.querySelector("h3"); 
    const textoEnvio = contEnvioPedido.querySelector("h3"); 
    const botonEnvio = document.getElementById("envioBoton");
    const botonNoEnvio = document.getElementById("noEnvioBoton");
    const botonComprarPedido = document.getElementById("comprarPedido");
    conEliminarPedido.addEventListener("click", () => {
        miPedido = [];
        procesoPedido = [];
        contProductoPedido.innerHTML = ``;
        textoTotalPedido.innerText = `Total:`;
        textoEnvio.innerText = `Envio:`;
        contSubtotalPedido.innerHTML = `<h3>Subtotal:</h3>`;
        botonNoEnvio.disabled = true;
        botonEnvio.disabled = true;
        botonComprarPedido.disabled = true;
    
    });
    return;
};

//----------------------------------------------------------------------------------
/* 
PARTE 9: 
*/

/*
Función para borrar el cotenido del Subtotal, el Envio y el Total cuando se  
presiona susesivamente el botón menos y cuando se presiona el botón 
para eliminar un producto.
*/

const borrarSubtotalEnvioTotal = () => {
    const contTotalPedido = document.getElementById("totalPedido");
    const contEnvioPedido = document.getElementById("envioPedido");
    const contSubtotalPedido = document.getElementById("subtotalPedido");
    const textoTotalPedido = contTotalPedido.querySelector("h3"); 
    const textoEnvio = contEnvioPedido.querySelector("h3");     
    const botonEnvio = document.getElementById("envioBoton");
    const botonNoEnvio = document.getElementById("noEnvioBoton");
    const botonComprarPedido = document.getElementById("comprarPedido");
    botonNoEnvio.disabled = true;
    botonEnvio.disabled = true;
    botonComprarPedido.disabled = true;
    textoTotalPedido.innerText = `Total:`;
    textoEnvio.innerText = `Envio:`;
    contSubtotalPedido.innerHTML = `<h3>Subtotal:</h3>`;
    return;
};

// Función para mostrar el valor total del pedido en el contenedor
const MostrarTotal = (total) => {
    const contTotalPedido = document.getElementById("totalPedido");
    const textoTotalPedido = contTotalPedido.querySelector("h3"); 
    const botonComprarPedido = document.getElementById("comprarPedido");
    textoTotalPedido.innerText = `Total: $${total.toFixed(2)}`;
    botonComprarPedido.disabled = false;
    return;
};

//Función para mostrar la propina en el contenedor
const MostrarPropina = (propina) => {
    const contEnvioPedido = document.getElementById("envioPedido");
    const textoEnvio = contEnvioPedido.querySelector("h3"); 
    textoEnvio.innerText = `Envio: $${propina.toFixed(2)}`;
    return;
};

// Función de cálculo de pedido.
const Calculos = (miPedidoFinal) => {
    const divPedido = document.getElementById("subtotalPedido");
    const botonEnvio = document.getElementById("envioBoton");
    const botonNoEnvio = document.getElementById("noEnvioBoton");
    const subtotal = miPedidoFinal.reduce((acumulador, item) => acumulador + parseFloat(item.precioPedidoFinal.replace('$', '')), 0);
    let propina = subtotal * 0.15;
    let totalAPagar = 0.00;
    botonNoEnvio.disabled = true;
    botonEnvio.disabled = false;
    botonEnvio.addEventListener('click', () => {
        botonEnvio.disabled = true;
        botonNoEnvio.disabled = false;
        propina = 0.00;
        MostrarPropina(propina);
        totalAPagar = subtotal + propina;
        MostrarTotal(totalAPagar);
    });
    botonNoEnvio.addEventListener('click', () => {
        botonNoEnvio.disabled = true;
        botonEnvio.disabled = false;
        propina = subtotal * 0.15;
        MostrarPropina(propina);
        totalAPagar = subtotal + propina;
        MostrarTotal(totalAPagar);
    });
    divPedido.innerHTML = `<h3>Subtotal: $${subtotal.toFixed(2)}</h3>`;
    MostrarPropina(propina);
    totalAPagar = subtotal + propina;
    MostrarTotal(totalAPagar);
    return;
};

//----------------------------------------------------------------------------------
/* 
PARTE 10: Se actualiza el pedido. 
Esta Función muestra los productos que han sido seleccionados y su precio. 
Además, permite sumar o restar una cantidad de un mismo producto.
Calculando el valor total de un producto según la cantidad agrgada.
Por último, esta función permite eliminar un producto por medio de un botón "X"
sin la necesidad de presionar el botón "-" repetidas veces, hasta llegar a 0.
*/

const ActualizarPedido = (miPedido) => {
    const contProductoPedido = document.getElementById("productoPedido");
    const cantidadTotal = miPedido.reduce((total, item) => total + item.cantidad, 0);
    if (cantidadTotal === 0) {
        contProductoPedido.innerHTML = ``;
    }
    else {
        contProductoPedido.innerHTML = ``;
        miPedido.forEach((item,x) => {
            const divPedido = document.createElement("div");
            divPedido.id = `productoPedido${x}`;
            divPedido.classList = `pedido`;
            /* divPedido.classList.add(`contenedoProducto`); */
            const totalItem = `$${item.precioProducto.replace(`$`,``)  * item.cantidad}`;
            divPedido.innerHTML += `<h3 class="carritoPedidoTitulo">${item.nombreProducto}</h3>`;
            divPedido.innerHTML += `<button class="menosProductos"> - </button>`;
            divPedido.innerHTML +=  `<h4 class="cantidadProductos">${item.cantidad}</h4>`;
            divPedido.innerHTML +=  `<button class="masProductos"> + </button>`;
            divPedido.innerHTML += `<h4 class="precioProductos">${totalItem}</h4>`;
            divPedido.innerHTML += `<button class="eliminarProductosBoton"> X </button>`;
            contProductoPedido.appendChild(divPedido);

            const botonMenos = divPedido.getElementsByClassName("menosProductos");
            const botonMas = divPedido.getElementsByClassName("masProductos");
            const botonEliminarItem = divPedido.getElementsByClassName("eliminarProductosBoton");
            for (let i = 0; i < botonMenos.length; i++) {
                botonMenos[i].addEventListener('click', () => {
                    if (item.cantidad == 1){
                        borrarSubtotalEnvioTotal();                       
                    }
                    if (item.cantidad > 1) {
                        item.cantidad--;
                    } else {
                        miPedido.splice(x, 1);
                    }
                    ActualizarPedido(miPedido);
                });
            }
            for (let i = 0; i < botonMas.length; i++) {
                botonMas[i].addEventListener('click', () => {
                    item.cantidad++;
                    ActualizarPedido(miPedido);
                });
            }
            for (let i = 0; i < botonEliminarItem.length; i++) {
                botonEliminarItem[i].addEventListener('click', () => {  
                    borrarSubtotalEnvioTotal();
                    miPedido.splice(x, 1);
                    ActualizarPedido(miPedido);
                });
            }
        });
        miPedidoFinal = miPedido.map(item => ({ nombrePedidoFinal: item.nombreProducto, precioPedidoFinal: `$${item.precioProducto.replace('$', '') * item.cantidad}`, cantidadPedidoFinal: item.cantidad }));
        Calculos(miPedidoFinal);    
    }
    return;
};

//----------------------------------------------------------------------------------
/* 
PARTE 11: Se añade un producto con el boton de agregar. 
*/
const GenerarPedido = () => {
    const buscadorTexto = document.getElementById("buscadorTexto");
    const finBusqueda = document.getElementById("finBusqueda");
    const contMenu = document.getElementById("contenedorMenu");
    const botonEnvio = document.getElementById("envioBoton");
    const botonNoEnvio = document.getElementById("noEnvioBoton");
    const botonComprarPedido = document.getElementById("comprarPedido");
    finBusqueda.addEventListener("click",() => {
        contMenu.innerHTML = "";
        CreacionMenu();
        buscadorTexto.value = "";
        botonEnvio.disabled = false;
        botonNoEnvio.disabled = true;
        botonComprarPedido.disabled = false;
    });
    contMenu.addEventListener("click",(evento) => {
        if (evento.target.classList.contains("agregar")) {
            contAgregar = evento.target.closest(".caracteristicasProducto");
            let nombre = contAgregar.querySelector(".nombre").textContent;
            let precio = contAgregar.querySelector(".precio").textContent;
            const indice = miPedido.findIndex(item => item.nombreProducto === nombre);
            if (indice !== -1) {
                miPedido[indice].cantidad++;
            } else {                
                miPedido.push({nombreProducto: nombre, precioProducto: precio, cantidad: 1});
            }
            ActualizarPedido(miPedido,0);
        }
    });
    return;
};

//----------------------------------------------------------------------------------
/* 
PARTE 12: Se reinician los valores del localStorage y se reinciar los valores
de los datos de la sección compra
*/
const ReiniciarValoresCompra = () => {
    const contenedorCliente = document.getElementById("contenedorCliente");
    const entradas = contenedorCliente.querySelectorAll("input");
    entradas.forEach(entrada => {
        entrada.value = ``;
        if (entrada.id == "entradaNombre" ) {
            entrada.placeholder = 'Ingrese su Nombre';
        }
        if (entrada.id == "entradaDireccion" ) {
            entrada.placeholder = 'Ingrese su Direccion';
        }
        if (entrada.id == "entradaTelefono" ) {
            entrada.placeholder = 'Ingrese su Teléfono';
        }
        if (entrada.id == "entradaDNI" ) {
            entrada.placeholder = 'Ingrese su DNI';
        }
    });
    const entradasEfectivo = document.getElementById("formaPagoEfectivo");
    const entradasTarjeta = document.getElementById("formaPagoTarjeta");
    const entradasTransferncia = document.getElementById("formaPagoTransferncia");
    entradasEfectivo.checked = false;
    entradasTarjeta.checked = false;
    entradasTransferncia.checked = false;
    localStorage.clear();
    return;
};

//----------------------------------------------------------------------------------
/* 
PARTE 13: Se borran los datos del cliente y de las formas de pago
*/
const BorrarDatos = () => {
    const botonBorrarDatosCliente = document.getElementById("borrarDatosCliente");
    botonBorrarDatosCliente.addEventListener("click", () => {
        ReiniciarValoresCompra();
        localStorage.setItem("comprarPedidoPresionado", "true");
    }); 
    return;
};

//----------------------------------------------------------------------------------
/* 
PARTE 14: Se genera la función para completar los datos del cliente 
y guardar los datos en el LocalStorage
*/
const CompletarDatosCliente = () => {
    const contenedorCliente = document.getElementById("contenedorCliente");
    const entradas = contenedorCliente.querySelectorAll("input");
    entradas.forEach(entrada => {
        entrada.addEventListener("input", () => {
            if (entrada.id == "entradaNombre" ) {
                if (!isNaN(entrada.value) || !/^[a-zA-Z]+$/.test(entrada.value.trim())) {
                    entrada.value = ``;
                    entrada.placeholder = 'Ingrese su Nombre Nuevamente';
                    localStorage.removeItem('entradaNombre');
                }
                else {
                    localStorage.setItem(entrada.id, entrada.value);
                }
            }            
            if (entrada.id == "entradaDireccion" ){
                if ((entrada.value == '') || entrada.value == ' ') {
                    entrada.value = ``;
                    entrada.placeholder = 'Ingrese su Direccion Nuevamente';            
                    localStorage.removeItem('entradaDireccion');
                }
                else {
                    localStorage.setItem(entrada.id, entrada.value);
                }
            }
            if (entrada.id == "entradaTelefono" ){
                if (isNaN(entrada.value) || entrada.value == '' || entrada.value == ' ') {
                    entrada.value = ``;
                    entrada.placeholder = 'Ingrese su Teléfono Nuevamente';
                    localStorage.removeItem('entradaTelefono');
                }
                else {
                    localStorage.setItem(entrada.id, entrada.value);
                }
            }            
            if (entrada.id == "entradaDNI" ){
                if (isNaN(entrada.value) || entrada.value == '' || entrada.value == ' ') {
                    entrada.value = ``;
                    entrada.placeholder = 'Ingrese su DNI Nuevamente';
                    localStorage.removeItem('entradaDNI');
                }
                else {
                    localStorage.setItem(entrada.id, entrada.value);
                }
            }
        });
        entrada.value = localStorage.getItem(entrada.id) || ``;
    });
    return;
};


//----------------------------------------------------------------------------------
/* 
PARTE 15: Funciones para completar la forma de pago
y guardar los datos en en localStorage.
En esta sección se usa JSON.
*/

// Esta función carga el estado almacenado en localStorage al cargar la página
const CargarEstado = (entradasEfectivo,entradasTarjeta,entradasTransferncia) => {
    const estadoGuardado = localStorage.getItem("estadoFormasPago");
    if (estadoGuardado) {
        const estado = JSON.parse(estadoGuardado);
        entradasEfectivo.checked = estado[0];
        entradasTarjeta.checked = estado[1];
        entradasTransferncia.checked = estado[2];
    }
    return;
};

// Esta función guarda el estado actual en localStorage
const GuardarEstado = (estado) => {
    localStorage.setItem("estadoFormasPago", JSON.stringify(estado));
    return;
};

// Esta función permite seleccionar la forma de pago deseada
const CompletarFormasPago = () => {
    const entradasEfectivo = document.getElementById("formaPagoEfectivo");
    const entradasTarjeta = document.getElementById("formaPagoTarjeta");
    const entradasTransferncia = document.getElementById("formaPagoTransferncia");
    CargarEstado(entradasEfectivo,entradasTarjeta,entradasTransferncia); // Llamar a la función al cargar la página

    entradasEfectivo.addEventListener("change", () => {
        if (entradasEfectivo.checked) {
            entradasTarjeta.checked = false;
            entradasTransferncia.checked = false;
        }
        estado = [entradasEfectivo.checked,entradasTarjeta.checked,entradasTransferncia.checked]
        GuardarEstado(estado);
    });
    entradasTarjeta.addEventListener("change", () => {
        if (entradasTarjeta.checked) {
            entradasEfectivo.checked = false;
            entradasTransferncia.checked = false;
        }
        estado = [entradasEfectivo.checked,entradasTarjeta.checked,entradasTransferncia.checked]
        GuardarEstado(estado);
    });
    entradasTransferncia.addEventListener("change", () => {
        if (entradasTransferncia.checked) {
            entradasTarjeta.checked = false;
            entradasEfectivo.checked = false;
        }
        estado = [entradasEfectivo.checked,entradasTarjeta.checked,entradasTransferncia.checked]
        GuardarEstado(estado);
    });
    return;
};

//----------------------------------------------------------------------------------
/* 
PARTE 16: Función que permite la visualización o no de la sección forma de pago
luego de un reinicio.
Además, llama a la función para completar los datos del cliente y a la función 
para completar las formas de pago.
*/
const CompletarDatosClienteFormasPago = () => {
    if(localStorage.getItem("comprarPedidoPresionado") === "true"){
        const contenedorCompra = document.getElementById("contenedorCompra");
        if (contenedorCompra) {
            contenedorCompra.classList.remove("contenedorCompraNoVisualizar");
            contenedorCompra.classList.add("contenedorCompraVisualizar");
        }
    }
    CompletarDatosCliente();
    CompletarFormasPago();
    return;
};

//----------------------------------------------------------------------------------
/* 
PARTE 17: Se finaliza la compra 
*/
const FinalizarCompra = () => {
    const terminarCompras = document.getElementById("terminarCompra ");
    const encabezado = document.getElementById("header");
    const contCompra = document.getElementById("contenedorCompra");
    terminarCompras.addEventListener("click", () => {
        ReiniciarValoresCompra();
        localStorage.setItem("comprarPedidoPresionado", "false");
        contCompra.classList.add("contenedorCompraNoVisualizar");
        contCompra.classList.remove("contenedorCompraVisualizar");
        encabezado.scrollIntoView({behavior: "auto"});
        
        AvisoFinal();
    });
    return;
};

//----------------------------------------------------------------------------------
/* 
PARTE 18: Se usa SweetAlert 
*/
const AvisoFinal = () => {
    Swal.fire({
        title: "Gracias por tu compra!",        
        html: `
            <img src="./assets/img/arte-latte.png" alt="taza de café vista desde arriba con un dibujo de un corazon" style="width: 100px; height: 100px;">
            <p>Su pedido ha sido realizado con éxito.</p>
            <p>Su pedido está siendo procesado.</p>
        `,
        icon: "success"
    });
    return;
};


//----------------------------------------------------------------------------------
/* 
PARTE 19: Se muestran los comentarios guardados en un archivo data.json
*/
const Comentarios = () => { 
    const contComentariosSeccion = document.getElementById("comentariosSeccion");
    const contTituloCompra = document.getElementById("contenedorTituloSeccion");
    contTituloCompra.innerHTML = `<h2>Comentarios</h2>`;
    contComentariosSeccion.appendChild(contTituloCompra);
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
        if (data && data.comentarios && data.comentarios.length > 0) {
            data.comentarios.forEach(comentario => {
            const comentarioElement = document.createElement('div');
            comentarioElement.classList = `comentario`;
            comentarioElement.innerHTML = `<h3>${comentario.nombre}</h3> 
                                            <p>${comentario.contenido}</p>`;
            contComentariosSeccion.appendChild(comentarioElement);
            });
        } else {
            contComentariosSeccion.innerHTML = '<p>No hay comentarios disponibles.</p>';
        }
        })
        .catch(error => {
        contComentariosSeccion.innerHTML = '<p>Error al cargar los comentarios.</p>';
        });
    return;
};

//----------------------------------------------------------------------------------
/* Se realizan la llamada a las funciones */

//Creación de contenido de la Página.
CreacioncontenedorBuscador();
CreacioncontenedorPedido();
CreacionPrecioFinal();
CreacionMenu();
CreacionCompra();
//Llamada a la función para el manejo de la busqueda del producto
BuscarPorTexto();
EliminarBusquedaPorTexto();
GenerarPedido();
EliminarPedidoTotal();
//Llamada a la función para la visualización de Sección Compra.
VisualizacionSectorCompra();
CompletarDatosClienteFormasPago();
BorrarDatos();
FinalizarCompra();

Comentarios();
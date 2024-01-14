/* 
Se crean arreglos con las categorias del menu.
Dentro de cada arreglo se encuentra cada producto
*/
const bebidasCalientes = [
    {nombre: "CORTADO", precio: "$1000"},
    {nombre: "EXPRESSO", precio: "$1000"},
    {nombre: "CAFÉ CON LECHE", precio: "$1500"},
    {nombre: "SUBMARINO", precio: "$1450"},
];
const bebidasFrias = [
    {nombre: "LICUADO", precio: "$2000"},
    {nombre: "AGUA MINERAL", precio: "$1100"},
    {nombre: "GASEOSA", precio: "$1100"},
    {nombre: "CERVEZA", precio: "$1900"},
];
const comidaSalada = [
    {nombre: "TOSTADOS", precio: "$2500"},
    {nombre: "TOSTADAS", precio: "$850"},
    {nombre: "SANDWICH", precio: "$1450"},
    {nombre: "BAGEL", precio: "$3500"},
];
const comidaDulce = [
    {nombre: "TIRAMISU", precio: "$2300"},
    {nombre: "BROWNIE", precio: "$2100"},
    {nombre: "LEMON PIE", precio: "$2300"},
    {nombre: "CHEESCAKE", precio: "$2300"},
];

/* Se crea el menu, que es un arreglo con las categorias */
const menu = [bebidasCalientes, bebidasFrias, comidaSalada, comidaDulce];

/* Variables Globales */
let miPedido = [];
const metodosPago = ['Efectivo', 'Tarjeta', 'Transferencia'];

//---------------------------------------------------------------------------

/* Función de muestra de menú */
const MuestraMenu = () => {
    const contenedorMenu = document.getElementById("contenedorMenu");
    let x;
    contenedorMenu.innerHTML = `<a name="menuRef"></a>`;
    for (let i = 0; i < menu.length; i++){
        x = 0;
        const tituloCategoria = document.createElement("div");
        tituloCategoria.classList.add("categoria");
        if (menu[i] === bebidasCalientes) {
            tituloCategoria.innerHTML = `<a name="calienteRef"></a>
                                        <h3>Caliente</h3>`;
        } else if (menu[i] === bebidasFrias) {
            tituloCategoria.innerHTML = `<a name="frioRef"></a>
                                        <h3>Frio</h3>`;
        } else if (menu[i] === comidaSalada) {
            tituloCategoria.innerHTML = `<a name="saladoRef"></a>
                                        <h3>Salado</h3>`;
        } else if (menu[i] === comidaDulce) {
            tituloCategoria.innerHTML = `<a name="tortasRef"></a>
                                        <h3>Tortas</h3>`;
        }
        contenedorMenu.appendChild(tituloCategoria);
        menu[i].forEach((element,x) => {
            element = document.createElement("div");
            element.id = `producto${i}${x}`;
            element.classList.add(`producto`);
            element.innerHTML = `<p class="productoNombre"> ${menu[i][x].nombre} </p> 
                                <p class="productoPrecio"> ${menu[i][x].precio} </p> 
                                <button class="productoAgregado">Añadir al pedido</button>`;
            contenedorMenu.appendChild(element);
        });
    }
    return;
};

/* Función de Búsqueda de producto por texto*/
const BusquedaProducto = (entradaTexto) => {
    const contenedorMenu = document.getElementById("contenedorMenu");
    let seleccion = entradaTexto.value.toUpperCase();
    if (seleccion === "") {
        MuestraMenu();
    }
    else {
        contenedorMenu.innerHTML = `<h3>Resultados encontrados:</h3>`;
        contenedorMenu.innerHTML += `<a name="menuRef"></a>`;
        let productosFiltrados = menu.reduce((acumulador, categoria) => {
            const productosCategoria = categoria.filter((producto) => producto.nombre.toUpperCase().includes(seleccion));
            return acumulador.concat(productosCategoria);
        },[]);
        productosFiltrados.forEach((producto,x) => {
            element = document.createElement("div");
            element.id = `productoFitradoTexto${x}`;
            element.classList.add(`producto`);
            element.innerHTML = `<p class="productoNombre"> ${producto.nombre} </p> 
                                <p class="productoPrecio"> ${producto.precio} </p> 
                                <button class="productoAgregado">Añadir al pedido</button>`;
            contenedorMenu.appendChild(element);
        });
    }
    return;
};

/* Función de FIN DE Búsqueda de producto por texto*/
const EliminarBusqueda = () => {
    const entradaTexto = document.getElementById("texto");
    entradaTexto.value = "";
    MuestraMenu();    
    return;
}

/* Función que se dirige a las funciones de busqueda o de fin de busqueda de un producto */
const Buscador = () => {
    const entradaTexto = document.getElementById("texto");
    const finBusqueda = document.getElementById("eliminarBusqueda");
    entradaTexto.addEventListener("input",() => BusquedaProducto(entradaTexto));
    finBusqueda.addEventListener("click",EliminarBusqueda);
    return;
};

//-------------------------------------------------------------------------

/* Función para mostrar el valor total del pedido en el contenedor */
const mostrarTotal = (total) => {
    const contenedorPedido = document.getElementById("contenedorPedido");
    let valorTotalDiv = document.getElementById("valorTotalDiv");
    if (!valorTotalDiv) {
        valorTotalDiv = document.createElement("div");
        valorTotalDiv.id = "valorTotalDiv";
        contenedorPedido.appendChild(valorTotalDiv);
    }
    valorTotalDiv.innerHTML = `<h3>Total</h3>
                            <p>$${total.toFixed(2)}</p>`;
    cont = 1;
    return;
};

/* Función para mostrar la propina en el contenedor */
const mostrarPropina = (propina) => {
    let propinaDiv = document.getElementById("propinaDiv");
    if (!propinaDiv) {
        propinaDiv = document.createElement("div");
        propinaDiv.id = "propinaDiv";
        contenedorPedido.appendChild(propinaDiv);
    }
    propinaDiv.innerHTML = `<h3>Propina</h3>
                            <p>$${propina.toFixed(2)}</p>`;
    return;
};

/* Función de Cálculo de Pedido */
const Calculos = (miPedidoFinal) => {
    const contenedorPedido = document.getElementById("contenedorPedido");
    let divPedido = document.getElementById("subtotalDiv");
    if (!divPedido) {
        divPedido = document.createElement("div");
        divPedido.id = "subtotalDiv";
        contenedorPedido.appendChild(divPedido);
    }
    const subtotal = miPedidoFinal.reduce((acumulador, item) => acumulador + parseFloat(item.precioPedidoFinal.replace('$', '')), 0);
    let tituloEnviar = document.getElementById("tituloEnviar");
    if (!tituloEnviar) {
        tituloEnviar = document.createElement("h3");
        tituloEnviar.id = "tituloEnviar";
        tituloEnviar.innerText = "¿Desea enviar su pedido?";
        contenedorPedido.appendChild(tituloEnviar);
    }
    let botonEnvio = document.getElementById("envioBoton");
    if (!botonEnvio) {
        botonEnvio = document.createElement('button');
        botonEnvio.id = 'envioBoton';
        botonEnvio.innerText = 'Si';
        contenedorPedido.appendChild(botonEnvio);
    }
    let botonNoEnvio = document.getElementById("noEnvioBoton");
    if (!botonNoEnvio) {
        botonNoEnvio = document.createElement('button');
        botonNoEnvio.id = 'noEnvioBoton';
        botonNoEnvio.innerText = 'No';
        contenedorPedido.appendChild(botonNoEnvio);
    }
    let propina = subtotal * 0.15;
    let totalAPagar = 0.00;
    botonNoEnvio.disabled = true;
    botonEnvio.disabled = false;
    botonEnvio.addEventListener('click', () => {
        botonEnvio.disabled = true;
        botonNoEnvio.disabled = false;
        propina = 0.00;
        mostrarPropina(propina);;
        totalAPagar = subtotal + propina;
        mostrarTotal(totalAPagar);
    });
    botonNoEnvio.addEventListener('click', () => {
        botonNoEnvio.disabled = true;
        botonEnvio.disabled = false;
        propina = subtotal * 0.15;
        mostrarPropina(propina);
        let propinaDiv = document.getElementById("propinaDiv");
        propinaDiv.innerHTML += `<p>(Propina del 15%)</p>`;
        totalAPagar = subtotal + propina;
        mostrarTotal(totalAPagar);
    });
    divPedido.innerHTML = `<h3>Subtotal</h3>
                           <p>$${subtotal.toFixed(2)}</p>`;
    mostrarPropina(propina);
    let propinaDiv = document.getElementById("propinaDiv");
    propinaDiv.innerHTML += `<p>(Propina del 15%)</p>`;
    totalAPagar = subtotal + propina;
    mostrarTotal(totalAPagar);
    return;
};

/* 
Función de actualización de pedido:
Muestra que productos han sido seleccionados y el precio.
Además, permite añadir más o menos cantidad de productos, 
calculando el valor total segun la cantidad agregada de un producto
Por último, esta función genera un botón de eliminar para sacar rápidamente un producto de la lista
sin necesidad de presionar el botón menos hasta llegar a "0".
*/

const ActualizarPedido = (miPedido) => {
    const seccionPedido = document.getElementById("seccionPedido");
    const cantidadTotal = miPedido.reduce((total, item) => total + item.cantidad, 0);
    if (cantidadTotal === 0) {
        contenedorPedido.innerHTML = `<h2>Mi Pedido</h2>
                                     <h3>Esperando Pedido</h3>`;
    } else {
        seccionPedido.innerHTML = '';
        miPedido.forEach((item, x) => {
            const divPedido = document.createElement("div");
            divPedido.id = `productoPedido${x}`;
            divPedido.classList.add(`pedido`);
            const totalItem = `$${item.precioProducto.replace('$', '') * item.cantidad}`;
            divPedido.innerHTML += `<h4>${item.cantidad} x ${item.nombreProducto}</h4>
                                    <button class="menos">-</button>
                                    <h4>${totalItem} </h4>
                                    <button class="mas">+</button>
                                    <button class="eliminarItem">x</button>`;
            seccionPedido.appendChild(divPedido);
            const botonMenos = divPedido.getElementsByClassName("menos");
            const botonMas = divPedido.getElementsByClassName("mas");
            const botonEliminarItem = divPedido.getElementsByClassName("eliminarItem");
            for (let i = 0; i < botonMenos.length; i++) {
                botonMenos[i].addEventListener('click', function () {
                    if (item.cantidad > 1) {
                        item.cantidad--;
                    } else {
                        miPedido.splice(x, 1);
                    }
                    ActualizarPedido(miPedido);
                });
            }
            for (let i = 0; i < botonMas.length; i++) {
                botonMas[i].addEventListener('click', function () {
                    item.cantidad++;
                    ActualizarPedido(miPedido);
                });
            }
            for (let i = 0; i < botonEliminarItem.length; i++) {
                botonEliminarItem[i].addEventListener('click', function () {
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

/* Función para generar pedido */
const GenerarPedido = () => {
    const contenedorPedido = document.getElementById("contenedorPedido");
    contenedorPedido.innerHTML = `  <h2>Mi Pedido</h2>
                                    <h3>Esperando Pedido</h3>
                                    <div id="seccionPedido"></div>`; 
    const contenedorMenu = document.getElementById("contenedorMenu");
    contenedorMenu.addEventListener("click", function (evento) {
        contenedorPedido.innerHTML = `  <h2>Mi Pedido</h2>
                                        <div id="seccionPedido"></div>`; 
        if (evento.target.classList.contains("productoAgregado")) {
            const contenedorProductoAgregado = evento.target.closest(".producto");
            let nombre = contenedorProductoAgregado.querySelector(".productoNombre").textContent;
            let precio = contenedorProductoAgregado.querySelector(".productoPrecio").textContent;
            const indice = miPedido.findIndex(item => item.nombreProducto === nombre);
            if (indice !== -1) {
                miPedido[indice].cantidad++;
            } else {                
                miPedido.push({ nombreProducto: nombre, precioProducto: precio, cantidad: 1 });
            }
            ActualizarPedido(miPedido,0);
        }
    });
    return;
};

/* Función para eliminar el Pedido */
const EliminarPedido = () => {
    let contenedorEliminarPedido = document.getElementById("contenedorEliminarPedido");
    let botonEliminarPedido = document.createElement("button");
    botonEliminarPedido.textContent = "Eliminar Pedido";
    botonEliminarPedido.addEventListener("click", function() {
        miPedido = [];
        let contenedorPedido = document.getElementById("contenedorPedido");
        contenedorPedido.innerHTML = `  <h2>Mi Pedido</h2>
                                        <h3>Esperando Pedido</h3>`;
    });
    contenedorEliminarPedido.appendChild(botonEliminarPedido);
    return;
};

//----------------------------------------------------------
/* Función Para ir a continuar la compra */
const Comprar = () => {
    let contenedorCompraPedido = document.getElementById("continuarCompraPedido");
    let contenedorCompra = document.getElementById("compra");
    let continuarCompraPedido = document.createElement("button");
    continuarCompraPedido.textContent = "Comprar";
    continuarCompraPedido.addEventListener("click", () => {
        contenedorCompra.scrollIntoView({ behavior: "smooth" });
    });
    contenedorCompraPedido.appendChild(continuarCompraPedido);
    return;
};

//-----------------------------------------------------------
/* Función para guardar los datos del clinte */
const DatosCliente = () => {
    const nombre = document.getElementById('inputNombre').value;
    const direccion = document.getElementById('inputDireccion').value;
    const telefono = document.getElementById('inputTelefono').value;
    const dni = document.getElementById('inputDNI').value;
    localStorage.setItem('nombre', nombre);
    localStorage.setItem('direccion', direccion);
    localStorage.setItem('telefono', telefono);
    localStorage.setItem('dni', dni);
    return {
        nombre,
        direccion,
        telefono,
        dni,
    };
};

/* Función para borrar los datos del cliente */
const borrarDatosCliente = () => {
    let inputs = document.querySelectorAll('#formulario input');
    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            input.checked = false;
            localStorage.setItem(input.id, false);
        } else {
            input.value = '';
            localStorage.setItem(input.id,'');
        }
    });
    localStorage.removeItem('inputNombre');
    localStorage.removeItem('inputDireccion');
    localStorage.removeItem('inputTelefono');
    localStorage.removeItem('inputDNI');
    localStorage.removeItem('inputTarjeta');
    localStorage.removeItem('inputTransferencia');
    localStorage.removeItem('inputEfectivo');
    localStorage.removeItem('nombre');
    localStorage.removeItem('direccion');
    localStorage.removeItem('telefono');
    localStorage.removeItem('dni');
    return;
};

/* Función para Reiniciar la Compra */
const ReiniciarCompra = () => {
    const formularioDiv = document.getElementById('formulario');
    borrarDatosCliente();
    CrearFormulario();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
};

/* Función para mostrar los datos del cliente */
const mostrarDatosCliente = () => {
    const datosCliente = DatosCliente();
    if (datosCliente.nombre == '' || datosCliente.direccion == '' || datosCliente.telefono == '' || datosCliente.dni == ''){
        DatosCliente();
    }
    else{
        const formularioDiv = document.getElementById('formulario');
        const checkboxesSeleccionados = metodosPago.filter(metodo => {
            return document.getElementById(`input${metodo}`).checked;
        });

        if (checkboxesSeleccionados.length > 0) {
            formularioDiv.innerHTML = ` <h2>Compra</h2>
                                        <h3>Resumen</h3>
                                        <p>Nombre: ${datosCliente.nombre}</p>
                                        <p>Dirección: ${datosCliente.direccion}</p>
                                        <p>Teléfono: ${datosCliente.telefono}</p>
                                        <p>DNI: ${datosCliente.dni}</p>
                                        <p>Métodos de Pago: ${checkboxesSeleccionados.join(', ')}</p>
                                        <h3>Gracias por realizar su compra!!!</h3>
                                        <p>Su pedido ha sido realizado con éxito</p>
                                        <p>Gracias por comprar con nosotros </p>
                                        <p>Su pedido está siendo procesado</p>`;
            const reiniciarButton = document.createElement('button');
            reiniciarButton.textContent = 'Volver a comprar';
            reiniciarButton.addEventListener('click', ReiniciarCompra);
            formularioDiv.appendChild(reiniciarButton);
        }
    }
    return;
};

/* Función para crear el formulario con datos del cliente*/
const FormCliente = () =>{
    const campos = [
        { label: 'Nombre: ', type: 'text', id: 'inputNombre', placeholder: 'Ingrese su nombre' },
        { label: 'Dirección: ', type: 'text', id: 'inputDireccion', placeholder: 'Ingrese su dirección' },
        { label: 'Teléfono: ', type: 'text', id: 'inputTelefono', placeholder: 'Ingrese su teléfono' },
        { label: 'DNI: ', type: 'text', id: 'inputDNI', placeholder: 'Ingrese su DNI' }
    ];
    const formularioDiv = document.getElementById('formulario');
    const h4DatosCliente = document.createElement('h4');
    h4DatosCliente.innerText = "Datos del cliente";
    formularioDiv.appendChild(h4DatosCliente);
    for (const campo of campos) {
        const label = document.createElement('label');
        label.textContent = campo.label;
        const input = document.createElement('input');
        input.type = campo.type;
        input.id = campo.id;
        input.placeholder = campo.placeholder;
        // Agregar evento de escucha para actualizar el localStorage
        input.addEventListener('input', () => {            
            if (input.id == "inputNombre" ){
                if (!isNaN(input.value) || !/^[a-zA-Z]+$/.test(input.value.trim())){
                    input.value = '';
                    input.placeholder = 'Ingrese nuevamente su nombre';
                    localStorage.removeItem('inputNombre');
                }
                else {
                    localStorage.setItem(input.id, input.value);
                }
            }
            if (input.id == "inputDireccion" ){
                if ((input.value == '') || input.value == ' '){
                    input.value = '';
                    input.placeholder = 'Ingrese nuevamente su direccion';            
                    localStorage.removeItem('inputDireccion');
                }
                else {
                    localStorage.setItem(input.id, input.value);
                }
            }
            if (input.id == "inputTelefono" ){
                if (isNaN(input.value) || input.value == '' || input.value == ' '){
                    input.value = '';
                    input.placeholder = 'Ingrese nuevamente su teléfono';
                    localStorage.removeItem('inputTelefono');
                }
                else {
                    localStorage.setItem(input.id, input.value);
                }
            }
            if (input.id == "inputDNI" ){
                if (isNaN(input.value) || input.value == '' || input.value == ' '){
                    input.value = '';
                    input.placeholder = 'Ingrese nuevamente su teléfono';
                    localStorage.removeItem('inputDNI');
                }
                else {
                    localStorage.setItem(input.id, input.value);
                }
            }
        });
        formularioDiv.appendChild(label);
        formularioDiv.appendChild(input);
        formularioDiv.appendChild(document.createElement('br'));
        // Mostrar los datos almacenados en localStorage en los placeholders
        input.value = localStorage.getItem(input.id) || '';
    }
    return;
};

/* Función para crear el formulario con datos del cliente*/
const FormCheck = () =>{
    const formularioDiv = document.getElementById('formulario');
    const h4FormasPago = document.createElement('h4');
    h4FormasPago.innerText = "Formas de Pago";
    formularioDiv.appendChild(h4FormasPago);
    metodosPago.forEach(metodo => {
        const checkboxInput = document.createElement('input');
        checkboxInput.type = 'checkbox';
        checkboxInput.id = `input${metodo}`;

        checkboxInput.addEventListener('change', () => {
            metodosPago.filter(m => m !== metodo).forEach(otroMetodo => {
                document.getElementById(`input${otroMetodo}`).checked = false;
                localStorage.setItem(`input${otroMetodo}`, false);
            });
            // Almacenar la selección del método de pago actual en localStorage
            localStorage.setItem(`input${metodo}`, checkboxInput.checked);
        });

        const checkboxLabel = document.createElement('label');
        checkboxLabel.textContent = metodo;
        formularioDiv.appendChild(checkboxInput);
        formularioDiv.appendChild(checkboxLabel);
        formularioDiv.appendChild(document.createElement('br'));
        // Recuperar la selección del método de pago desde localStorage con JSON
        checkboxInput.checked = JSON.parse(localStorage.getItem(`input${metodo}`)) || false;
    });
    return;
};


/* Función para crear el formulario */
const CrearFormulario = () => {
    const formularioDiv = document.getElementById('formulario');
    const compraTitulo = document.createElement('h2');
    compraTitulo.textContent = 'Compra';
    formularioDiv.appendChild(compraTitulo);
    FormCliente();
    FormCheck();
    formularioDiv.appendChild(document.createElement('br'));
    const mostrarDatosButton = document.createElement('button');
    mostrarDatosButton.textContent = 'Continuar';
    mostrarDatosButton.classList = 'continuarBoton';
    mostrarDatosButton.addEventListener('click', mostrarDatosCliente);
    formularioDiv.appendChild(mostrarDatosButton);
    const borrarDatosButton = document.createElement('button');
    borrarDatosButton.classList = 'borrarInformaciónBoton';
    borrarDatosButton.textContent = 'Borrar Información';
    borrarDatosButton.addEventListener('click', borrarDatosCliente);
    formularioDiv.appendChild(borrarDatosButton);
    return;
};

//-------------------------------------------------------------------

/* LLamada a funciones */
MuestraMenu();
Buscador();
GenerarPedido();
EliminarPedido();
Comprar();
CrearFormulario();


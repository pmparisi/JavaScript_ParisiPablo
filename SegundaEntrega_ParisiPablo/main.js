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

/* Función de muestra de menú */
const MuestraMenu = () => {
    const pedido = menu.reduce((acumulador, categoria) => acumulador.concat(categoria));
    let mensaje = "MENU:\n";
    for (const producto of pedido) {
        mensaje += `${producto.nombre}: ${producto.precio}\n`;
    }
    alert(mensaje);
};

/* Función de selección de producto deseado */
const ObtenerPedido = () => {
    let seleccion;
    let importe;
    MuestraMenu();
    seleccion = prompt("Por favor, ingrese su pedido").toUpperCase();
    while (true) {
        const pedido = menu.reduce((acumulador, categoria) => acumulador.concat(categoria)).find(encargo => encargo.nombre === seleccion);
        if (pedido) {
            importe = pedido.precio;
            break;
        } else {
            alert("Producto no encontrado. Por favor revise nuevamente el menú")
            MuestraMenu();
            seleccion = prompt("Por favor, ingrese su pedido nuevamente.").toUpperCase();
        }
    }
    return [seleccion, importe];
};

/* Función de selección de cantidad de productos deseados */
const CantPedido = () => {
    cant = prompt("Por favor, ingrese la cantidad deseada");
    while (isNaN(cant) || cant == 0){
        alert("Cantidad incorrecta");
        cant = prompt("Por favor, ingrese nuevamente la cantidad deseada");
    }
    cant = parseInt(cant);
    alert(`La cantidad seleccionada es: ${cant}`);
    return cant;
};

/* Función con selección de precio de acuerdo al producto ingresado y calculo del precio total en base a la cantidad total de dicho producto */
const PrecioPedido = (importe, cantidad) => {
    importe = parseInt(importe.slice(1));
    let monto = importe * cantidad;
    alert(`El monto de su compra es: $${monto}`);
    return monto;
};

/* Función de control de modificación para añadir o restar la cantidad de un producto */
const Modificar = () => {
    let cantAnadirRestar = "";
    cantAnadirRestar = prompt("Desea modificar la cantidad: 'si' o 'no'").toLowerCase();
    while(cantAnadirRestar != 'si' && cantAnadirRestar != 'no') {
        cantAnadirRestar = prompt("Para modificar la cantidad ingrese: 'si' o 'no'").toLowerCase();
    }
    return cantAnadirRestar;
};

/* Función de añadir o restar la cantidad de un producto */
const AnadirRestarProducto = (cant) => {
    let cantidadAnadirRestar = "";
    let anadirRestar = "";
    let controlCantidad = 0;
    cantidadAnadirRestar = Modificar();
    while(controlCantidad == 0) {
        switch(cantidadAnadirRestar){
            case "si":
                anadirRestar = prompt("Por favor, ingrese '+' para añadir y '-' para restar").toLowerCase();
                while(anadirRestar != "+" && anadirRestar != "-"){
                    anadirRestar = prompt("Por favor, ingrese '+' para añadir y '-' para restar").toLowerCase();    
                }
                if(anadirRestar == "+"){
                    cant += 1;
                } else {
                    if (cant <= 1){
                        alert(`Error, no puede tener menos de 1 producto\nSi desea eliminar el producto presione 'no' y luego presione 'si' en la consulta de borrar pedido`)
                    } else {
                        cant -= 1;
                    }
                }
                cantidadAnadirRestar = Modificar();
                break;
            case "no":
                controlCantidad = 1;
                break;
            default:
                cantidadAnadirRestar = Modificar();
                break;
        }
    }
    alert(`La cantidad seleccionada es: ${cant}`);
    return cant;
};

/* Función de recargo */
const Recargo = () => {
    let consumo;
    let recargo;
    consumo = parseInt(prompt(`Presione "0" si desea consumir en el local (recargo del 15%)\n Presione "1" si desea retirar en el local`));
    if(consumo == 0){
        recargo = 0.15;
    } else if (consumo == 1) {
        recargo = 0.0;
    }
    return recargo;
};

/* Función que prouce el listado de compra final */
const ListadoCompra = () => {
    let recargo;
    let precioTotalPedido = pedidoTotal.reduce((total, objeto) => parseInt(total + objeto.precioProducto),0);
    let listado = "Mi Pedido:\n";
    pedidoTotal.forEach(item => {
        listado += `Pedido Nº: ${item.productoNumero}: ${item.productoCantidad} ${item.productoPedido} $${item.precioProducto}\n`;
    });
    recargo = Recargo();
    listado += `Subtotal: $${precioTotalPedido}\n`;
    listado += `Recargo: ${recargo*100}%\n`;
    listado += `Total: $${precioTotalPedido+(recargo*precioTotalPedido)}\n`;
    return listado;
};

/*
Sección principal:
Se recorren distintos estados que permitiran al usuario realizar un pedido de un producto eligiendo la cantidad de elementos a comprar,
Antes de finaizar la compra, se le pide al usuario que ingrese su información para realizar la compra.
*/

let numeroPedido = 0;
let pedidoActual;
let  pedidoTotal = [];
let estado = "inicio";
while(true){
    switch(estado) {
        case "inicio":
            let cantidad = 0;
            let borrar = "";
            let plata;
            let otroProducto = "";
            let producto = ObtenerPedido();
            alert(`Pedido: ${producto[0]}, Importe: ${producto[1]}`);
            cantidad = CantPedido();
            cantidad = AnadirRestarProducto(cantidad);
            plata = PrecioPedido(producto[1],cantidad);
            pedidoActual = {productoNumero: numeroPedido, productoPedido: producto[0], productoCantidad: cantidad, precioProducto: plata};
            pedidoTotal.push(pedidoActual);
            borrar = prompt("Desea borrar su pedido: 'si' o 'no'").toLowerCase();
            while(borrar != "si" && borrar != "no") {
                borrar = prompt("Por favor, seleccione 'si' o 'no'").toLowerCase();
            }
            if (borrar == "si") {
                numeroPedido = 0;
                pedidoTotal = [];
                estado = "inicio";
            } else {
                otroProducto = prompt("Desea agreagar otro producto: 'si' o 'no'").toLowerCase();
                while(otroProducto != "si" && otroProducto != "no") {
                    otroProducto = prompt("Por favor, seleccione 'si' o 'no'").toLowerCase();
                }
                if(otroProducto == "si"){
                    numeroPedido ++;
                    estado = "inicio";
                }
                else {
                    let listado;
                    listado = ListadoCompra(pedidoTotal);
                    alert(listado);                    
                    numeroPedido = 0;
                    pedidoTotal = [];
                    estado = "comprar";
                }                
            }
            break;
        case "comprar":
            let nombre = "";
            let documento = 0;
            let pago = "";
            let respuesta = "";
            alert("Por favor, ingrese sus datos");
            nombre = prompt("Por favor, ingrese su nombre");
            while (!isNaN(nombre) || nombre == "") {
                nombre = prompt("Por favor, ingrese su nombre nuevamente");    
            }
            documento = prompt("Por favor, ingrese su documento");
            while (isNaN(documento) || documento == 0) {
                documento = prompt("Por favor, ingrese su documento nuevamente");
            }
            pago = prompt("Por favor, ingrese medio de pago: 'efectivo' o 'tarjeta' o 'transferencia'").toLowerCase();
            while (pago != "efectivo" && pago != "tarjeta" && pago != "transferencia") {
                pago = prompt("Por favor, ingrese medio de pago nuevamente: 'efectivo' o 'tarjeta' o 'transferencia'").toLowerCase();
            }
            alert(`Los datos ingresados fueron: nombre ${nombre}, DNI: ${documento}, Medio de Pago: ${pago}`);
            respuesta = prompt("Por favor, seleccione 'continuar' o 'borrardatos' o 'borrarcompra'").toLowerCase();
            while (respuesta != "continuar" && respuesta != "borrardatos" && respuesta != "borrarcompra") {
                respuesta = prompt("Por favor, seleccione 'continuar' o 'borrardatos' o 'borrarcompra'").toLowerCase();  
            }
            if (respuesta == "continuar"){
                estado = "finalizar";
            } else if (respuesta == "borrardatos") {
                estado = "comprar";
            } else {
                estado = "inicio";
            }
            break;
        case "finalizar":
            alert(`Su pedido ha sido realizado con exito\nGracias por comprar con nosotros\nSu pedido esta siendo procesado`);
            estado = "inicio";
            break;
        default:
            estado = "inicio";
            break;
    }    
};

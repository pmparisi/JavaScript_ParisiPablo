/* Función de selección de producto deseado */
const prodPedido = () => {
    let prod = prompt("Por favor, seleccione un producto del menú: 'café' ($1500), 'gaseosa' ($1000), 'tostada' ($2000), 'torta' ($2500)").toLowerCase();
    while (prod != 'café' && prod != 'gaseosa' && prod != 'tostada' && prod != 'torta'){
        alert("Producto incorrecto");
        prod = prompt("Por favor, seleccione un producto del menú: 'café' ($1500), 'gaseosa' ($1000), 'tostada' ($2000), 'torta' ($2500)").toLowerCase();
    }
    alert(`El producto seleccionado es: ${prod}`);
    return prod;
}

/* Función de selección de cantidad de productos deseados */
const cantPedido = () => {
    cant = prompt("Por favor, ingrese la cantidad deseada");
    while (isNaN(cant) || cant == 0){
        alert("Cantidad incorrecta");
        cant = prompt("Por favor, ingrese nuevamente la cantidad deseada");
    }
    cant = parseInt(cant);
    alert(`La cantidad seleccionada es: ${cant}`);
    return cant;
}

/* Función con selección de precio de acuerdo al producto ingresado y calculo del precio total en base a la cantidad total de dicho producto */
const precioPedido = (p, c) =>{
    let monto = 0;
    switch(p){
        case "café":
            monto = 1500 * c;
            break;
        case "gaseosa":
            monto = 1000 * c;
            break;
        case "tostada":
            monto = 2000 * c;
            break;
        case "torta":
            monto = 2500 * c;
            break;
    }
    alert(`El monto de su compra es: $${monto}`);
    return monto;
};

/* Función de control de modificación para añadir o restar la cantidad de un producto */
    const modificar = () => {
        let cantAnadirRestar = "";
        cantAnadirRestar = prompt("Desea modificar la cantidad: 'si' o 'no'").toLowerCase();
        while(cantAnadirRestar != 'si' && cantAnadirRestar != 'no') {
            cantAnadirRestar = prompt("Para modificar la cantidad ingrese: 'si' o 'no'").toLowerCase();
        }
        return cantAnadirRestar;
};


/* Función de añadir o restar la cantidad de un producto */
const anadirRestarProducto = (cant) => {
    let cantidadAnadirRestar = "";
    let anadirRestar = "";
    let controlCantidad = 0;
    cantidadAnadirRestar = modificar();
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
                        alert("Error, no puede tener menos de 1 producto");
                        alert("Si desea eliminar el producto presione 'no' y luego presione 'si' en la consulta de borrar pedido");
                    } else {
                        cant -= 1;
                    }
                }
                cantidadAnadirRestar = modificar();
                break;
            case "no":
                controlCantidad = 1;
                break;
            default:
                cantidadAnadirRestar = modificar();
                break;
        }
    }
    alert(`La cantidad seleccionada es: ${cant}`);
    return cant;
};


/* 
Sección principal 
Se recorren distintos estados que permitiran al usuario realizar un pedido de un producto eligiendo la cantidad de elementos a comprar,
Antes de finaizar la compra, se le pide al usuario que ingrese su información para realizar la compra.
*/

let estado = "inicio";
while(true){
    switch(estado) {
        case "inicio":
            let producto = "";
            let cantidad = 0;
            let borrar = "";
            alert("Por favor, ingrese su pedido");
            producto = prodPedido();
            cantidad = cantPedido();
            cantidad = anadirRestarProducto(cantidad);
            precio = precioPedido(producto,cantidad);
            borrar = prompt("Desea borrar su pedido: 'si' o 'no'").toLowerCase();
            while(borrar != "si" && borrar != "no") {
                borrar = prompt("Por favor, seleccione 'si' o 'no'").toLowerCase();
            }
            if (borrar == "si") {
                estado = "inicio";
            } else {
                estado = "comprar";
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
            alert("Su pedido ha sido realizado con exito");
            alert("Gracias por comprar con nosotros");
            alert("Su pedido esta siendo procesado");
            estado = "inicio";
            break;
        default:
            estado = "inicio";
            break;
    }    
}

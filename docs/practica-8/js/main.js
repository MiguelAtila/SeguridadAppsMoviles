// 1. Arreglo de productos
let productos = [
    { nombre: "Camiseta", precio: 15, stock: 10 },
    { nombre: "Pantalón", precio: 20, stock: 17 },
    { nombre: "Zapatos", precio: 50, stock: 5 },
    { nombre: "Vestido", precio: 25, stock: 8 },
    { nombre: "Sudadera", precio: 30, stock: 20 },
];

// 2. Carrito de compras
let carrito = [];

// 3. Mostrar productos en la tienda con addEventListener
function mostrarProductos() {
    let listaProductos = document.getElementById("lista-productos");
    listaProductos.innerHTML = "";

    productos.forEach((producto, index) => {
        let div = document.createElement("div");
        div.innerHTML = `
            <p><strong>${producto.nombre}</strong> - $${producto.precio} (Stock: ${producto.stock})</p>
            <button class="agregar" data-index="${index}"> Agregar</button>
        `;
        listaProductos.appendChild(div);
    });

    // Asignar eventos a los botones después de renderizar el HTML
    document.querySelectorAll(".agregar").forEach(btn => {
        btn.addEventListener("click", (event) => {
            let index = event.target.dataset.index;
            agregarAlCarrito(productos[index].nombre, 1);
        });
    });
}

// 4. Mostrar productos en el carrito
function mostrarCarrito() {
    let listaCarrito = document.getElementById("lista-carrito");
    let totalCarrito = document.getElementById("total-carrito");
    listaCarrito.innerHTML = "";

    let total = 0;

    carrito.forEach((producto, index) => {
        total += producto.total;

        let div = document.createElement("div");
        div.innerHTML = `
            <p><strong>${producto.nombre}</strong> - ${producto.cantidad} x $${producto.precio} = $${producto.total}</p>
            <button class="eliminar" data-index="${index}">🗑️ Eliminar</button>
        `;
        listaCarrito.appendChild(div);
    });

    totalCarrito.innerText = `Total: $${total.toFixed(2)}`;

    // Agregar eventos a los botones de eliminar
    document.querySelectorAll(".eliminar").forEach(btn => {
        btn.addEventListener("click", (event) => {
            let index = event.target.dataset.index;
            eliminarDelCarrito(index);
        });
    });
}

// 5. Agregar producto al carrito
function agregarAlCarrito(productoNombre, cantidad) {
    let producto = productos.find(p => p.nombre === productoNombre);

    if (!producto || producto.stock < cantidad) {
        alert(`❌ No hay suficiente stock de "${productoNombre}".`);
        return;
    }

    let productoEnCarrito = carrito.find(p => p.nombre === productoNombre);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad += cantidad;
        productoEnCarrito.total += producto.precio * cantidad;
    } else {
        carrito.push({
            nombre: producto.nombre,
            cantidad: cantidad,
            precio: producto.precio,
            total: producto.precio * cantidad,
        });
    }

    producto.stock -= cantidad;

    mostrarProductos();
    mostrarCarrito();
}

// 6. Eliminar producto del carrito
function eliminarDelCarrito(index) {
    let producto = carrito[index];

    productos.find(p => p.nombre === producto.nombre).stock += producto.cantidad;

    carrito.splice(index, 1);

    mostrarProductos();
    mostrarCarrito();
}

// 7. Procesar compra con cuenta regresiva (Corrección Final)
function procesarCompra() {
    let mensajeCompra = document.getElementById("mensaje-compra");

    if (carrito.length === 0) {
        mensajeCompra.innerHTML = `<span style="color: red;">❌ El carrito está vacío.</span>`;
        return;
    }

    let total = carrito.reduce((acc, item) => acc + item.total, 0);
    let descuentoAplicado = total > 100 ? total * 0.1 : 0; // 10% de descuento si el total > $100
    let totalFinal = total - descuentoAplicado;
    let contador = 3;

    function cuentaRegresiva() {
        if (contador === 0) {
            // ✅ Se muestra el mensaje final antes de vaciar el carrito
            let mensajeFinal = `✅ Compra realizada con éxito.<br>`;

            if (descuentoAplicado > 0) {
                mensajeFinal += `🎉 <strong>Descuento aplicado: $${descuentoAplicado.toFixed(2)}</strong><br>`;
            }

            mensajeFinal += `💰 <strong>Total a pagar: $${totalFinal.toFixed(2)}</strong>`;

            mensajeCompra.innerHTML = mensajeFinal;

            // ✅ Agregar "Gracias por tu compra" después de 2 segundos
            setTimeout(() => {
                mensajeCompra.innerHTML += `<br>🎉 ¡Gracias por tu compra! 🛍️`;
            }, 2000);

            // ✅ Vaciar carrito después de mostrar el mensaje
            setTimeout(() => {
                carrito = [];
                mostrarCarrito();
            }, 2500);
            
            return;
        }

        mensajeCompra.innerHTML = `⏳ Confirmando compra en <strong>${contador}</strong>...`;
        contador--;

        setTimeout(cuentaRegresiva, 1000);
    }

    cuentaRegresiva();
}

// 8. Verificar que el botón existe antes de añadir el evento
document.addEventListener("DOMContentLoaded", () => {
    let botonProcesar = document.getElementById("procesar-compra");
    if (botonProcesar) {
        botonProcesar.addEventListener("click", procesarCompra);
    }
});

// 9. Inicializar la tienda
mostrarProductos();
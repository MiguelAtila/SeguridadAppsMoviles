// 1. Inicialmente, el arreglo de productos estará vacío y se llenará desde la API
let productos = [];
let carrito = [];

// Función para cargar productos desde Fake Store API
async function cargarProductos() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    // Mapear los productos de la API a la estructura de la tienda.
    // Se asigna un stock aleatorio entre 1 y 20 a cada producto.
    productos = data.map(prod => ({
      nombre: prod.title,
      precio: prod.price,
      stock: Math.floor(Math.random() * 20) + 1
    }));
    mostrarProductos();
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
}

// 2. Mostrar productos en la tienda
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

  // Asignar eventos a los botones de agregar
  document.querySelectorAll(".agregar").forEach(btn => {
    btn.addEventListener("click", (event) => {
      let index = event.target.dataset.index;
      agregarAlCarrito(productos[index].nombre, 1);
    });
  });
}

// 3. Mostrar productos en el carrito
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
      <button class="restar" data-index="${index}">➖</button>
      <button class="sumar" data-index="${index}">➕</button>
      <button class="eliminar" data-index="${index}">🗑️</button>
    `;
    listaCarrito.appendChild(div);
  });

  totalCarrito.innerText = `Total: $${total.toFixed(2)}`;

  // Eventos para modificar cantidad y eliminar
  document.querySelectorAll(".sumar").forEach(btn => {
    btn.addEventListener("click", (event) => modificarCantidad(event.target.dataset.index, 1));
  });

  document.querySelectorAll(".restar").forEach(btn => {
    btn.addEventListener("click", (event) => modificarCantidad(event.target.dataset.index, -1));
  });

  document.querySelectorAll(".eliminar").forEach(btn => {
    btn.addEventListener("click", (event) => eliminarDelCarrito(event.target.dataset.index));
  });
}

function agregarAlCarrito(nombre, cantidad) {
  let producto = productos.find(p => p.nombre === nombre);
  if (!producto || producto.stock < cantidad) {
    alert(`❌ No hay suficiente stock de "${nombre}".`);
    return;
  }

  let enCarrito = carrito.find(p => p.nombre === nombre);
  if (enCarrito) {
    enCarrito.cantidad += cantidad;
    enCarrito.total += producto.precio * cantidad;
  } else {
    carrito.push({ nombre, cantidad, precio: producto.precio, total: producto.precio * cantidad });
  }

  producto.stock -= cantidad;
  mostrarProductos();
  mostrarCarrito();
}

function modificarCantidad(index, cambio) {
  let producto = carrito[index];
  let inventario = productos.find(p => p.nombre === producto.nombre);

  if (cambio === 1 && inventario.stock > 0) {
    producto.cantidad++;
    producto.total += producto.precio;
    inventario.stock--;
  } else if (cambio === -1 && producto.cantidad > 1) {
    producto.cantidad--;
    producto.total -= producto.precio;
    inventario.stock++;
  } else if (cambio === -1 && producto.cantidad === 1) {
    eliminarDelCarrito(index);
    return;
  }

  mostrarProductos();
  mostrarCarrito();
}

function eliminarDelCarrito(index) {
  let producto = carrito[index];
  let inventario = productos.find(p => p.nombre === producto.nombre);
  inventario.stock += producto.cantidad;
  carrito.splice(index, 1);
  mostrarProductos();
  mostrarCarrito();
}

function procesarCompra() {
  let mensaje = document.getElementById("mensaje-compra");

  if (carrito.length === 0) {
    mensaje.innerHTML = `<span style="color:red;">❌ El carrito está vacío.</span>`;
    return;
  }

  let total = carrito.reduce((acc, item) => acc + item.total, 0);
  let descuentoAplicado = total > 100 ? total * 0.1 : 0;
  let totalFinal = total - descuentoAplicado;

  // Mostrar loader
  mensaje.innerHTML = `<div class="loader"></div> Procesando compra...`;

  setTimeout(() => {
    mensaje.innerHTML = `✅ Compra realizada con éxito.<br>`;
    if (descuentoAplicado > 0) {
      mensaje.innerHTML += `🎉 <strong>Descuento aplicado: $${descuentoAplicado.toFixed(2)}</strong><br>`;
    }
    mensaje.innerHTML += `💰 <strong>Total a pagar: $${totalFinal.toFixed(2)}</strong>`;
    setTimeout(() => {
      mensaje.innerHTML += `<br>🎉 ¡Gracias por tu compra! 🛍️`;
    }, 2000);

    carrito = [];
    mostrarCarrito();
  }, 5000);
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("procesar-compra").addEventListener("click", procesarCompra);
  cargarProductos();
});
  
// Función para cargar productos desde Fake Store API
async function cargarProductos() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    // Mapear productos: usamos title como nombre, price, y stock aleatorio
    productos = data.map(prod => ({
      nombre: prod.title,
      precio: prod.price,
      stock: Math.floor(Math.random() * 20) + 1
    }));
    mostrarProductos();
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
}
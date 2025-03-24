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
  
  // 3. Mostrar productos en la tienda
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
  
    document.querySelectorAll(".agregar").forEach(btn => {
      btn.addEventListener("click", (event) => {
        let index = event.target.dataset.index;
        agregarAlCarrito(productos[index].nombre, 1);
      });
    });
  }
  
  // 4. Mostrar carrito
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
  
  // 5. Agregar al carrito
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
  
  // 6. Modificar cantidad
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
  
  // 7. Eliminar del carrito
  function eliminarDelCarrito(index) {
    let producto = carrito[index];
    let inventario = productos.find(p => p.nombre === producto.nombre);
    inventario.stock += producto.cantidad;
    carrito.splice(index, 1);
    mostrarProductos();
    mostrarCarrito();
  }
  
  // 8. Procesar compra con loader
  function procesarCompra() {
    let mensaje = document.getElementById("mensaje-compra");
  
    if (carrito.length === 0) {
      mensaje.innerHTML = `<span style="color:red;">❌ El carrito está vacío.</span>`;
      return;
    }
  
    let total = carrito.reduce((acc, item) => acc + item.total, 0);
    let descuento = total > 100 ? total * 0.1 : 0;
    let totalFinal = total - descuento;
  
    mensaje.innerHTML = `<div class="loader"></div> Procesando compra...`;
  
    setTimeout(() => {
      mensaje.innerHTML = `✅ Compra realizada con éxito.<br>`;
      if (descuento > 0) {
        mensaje.innerHTML += `🎉 Descuento aplicado: $${descuento.toFixed(2)}<br>`;
      }
      mensaje.innerHTML += `💰 Total a pagar: $${totalFinal.toFixed(2)}`;
      setTimeout(() => {
        mensaje.innerHTML += `<br>🎉 ¡Gracias por tu compra! 🛍️`;
      }, 2000);
  
      carrito = [];
      mostrarCarrito();
    }, 5000);
  }
  
  // 9. Iniciar app
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("procesar-compra").addEventListener("click", procesarCompra);
    mostrarProductos();
  });
  
  // 10. Validación del registro
  const formRegistro = document.getElementById('form-registro');
  const regNombre = document.getElementById('reg-nombre');
  const regCorreo = document.getElementById('reg-correo');
  const regPassword = document.getElementById('reg-password');
  const regConfirm = document.getElementById('reg-confirm');
  
  const errorNombre = document.getElementById('error-nombre');
  const errorCorreo = document.getElementById('error-correo');
  const errorPassword = document.getElementById('error-password');
  const errorConfirm = document.getElementById('error-confirm');
  const exitoRegistro = document.getElementById('registro-exito');
  
  formRegistro.addEventListener('submit', function (e) {
    e.preventDefault();
  
    errorNombre.textContent = '';
    errorCorreo.textContent = '';
    errorPassword.textContent = '';
    errorConfirm.textContent = '';
    exitoRegistro.textContent = '';
  
    let valido = true;
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!regNombre.value.trim()) {
      errorNombre.textContent = '❌ El nombre es obligatorio.';
      valido = false;
    }
  
    if (!regexCorreo.test(regCorreo.value.trim())) {
      errorCorreo.textContent = '❌ El correo no es válido.';
      valido = false;
    }
  
    if (regPassword.value.length < 8) {
      errorPassword.textContent = '❌ La contraseña debe tener al menos 8 caracteres.';
      valido = false;
    }
  
    if (regPassword.value !== regConfirm.value) {
      errorConfirm.textContent = '❌ Las contraseñas no coinciden.';
      valido = false;
    }
  
    if (valido) {
      exitoRegistro.textContent = `✅ Registro exitoso. ¡Bienvenido, ${regNombre.value.trim()}!`;
      formRegistro.reset();
    }
  });
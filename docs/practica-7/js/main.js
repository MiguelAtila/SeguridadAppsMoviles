// 1. Arreglo de productos en la tienda
let productos = [
  { nombre: "Camiseta", precio: 15, stock: 10 },
  { nombre: "Pantalón", precio: 20, stock: 17 },
  { nombre: "Zapatos", precio: 50, stock: 5 },
  { nombre: "Vestido", precio: 25, stock: 8 },
  { nombre: "Sudadera", precio: 30, stock: 20 },
];

// 2. Carrito de compras
let carrito = [];

// 3. Función para agregar productos al carrito
function agregarAlCarrito(productoNombre, cantidad) {
  if (cantidad <= 0) {
    console.log("❌ La cantidad debe ser mayor a 0.");
    return;
  }

  let productoEncontrado = false;

  for (let i = 0; i < productos.length; i++) {
    if (productos[i].nombre === productoNombre) {
      productoEncontrado = true;

      if (productos[i].stock >= cantidad) {
        // Agregar el producto al carrito
        carrito.push({
          nombre: productos[i].nombre,
          cantidad: cantidad,
          precio: productos[i].precio,
          total: productos[i].precio * cantidad,
        });

        // Reducir el stock disponible
        productos[i].stock -= cantidad;

        console.log(`✔ ${cantidad} ${productos[i].nombre}(s) agregados al carrito`);
      } else {
        console.log(`❌ No hay suficiente stock de "${productos[i].nombre}". Stock disponible: ${productos[i].stock}`);
      }
      return;
    }
  }

  if (!productoEncontrado) {
    console.log(`❌ El producto "${productoNombre}" no existe en nuestro catálogo`);
  }
}

// 4. Función para eliminar productos del carrito
function eliminarDelCarrito(productoNombre, cantidad) {
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].nombre === productoNombre) {
      if (carrito[i].cantidad >= cantidad) {
        carrito[i].cantidad -= cantidad;
        carrito[i].total -= carrito[i].precio * cantidad;

        // Reintegrar stock al inventario
        for (let j = 0; j < productos.length; j++) {
          if (productos[j].nombre === productoNombre) {
            productos[j].stock += cantidad;
            break;
          }
        }

        if (carrito[i].cantidad === 0) {
          carrito.splice(i, 1);
        }

        console.log(`🗑️ Se eliminaron ${cantidad} ${productoNombre}(s) del carrito.`);
        return;
      } else {
        console.log(`❌ No tienes ${cantidad} ${productoNombre}(s) en el carrito.`);
        return;
      }
    }
  }
  console.log(`❌ El producto "${productoNombre}" no está en el carrito.`);
}

// 5. Función para calcular el total del carrito
function calcularTotalCarrito() {
  let total = 0;
  for (let i = 0; i < carrito.length; i++) {
    total += carrito[i].total;
  }
  console.log(`🛒 Total actual del carrito: $${total.toFixed(2)}`);
}

// 6. Función para aplicar descuentos
function aplicarDescuento(total) {
  if (total > 100) {
    console.log("🎉 ¡Descuento aplicado del 10% por compras mayores a $100!");
    return total * 0.9; // Aplica 10% de descuento
  }
  return total;
}

// 7. Función para mostrar cuenta regresiva antes de confirmar la compra
function mostrarTiempoRestante(segundos, callback) {
  let tiempo = segundos;

  let intervalo = setInterval(() => {
    console.log(`⏳ Compra confirmada en ${tiempo}...`);
    tiempo--;

    if (tiempo < 0) {
      clearInterval(intervalo);
      callback();
    }
  }, 1000);
}

// 8. Función para procesar la compra con cuenta regresiva
function procesarCompra() {
  console.log("⏳ Procesando compra...");
  mostrarTiempoRestante(3, () => {
    let totalCarrito = 0;
    for (let i = 0; i < carrito.length; i++) {
      totalCarrito += carrito[i].total;
    }

    let totalConDescuento = aplicarDescuento(totalCarrito);

    console.log(`💰 Total a pagar: $${totalConDescuento.toFixed(2)}`);
    console.log("✅ Compra realizada con éxito. ¡Gracias por tu compra!");
  });
}
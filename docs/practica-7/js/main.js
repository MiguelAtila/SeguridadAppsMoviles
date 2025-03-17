// 1. Arreglo de productos en la tienda
let productos = [
  { nombre: "Camiseta", precio: 15, stock: 10 },
  { nombre: "Pantalón", precio: 20, stock: 17 },
  { nombre: "Zapatos", precio: 50, stock: 5 },
  { nombre: "Vestido", precio: 25, stock: 8 },
  { nombre: "Sudadera", precio: 30, stock: 20 },
];

//  Carrito de compras
let carrito = [];

// 2. Función para agregar productos al carrito
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

// 3. Función para calcular el total del carrito (ahora imprime el total en la consola)
function calcularTotalCarrito() {
  let total = 0;
  for (let i = 0; i < carrito.length; i++) {
    total += carrito[i].total;
  }
  console.log(`🛒 Total actual del carrito: $${total.toFixed(2)}`);
}

// 4. Función para aplicar descuentos
function aplicarDescuento(total) {
  if (total > 100) {
    console.log("🎉 ¡Descuento aplicado del 10% por compras mayores a $100!");
    return total * 0.9; // Aplica 10% de descuento
  }
  return total;
}

// 5. Simular el proceso de compra con `setTimeout`
function procesarCompra() {
  console.log("⏳ Procesando compra...");

  setTimeout(() => {
    let totalCarrito = 0;
    for (let i = 0; i < carrito.length; i++) {
      totalCarrito += carrito[i].total;
    }

    let totalConDescuento = aplicarDescuento(totalCarrito);

    console.log(`💰 Total a pagar: $${totalConDescuento.toFixed(2)}`);
    console.log("✅ Compra realizada con éxito. ¡Gracias por tu compra!");
  }, 3000);
}
// 1. Crear un Arreglo de Productos:
let productos = [
    { nombre: "Camiseta", precio: 15, stock: 10 },
    { nombre: "Pantalón", precio: 20, stock: 17 },
    { nombre: "Zapatos", precio: 50, stock: 5 },
    { nombre: "Vestido", precio: 25, stock: 8 },
    { nombre: "Sudadera", precio: 30, stock: 20 },
  ];
  
  // 2. Arreglo para el carrito de compras
  let carrito = [];
  
  function agregarAlCarrito(productoNombre, cantidad) {
    // Validar que la cantidad ingresada sea válida
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
            total: productos[i].precio * cantidad
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
  
    // Si no se encontró el producto
    if (!productoEncontrado) {
      console.log(`❌ El producto "${productoNombre}" no existe en nuestro catálogo`);
    }
  }
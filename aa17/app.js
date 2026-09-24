// 1. Elementos del DOM con querySelector
const contenedor = document.querySelector('#productos');
const inputBusqueda = document.querySelector('#busqueda');
const selectCategoria = document.querySelector('#categoria');

// Acá guardamos los productos que vienen del JSON
let productos = [];

// 2. Función async: carga el JSON en segundo plano con fetch
async function obtenerProductos() {
  try {
    const respuesta = await fetch('productos.json');
    if (!respuesta.ok) throw new Error('No se pudo cargar productos.json');

    productos = await respuesta.json();
    mostrarProductos(productos);
  } catch (error) {
    contenedor.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

// 3. Genera una tarjeta por producto
function mostrarProductos(lista) {
  if (lista.length === 0) {
    contenedor.innerHTML = '<p>No se encontraron productos.</p>';
    return;
  }

  const htmlGenerado = lista.map(item => `
    <article class="tarjeta">
      <h3>${item.titulo}</h3>
      <p>Categoría: <strong>${item.categoria}</strong></p>
      <p class="precio">$${item.precio}</p>
      <button>Agregar al carrito</button>
    </article>
  `).join('');

  contenedor.innerHTML = htmlGenerado;
}

// 4. Filtra por texto y por categoría
function aplicarFiltros() {
  const texto = inputBusqueda.value.trim().toLowerCase();
  const categoria = selectCategoria.value;

  const filtrados = productos.filter(item => {
    const coincideTexto = item.titulo.toLowerCase().includes(texto);
    const coincideCategoria = categoria === 'todas' || item.categoria === categoria;
    return coincideTexto && coincideCategoria;
  });

  mostrarProductos(filtrados);
}

// 5. Eventos con addEventListener
window.addEventListener('load', obtenerProductos);
inputBusqueda.addEventListener('input', aplicarFiltros);
selectCategoria.addEventListener('change', aplicarFiltros);

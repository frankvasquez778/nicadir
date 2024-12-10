// Variables para la paginación
const itemsPerPage = 10; // Número de productos por página
let currentPage = 1;

// Renderizar los productos en la página actual
function renderProducts(filteredProducts = products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    // Calcular los índices de los productos que se mostrarán
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);

    // Renderizar los productos en la página actual
    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'w3-col s12 m6 l4';
        productCard.innerHTML = `
            <div class="product-card" onclick="showProductDetails('${product.id}')">
                <img src="${product.image}" alt="${product.name}" class="w3-img">
                <div class="product-content">
                    <h3>${product.name}</h3>
                    <p>${product.price}</p>
                    <p><strong>Tallas disponibles:</strong> ${product.sizes.join(', ')}</p>
                    <i class="${product.icon} product-icon"></i>
                </div>
            </div>
        `;
        productList.appendChild(productCard);
    });

    // Renderizar la paginación
    renderPagination(filteredProducts);
}

// Mostrar detalles del producto
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        // Actualiza el historial del navegador
        history.pushState({ productId }, '', `#${productId}`);

        // Oculta la vista principal y muestra los detalles
        document.getElementById('main-content').classList.add('w3-hide');
        document.getElementById('product-details').classList.remove('w3-hide');

        // Generar enlace de WhatsApp
        const whatsappMessage = `Hola, estoy interesado en este producto: ${product.name} (${product.price}). Aquí está el enlace: ${window.location.href}`;
        const whatsappLink = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;

        // Mostrar detalles del producto
        document.getElementById('details-content').innerHTML = `
            <div class="w3-center">
                <img src="${product.image}" alt="${product.name}" class="w3-img" style="max-width:300px; border-radius:8px;">
                <h2>${product.name} <i class="${product.icon}"></i></h2>
                <p><strong>${product.price}</strong></p>
                <p>${product.description}</p>
                <p><strong>Tallas disponibles:</strong> ${product.sizes.join(', ')}</p>
                <div class="w3-center">
                    <a href="${whatsappLink}" target="_blank" class="w3-button w3-green w3-margin-top">
                        <i class="fab fa-whatsapp"></i> Compartir en WhatsApp
                    </a>
                </div>
            </div>
        `;
    }
}

// Manejar el botón atrás del navegador
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.productId) {
        showProductDetails(event.state.productId);
    } else {
        goBack(true);
    }
});

// Renderizar la paginación
function renderPagination(filteredProducts = products) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.innerText = i;
        button.disabled = i === currentPage; // Deshabilitar el botón de la página actual
        button.className = 'w3-button w3-light-grey w3-margin-right';
        button.onclick = () => {
            currentPage = i;
            renderProducts(filteredProducts.slice((i - 1) * itemsPerPage, i * itemsPerPage));
        };
        pagination.appendChild(button);
    }
}

// Filtrar productos por categoría
function filterProducts(category) {
    const filteredProducts = category === 'All' ? products : products.filter(product => product.category === category);
    currentPage = 1; // Reiniciar a la primera página
    renderProducts(filteredProducts);
}

// Regresar a la vista principal
function goBack(fromHistory = false) {
    if (!fromHistory) {
        history.pushState(null, '', '/');
    }
    document.getElementById('main-content').classList.remove('w3-hide');
    document.getElementById('product-details').classList.add('w3-hide');
}

// Inicializar el renderizado
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();

    const hash = window.location.hash.substring(1);
    if (hash) {
        const product = products.find(p => p.id === hash);
        if (product) {
            showProductDetails(hash);
        }
    }
});

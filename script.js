// Variables para la paginación
const itemsPerPage = 5; // Número de productos por página
let currentPage = 1;

// Renderizar los productos en la página actual
function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    // Calcular los índices de los productos que se mostrarán
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const productsToShow = products.slice(startIndex, endIndex);

    // Renderizar los productos en la página actual
    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'w3-col s12 m6 l4';
        productCard.innerHTML = `
            <div class="product-card" onclick="showProductDetails('${product.id}')">
                <img src="${product.image}" alt="${product.name}" class="w3-img">
                <div class="product-content">
                    <h3>${product.name}</h3>
                    <h4 class="w3-text-red">${product.price}</h4>
                    <i class="${product.icon} product-icon"></i>
                </div>
            </div>
        `;
        productList.appendChild(productCard);
    });

    // Renderizar la paginación
    renderPagination();
}

// Mostrar detalles del producto
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        history.pushState({ productId }, '', `#${productId}`);

        document.getElementById('main-content').classList.add('w3-hide');
        document.getElementById('product-details').classList.remove('w3-hide');
        document.getElementById('details-content').innerHTML = `
            <div class="w3-center">
                <img src="${product.image}" alt="${product.name}" class="w3-img" style="max-width:300px; border-radius:8px;">
                <h2>${product.name} <i class="${product.icon}"></i></h2>
                <p><strong>${product.price}</strong></p>
                <p>${product.description}</p>
            </div>
            <div class="w3-center">
                <button class="w3-button w3-light-grey w3-margin-top" onclick="goBack()">Atrás</button>
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
function renderPagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    const totalPages = Math.ceil(products.length / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.innerText = i;
        button.disabled = i === currentPage; // Deshabilitar el botón de la página actual
        button.className = 'w3-button w3-light-grey w3-margin-right';
        button.onclick = () => {
            currentPage = i;
            renderProducts();
        };
        pagination.appendChild(button);
    }
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

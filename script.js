// Define products dynamically with local image paths
const products = Array.from({ length: 50 }, (_, index) => ({
    id: `product${index + 1}`,
    name: `Producto ${index + 1}`,
    price: `Desde $${(10 + index).toFixed(2)}`,
    description: `Descripción del Producto ${index + 1}: ideal para personalización y regalos únicos.`,
    image: `images/product${index + 1}.png`, // Local image path
    icon: "fas fa-box" // Generic icon
}));

// Pagination variables
const itemsPerPage = 10;
let currentPage = 1;

// Dynamically render product cards for the current page
function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear current products
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const productsToShow = products.slice(startIndex, endIndex);

    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'w3-col s12 m6 l4';
        productCard.innerHTML = `
            <div class="product-card" onclick="showProductDetails('${product.id}')">
                <img src="${product.image}" alt="${product.name}" class="w3-img">
                <div class="product-content">
                    <h3>${product.name}</h3>
                    <p>${product.price}</p>
                    <i class="${product.icon} product-icon"></i> <!-- Icon with scaling -->
                </div>
            </div>
        `;
        productList.appendChild(productCard);
    });

    renderPagination();
}

// Render pagination buttons
function renderPagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = ''; // Clear current pagination buttons
    const totalPages = Math.ceil(products.length / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.innerText = i;
        button.disabled = i === currentPage;
        button.onclick = () => {
            currentPage = i;
            renderProducts();
        };
        pagination.appendChild(button);
    }
}

// Show product details
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        document.getElementById('main-content').classList.add('w3-hide');
        document.getElementById('product-details').classList.remove('w3-hide');
        document.getElementById('details-content').innerHTML = `
            <div class="w3-center">
                <img src="${product.image}" alt="${product.name}" class="w3-img" style="max-width:300px; border-radius:8px;">
                <h2>${product.name} <i class="${product.icon}"></i></h2>
                <p><strong>${product.price}</strong></p>
                <p>${product.description}</p>
            </div>
        `;
    }
}

// Go back to product list
function goBack() {
    document.getElementById('main-content').classList.remove('w3-hide');
    document.getElementById('product-details').classList.add('w3-hide');
}

// Initialize product rendering on page load
document.addEventListener('DOMContentLoaded', renderProducts);

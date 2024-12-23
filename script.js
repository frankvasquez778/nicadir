// scripts.js

// Simulated product data (could be fetched from an API or database)
const products = [
    { id: 1, name: "Camiseta de la Virgen María", price: "$29.99", image: "camiseta_virgen_maria.png", link: "product1.html" },
    { id: 2, name: "Sonic Navidad", price: "$39.99", image: "camiseta_sonic_navidad.png", link: "product2.html" },
    { id: 3, name: "Stitch Navidad 01", price: "$49.99", image: "camiseta_stitch_navidad.png", link: "product3.html" },
    { id: 4, name: "Product 4", price: "$59.99", image: "product4.jpg", link: "product4.html" },
    { id: 5, name: "Product 5", price: "$69.99", image: "product5.jpg", link: "product5.html" },
    { id: 6, name: "Product 6", price: "$79.99", image: "product6.jpg", link: "product6.html" },
];

const itemsPerPage = 3;
let currentPage = 1;

function renderProducts(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const productGrid = document.querySelector(".product-grid");
    productGrid.innerHTML = "";

    products.slice(startIndex, endIndex).forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
            <a href="${product.link}" class="btn-primary">View Product</a>
        `;
        productGrid.appendChild(productCard);
    });

    updatePaginationControls();
}

function updatePaginationControls() {
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const pagination = document.querySelector(".pagination");
    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement("a");
        pageLink.href = "#";
        pageLink.textContent = i;
        pageLink.classList.add("pagination-link");
        if (i === currentPage) pageLink.classList.add("active");

        pageLink.addEventListener("click", (e) => {
            e.preventDefault();
            currentPage = i;
            renderProducts(currentPage);
        });

        pagination.appendChild(pageLink);
    }
}

// Initialize the product grid on page load
window.addEventListener("DOMContentLoaded", () => {
    renderProducts(currentPage);
});

// scripts/camisas.js
import { fetchCamisas, createCamisa, deleteCamisa } from './camisasService.js';

// Mostrar las camisas en la tabla con paginación y orden
export async function displayCamisas(page = 1, itemsPerPage = 15) {
    const tableBody = document.querySelector('#camisasTable tbody');
    const paginationContainer = document.querySelector('#pagination');

    if (!tableBody || !paginationContainer) {
        console.error('El contenedor de la tabla o la paginación no existe.');
        return;
    }

    tableBody.innerHTML = ""; // Limpiar la tabla antes de llenarla
    paginationContainer.innerHTML = ""; // Limpiar la paginación

    try {
        const camisas = await fetchCamisas();

        // Ordenar camisas por talla (numérica y luego alfabética)
        camisas.sort((a, b) => {
            const tallaA = a.get("talla");
            const tallaB = b.get("talla");

            const isNumericA = !isNaN(tallaA);
            const isNumericB = !isNaN(tallaB);

            if (isNumericA && isNumericB) {
                return parseInt(tallaA) - parseInt(tallaB);
            } else if (isNumericA) {
                return -1;
            } else if (isNumericB) {
                return 1;
            } else {
                return tallaA.localeCompare(tallaB);
            }
        });

        // Paginación
        const totalPages = Math.ceil(camisas.length / itemsPerPage);
        const startIndex = (page - 1) * itemsPerPage;
        const paginatedCamisas = camisas.slice(startIndex, startIndex + itemsPerPage);

        // Llenar la tabla con las camisas paginadas
        paginatedCamisas.forEach(camisa => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${camisa.get("tipo")}</td>
                <td>${camisa.get("talla")}</td>
                <td>${camisa.get("color")}</td>
                <td>${camisa.get("material")}</td>
                <td>$${camisa.get("precio").toFixed(2)}</td>
                <td>
                    <button class="delete-btn text-red-500" data-id="${camisa.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Asignar eventos a los botones de eliminación
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', async event => {
                const objectId = event.target.closest('button').getAttribute('data-id');
                await deleteCamisa(objectId);
                displayCamisas(page, itemsPerPage); // Refrescar la tabla
                displayResumen(); // Refrescar el resumen
            });
        });

        // Crear botones de paginación
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.className = `px-3 py-1 mx-1 rounded ${i === page ? 'bg-blue-500 text-white' : 'bg-gray-200'}`;
            pageButton.addEventListener('click', () => {
                displayCamisas(i, itemsPerPage);
            });
            paginationContainer.appendChild(pageButton);
        }
    } catch (error) {
        console.error('Error al mostrar camisas:', error);
    }
}

// Mostrar resumen de camisas
export async function displayResumen() {
    const resumenTableBody = document.querySelector('#resumenTable tbody');

    if (!resumenTableBody) {
        console.error('El contenedor de resumen no existe.');
        return;
    }

    resumenTableBody.innerHTML = ""; // Limpiar el contenido del resumen

    try {
        const camisas = await fetchCamisas();

        // Agrupar por Tipo, Talla, Color y Material
        const resumenMap = new Map();

        camisas.forEach(camisa => {
            const key = `${camisa.get("tipo")}-${camisa.get("talla")}-${camisa.get("color")}-${camisa.get("material")}`;
            if (!resumenMap.has(key)) {
                resumenMap.set(key, {
                    tipo: camisa.get("tipo"),
                    talla: camisa.get("talla"),
                    color: camisa.get("color"),
                    material: camisa.get("material"),
                    cantidad: 0
                });
            }
            resumenMap.get(key).cantidad += 1;
        });

        // Llenar la tabla de resumen
        resumenMap.forEach(resumen => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${resumen.tipo}</td>
                <td>${resumen.talla}</td>
                <td>${resumen.color}</td>
                <td>${resumen.material}</td>
                <td>${resumen.cantidad}</td>
            `;
            resumenTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error al mostrar el resumen:', error);
    }
}

// Manejar el formulario para agregar camisas
export async function handleCamisaForm(event) {
    event.preventDefault();

    const tipo = document.getElementById('camisaTipo').value;
    const talla = document.getElementById('camisaTalla').value;
    const color = document.getElementById('camisaColor').value;
    const material = document.getElementById('camisaMaterial').value;
    const precio = parseFloat(document.getElementById('camisaPrecio').value);

    if (isNaN(precio)) {
        alert('Por favor, ingresa un precio válido.');
        return;
    }

    try {
        await createCamisa(tipo, talla, color, material, precio);
        document.getElementById('camisaModal').classList.add('hidden'); // Cerrar el modal
        displayCamisas(); // Refrescar la tabla
        displayResumen(); // Actualizar el resumen
    } catch (error) {
        console.error('Error al manejar el formulario de camisas:', error);
    }
}

// Inicialización
window.addEventListener('DOMContentLoaded', () => {
    displayCamisas();
    displayResumen();

    document.getElementById('camisaForm').addEventListener('submit', handleCamisaForm);
});

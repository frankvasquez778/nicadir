// scripts/camisas.js
import { fetchCamisas, createCamisa, deleteCamisa } from './camisasService.js';

// Mostrar las camisas en la tabla
export async function displayCamisas() {
    const tableBody = document.querySelector('#camisasTable tbody');

    if (!tableBody) {
        console.error('El contenedor de la tabla no existe.');
        return;
    }

    tableBody.innerHTML = ""; // Limpiar la tabla antes de llenarla

    try {
        const camisas = await fetchCamisas();
        console.log('Camisas obtenidas:', camisas);

        camisas.forEach(camisa => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${camisa.get("tipo")}</td>
                <td>${camisa.get("talla")}</td>
                <td>${camisa.get("color")}</td>
                <td>${camisa.get("material")}</td>
                <td>$${camisa.get("precio")}</td>
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
                displayCamisas(); // Refrescar la tabla
            });
        });
    } catch (error) {
        console.error('Error al mostrar camisas:', error);
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
    } catch (error) {
        console.error('Error al manejar el formulario de camisas:', error);
    }
}

// Inicialización
window.addEventListener('DOMContentLoaded', () => {
    displayCamisas();

    document.getElementById('camisaForm').addEventListener('submit', handleCamisaForm);
});

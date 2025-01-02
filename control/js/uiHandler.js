// scripts/uiHandler.js
import { fetchTransactions, createTransaction, deleteTransaction, calculateBalance } from './transactionService.js';

// Mostrar transacciones en la interfaz con filtro y paginación
export async function displayTransactions(tableId = "incomesTable", filterType = null, page = 1, itemsPerPage = 10) {
    const tableBody = document.querySelector(`#${tableId} tbody`);
    const paginationContainer = document.querySelector(`#${tableId}Pagination`);

    if (!tableBody || !paginationContainer) {
        console.error(`El contenedor de la tabla o la paginación con ID ${tableId} no existe o no está disponible.`);
        return;
    }

    tableBody.innerHTML = ""; // Limpiar la tabla antes de llenarla
    paginationContainer.innerHTML = ""; // Limpiar la paginación

    try {
        const transactions = await fetchTransactions(); // Obtener todas las transacciones
        console.log("Transacciones obtenidas:", transactions);

        // Filtrar por tipo si es necesario
        const filteredTransactions = filterType
            ? transactions.filter(transaction => transaction.get("type") === filterType)
            : transactions;

        const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
        const startIndex = (page - 1) * itemsPerPage;
        const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

        paginatedTransactions.forEach(transaction => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${transaction.get("amount")}</td>
                <td>${transaction.get("category")}</td>
                <td>${transaction.get("description") || ""}</td>
                <td>${new Date(transaction.get("date")).toLocaleString()}</td>
                <td>
                    <button class="delete-btn text-red-500" data-id="${transaction.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Asignar eventos a los botones de eliminación
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", async event => {
                const objectId = event.target.closest("button").getAttribute("data-id");
                await deleteTransaction(objectId);
                displayTransactions(tableId, filterType, page, itemsPerPage); // Refrescar la tabla
                displayBalance(); // Actualizar el balance
            });
        });

        // Crear botones de paginación
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement("button");
            pageButton.textContent = i;
            pageButton.className = `px-2 py-1 mx-1 rounded ${i === page ? "bg-blue-500 text-white" : "bg-gray-200"}`;
            pageButton.addEventListener("click", () => {
                displayTransactions(tableId, filterType, i, itemsPerPage);
            });
            paginationContainer.appendChild(pageButton);
        }
    } catch (error) {
        console.error("Error al mostrar transacciones:", error);
    }
}

// Manejar el formulario para agregar transacciones
export async function handleTransactionForm(event) {
    event.preventDefault();

    const type = document.getElementById("type").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const category = document.getElementById("category").value;
    const date = new Date();
    const description = document.getElementById("description")?.value || "";

    try {
        await createTransaction(type, amount, category, date, description);
        document.getElementById("transactionForm").classList.add("hidden"); // Cerrar el formulario
        displayTransactions(type === "Ingreso" ? "incomesTable" : "expensesTable", type); // Refrescar la tabla
        displayBalance(); // Actualizar el balance
    } catch (error) {
        console.error("Error al manejar el formulario de transacciones:", error);
    }
}

// Mostrar el balance en la interfaz
export async function displayBalance() {
    const balanceSection = document.getElementById("balanceSection");

    try {
        const { balance, totalIncome, totalExpense } = await calculateBalance();

        const balanceValueElement = balanceSection.querySelector(".balance-value");
        balanceValueElement.textContent = `$${balance.toFixed(2)}`;
        balanceValueElement.classList.remove("text-green-600", "text-red-600");
        balanceValueElement.classList.add(balance >= 0 ? "text-green-600" : "text-red-600");

        balanceSection.querySelector(".income-total").textContent = `+$${totalIncome.toFixed(2)}`;
        balanceSection.querySelector(".expense-total").textContent = `-$${totalExpense.toFixed(2)}`;
    } catch (error) {
        console.error("Error al mostrar el balance:", error);
    }
}

// Mostrar y ocultar secciones
export function toggleSection(sectionId) {
    const sections = ["balanceSection", "incomesSection", "expensesSection"];
    sections.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            section.classList.toggle("hidden", id !== sectionId);
        }
    });
}

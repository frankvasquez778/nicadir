// scripts/main.js
import { displayTransactions, handleTransactionForm, toggleSection, displayBalance } from './uiHandler.js';

window.addEventListener("DOMContentLoaded", () => {
    // Mostrar el balance al cargar la página
    displayBalance();

    // Asignar eventos a los botones de navegación
    document.getElementById("viewBalance").addEventListener("click", () => {
        toggleSection("balanceSection");
        displayBalance();
    });

    document.getElementById("viewIncomes").addEventListener("click", () => {
        toggleSection("incomesSection");
        displayTransactions("incomesTable", "Ingreso"); // Mostrar solo ingresos
    });

    document.getElementById("viewExpenses").addEventListener("click", () => {
        toggleSection("expensesSection");
        displayTransactions("expensesTable", "Gasto"); // Mostrar solo gastos
    });

    document.getElementById("manageCategories").addEventListener("click", () => {
        toggleSection("categoriesSection");
    });

    // Manejo del formulario de transacciones
    document.getElementById("transactionForm").addEventListener("submit", async (event) => {
        await handleTransactionForm(event);
        displayBalance(); // Actualizar el balance después de agregar una transacción
    });

    // Mostrar y ocultar el formulario emergente
    document.getElementById("addTransactionBtn").addEventListener("click", () => {
        document.getElementById("transactionForm").classList.remove("hidden");
    });

    document.getElementById("closeFormBtn").addEventListener("click", () => {
        document.getElementById("transactionForm").classList.add("hidden");
    });
});
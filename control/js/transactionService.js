// scripts/transactionService.js
import Parse from './parseConfig.js';

// Crear una nueva transacción
export async function createTransaction(type, amount, category, date, description) {
    const Transaction = Parse.Object.extend("Transaction");
    const transaction = new Transaction();

    transaction.set("type", type);
    transaction.set("amount", amount);
    transaction.set("category", category);
    transaction.set("date", date);
    if (description) transaction.set("description", description);

    try {
        const result = await transaction.save();
        console.log("Transacción creada en la nube:", result);
        return result;
    } catch (error) {
        console.error("Error al crear transacción:", error);
        throw error;
    }
}

// Obtener todas las transacciones
export async function fetchTransactions() {
    const Transaction = Parse.Object.extend("Transaction");
    const query = new Parse.Query(Transaction);

    try {
        const results = await query.find();
        console.log("Transacciones obtenidas:", results);
        return results;
    } catch (error) {
        console.error("Error al obtener transacciones:", error);
        throw error;
    }
}

// Eliminar una transacción
export async function deleteTransaction(objectId) {
    const Transaction = Parse.Object.extend("Transaction");
    const query = new Parse.Query(Transaction);

    try {
        const transaction = await query.get(objectId);
        await transaction.destroy();
        console.log("Transacción eliminada:", objectId);
    } catch (error) {
        console.error("Error al eliminar transacción:", error);
        throw error;
    }
}

// Calcular el balance
export async function calculateBalance() {
    const Transaction = Parse.Object.extend("Transaction");
    const query = new Parse.Query(Transaction);

    try {
        const transactions = await query.find();
        let totalIncome = 0;
        let totalExpense = 0;

        transactions.forEach(transaction => {
            const type = transaction.get("type");
            const amount = transaction.get("amount");

            if (type === "Ingreso") {
                totalIncome += amount;
            } else if (type === "Gasto") {
                totalExpense += amount;
            }
        });

        const balance = totalIncome - totalExpense;
        return { balance, totalIncome, totalExpense };
    } catch (error) {
        console.error("Error al calcular el balance:", error);
        throw error;
    }
}

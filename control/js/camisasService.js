// scripts/camisasService.js
import Parse from './parseConfig.js';

// Crear una nueva camisa
export async function createCamisa(tipo, talla, color, material, precio) {
    const Camisa = Parse.Object.extend("Camisa");
    const camisa = new Camisa();

    camisa.set("tipo", tipo);
    camisa.set("talla", talla);
    camisa.set("color", color);
    camisa.set("material", material);
    camisa.set("precio", precio); // Asegurarse de que precio es un número

    try {
        const result = await camisa.save();
        console.log("Camisa creada en el inventario:", result);
        return result;
    } catch (error) {
        console.error("Error al crear camisa en el inventario:", error);
        throw error;
    }
}

// Obtener todas las camisas
export async function fetchCamisas() {
    const Camisa = Parse.Object.extend("Camisa");
    const query = new Parse.Query(Camisa);

    try {
        const results = await query.find();
        console.log("Camisas obtenidas del inventario:", results);
        return results;
    } catch (error) {
        console.error("Error al obtener camisas del inventario:", error);
        throw error;
    }
}

// Eliminar una camisa
export async function deleteCamisa(objectId) {
    const Camisa = Parse.Object.extend("Camisa");
    const query = new Parse.Query(Camisa);

    try {
        const camisa = await query.get(objectId);
        await camisa.destroy();
        console.log("Camisa eliminada del inventario:", objectId);
    } catch (error) {
        console.error("Error al eliminar camisa del inventario:", error);
        throw error;
    }
}

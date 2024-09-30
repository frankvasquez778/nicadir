// js/registro.js

async function guardarRegistro() {
    // Captura los valores del formulario
    const nombre = document.getElementById("nombre").value;
    const origen = document.getElementById("origen").value;
    const destino = document.getElementById("destino").value;
    const telefono = document.getElementById("telefono").value;
    const descripcion = document.getElementById("descripcion").value;

    // Crear una instancia de la clase B4aVehicle
    const B4aVehicle = Parse.Object.extend("B4aVehicle");
    const nuevoRegistro = new B4aVehicle();

    // Asigna los valores a los campos del nuevo registro
    nuevoRegistro.set("nombre", nombre);
    nuevoRegistro.set("origen", origen);
    nuevoRegistro.set("destino", destino);
    nuevoRegistro.set("telefono", telefono);
    nuevoRegistro.set("descripcion", descripcion);

    try {
        // Guarda el nuevo registro en la base de datos
        await nuevoRegistro.save();
        alert("Transporte registrado exitosamente.");
        // Opcional: Redirigir a otra página después de guardar
        // window.location.href = "home.html";
    } catch (error) {
        console.error("Error al guardar el registro:", error);
        alert("Hubo un error al registrar el transporte. Por favor, intenta nuevamente.");
    }
}

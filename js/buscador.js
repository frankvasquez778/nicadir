


Parse.initialize("qWRUPwIAHwxC6SlBujz7VNVk1GgHAzUr5pIVq9bw", "CzjbhomeSRolrQmalCYF7KsSCugHCyQrsr4jRVnf");
Parse.serverURL = "https://parseapi.back4app.com/";

// Función para buscar registros
async function buscarRegistros() {
    // Obtén los valores seleccionados en los selects
    const origen = document.getElementById("origenSelect").value;
    const destino = document.getElementById("destinoSelect").value;

    // Verifica si ambos campos tienen un valor
    if (!origen || !destino) {
        alert("Por favor, selecciona ambos, origen y destino.");
        return;
    }

    // Crear una instancia de la clase B4aVehicle
    const B4aVehicle = Parse.Object.extend("B4aVehicle");
    const query = new Parse.Query(B4aVehicle);

    // Filtra los resultados basados en los valores seleccionados
    query.equalTo("origen", origen);
    query.equalTo("destino", destino);

    try {
        const resultados = await query.find();
        const listaRegistrosHome = document.getElementById("listaRegistrosHome");
        listaRegistrosHome.innerHTML = ""; // Limpia la lista antes de agregar nuevos registros

        if (resultados.length === 0) {
            listaRegistrosHome.innerHTML = "<p>No se encontraron resultados.</p>";
        } else {
            resultados.forEach((registro) => {
                const nombre = registro.get("nombre");
                const ciudad = registro.get("ciudad");
                const telefono = registro.get("telefono");
                const categoria = registro.get("categoria");
                const descripcion = registro.get("descripcion");
                const entrada = registro.get("entrada");
                const salida = registro.get("salida");
                

                // Crear elemento <ons-card> para mostrar los datos del registro
                const card = document.createElement("ons-card");
                card.className = "result-card";

                // Crear el contenido del <ons-card>
                const contenidoCard = document.createElement("div");
                contenidoCard.className = "card-content";
                contenidoCard.innerHTML = `
                    <h2>${nombre}</h2>
                    <p>Ciudad: ${ciudad}</p>
                    <p>Teléfono: ${telefono}</p>
                    <p>Categoría: ${categoria}</p>
                    <p>Descripción: ${descripcion}</p>
                    <p>Entrada: ${entrada}</p>
                    <p>Salida: ${salida}</p>
                   
                `;

                // Agregar el contenido al <ons-card>
                card.appendChild(contenidoCard);

                // Agregar el <ons-card> a la lista en la página "home.html"
                listaRegistrosHome.appendChild(card);
            });
        }
    } catch (error) {
        console.error("Error al recuperar registros:", error);
        alert("Hubo un error al buscar los registros. Por favor, intenta nuevamente.");
    }
}

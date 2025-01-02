// scripts/auth.js
import Parse from './parseConfig.js';

// Manejar autenticación
const authForm = document.getElementById("authForm");
const authModal = document.getElementById("authModal");
const mainContent = document.getElementById("mainContent");
const logoutButton = document.getElementById("logoutButton");

async function handleAuth(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        // Intentar iniciar sesión
        await Parse.User.logIn(username, password);
        authModal.classList.add("hidden");
        mainContent.classList.remove("hidden");
        logoutButton.classList.remove("hidden");
        console.log("Usuario autenticado:", Parse.User.current().getUsername());
    } catch (error) {
        console.error("Error al autenticar al usuario:", error);
        alert("Error al iniciar sesión. Verifica tus credenciales.");
    }
}

// Verificar si el usuario ya está autenticado
if (Parse.User.current()) {
    authModal.classList.add("hidden");
    mainContent.classList.remove("hidden");
    logoutButton.classList.remove("hidden");
} else {
    authModal.classList.remove("hidden");
    mainContent.classList.add("hidden");
    logoutButton.classList.add("hidden");
}

// Manejar cierre de sesión
logoutButton.addEventListener("click", async () => {
    await Parse.User.logOut();
    authModal.classList.remove("hidden");
    mainContent.classList.add("hidden");
    logoutButton.classList.add("hidden");
    console.log("Sesión cerrada.");
});

// Asignar evento al formulario
authForm.addEventListener("submit", handleAuth);
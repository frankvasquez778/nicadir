// scripts/auth.js
Parse.initialize("YOUR_APP_ID", "YOUR_JS_KEY"); // Reemplaza con tus credenciales de Parse
Parse.serverURL = "https://parseapi.back4app.com/";

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
        // Si el usuario no existe, intentar registrarlo
        try {
            const user = new Parse.User();
            user.set("username", username);
            user.set("password", password);

            await user.signUp();
            authModal.classList.add("hidden");
            mainContent.classList.remove("hidden");
            logoutButton.classList.remove("hidden");
            console.log("Usuario registrado:", Parse.User.current().getUsername());
        } catch (signUpError) {
            console.error("Error al autenticar al usuario:", signUpError);
            alert("Error al iniciar sesión o registrarse. Verifica tus credenciales.");
        }
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

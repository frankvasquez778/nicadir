// Función para iniciar sesión
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    Parse.User.logIn(username, password).then(user => {
        // Inicio de sesión exitoso, verificar el rol del usuario
        const roleQuery = new Parse.Query(Parse.Role);
        roleQuery.equalTo('users', user);
        roleQuery.first().then(role => {
            if (role) {
                if (role.get('name') === 'Profesor') {
                    // Redirige a la página para profesores
                    window.location.href = 'profesor.html';
                } else if (role.get('name') === 'Estudiante') {
                    // Redirige a la página para estudiantes
                    window.location.href = 'estudiante.html';
                } else {
                    // Manejar caso donde el rol del usuario no es ni 'Profesor' ni 'Estudiante'
                    document.getElementById('error-msg').textContent = "Rol del usuario no encontrado.";
                }
            } else {
                // Manejar caso donde el usuario no tiene un rol asignado
                document.getElementById('error-msg').textContent = "Rol del usuario no encontrado.";
            }
        }).catch(error => {
            // Mostrar error si la consulta del rol falla
            document.getElementById('error-msg').textContent = "Error al obtener el rol del usuario.";
            console.error("Error al obtener el rol del usuario:", error);
        });

        return false; // Previene el envío del formulario para evitar recargar la página
    }).catch(error => {
        // Mostrar error si el inicio de sesión falla
        document.getElementById('error-msg').textContent = "Usuario o contraseña incorrectos.";
        console.error("Login failed:", error);
        return false; // Previene el envío del formulario para evitar recargar la página
    });
}

// Función para verificar la autenticación del usuario
function checkAuth() {
    // Verificar si el usuario está logueado
    if (!Parse.User.current()) {
        // Si no está autenticado, redirigir al login
        window.location.href = "login.html";
    } else {
        // Si está autenticado, verificar el rol del usuario
        const user = Parse.User.current();
        const roleQuery = new Parse.Query(Parse.Role);
        roleQuery.equalTo('users', user);
        roleQuery.first().then(role => {
            if (role) {
                if (role.get('name') === 'Profesor') {
                    // Redirige a la página para profesores si el usuario es un profesor
                    window.location.href = 'profesor.html';
                } else if (role.get('name') === 'Estudiante') {
                    // Redirige a la página para estudiantes si el usuario es un estudiante
                    window.location.href = 'estudiante.html';
                }
            } else {
                // Manejar caso donde el usuario no tiene un rol asignado
                document.getElementById('error-msg').textContent = "Rol del usuario no encontrado.";
            }
        }).catch(error => {
            // Mostrar error si la consulta del rol falla
            console.error("Error al obtener el rol del usuario:", error);
        });
    }
}

// Función para registrar un nuevo usuario
function register() {
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;

    const user = new Parse.User();
    user.set("username", username);
    user.set("password", password);

    user.signUp().then(user => {
        // Registro exitoso, redirigir al login
        window.location.href = "login.html";
    }).catch(error => {
        // Mostrar error si el registro falla
        document.getElementById('register-error-msg').textContent = "Error al registrar usuario.";
        console.error("Registration failed:", error);
    });
}

// Función para cerrar sesión
function logout() {
    Parse.User.logOut().then(() => {
        // Redirigir al login después de cerrar sesión
        window.location.href = "login.html";
    });
}

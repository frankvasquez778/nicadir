document.addEventListener('init', function(event) {
    var page = event.target;

    // Verificar si estamos en la página de registro
    if (page.id === 'registro') {
        verificarAutenticacion();
    }
});

function verificarAutenticacion() {
    // Verificar si el usuario está autenticado
    Parse.User.currentAsync().then(function(user) {
        if (!user) {
            // Si no está autenticado, redirigir a login.html
            loadPage('login.html');
        }
    }).catch(function(error) {
        console.error('Error al verificar el usuario:', error);
        loadPage('home.html'); // Redirigir a index.html en caso de error
    });
}

function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    Parse.User.logIn(username, password)
        .then(function(user) {
            if (user.get('emailVerified')) {
                // Si el correo está verificado, redirigir a registro.html
                loadPage('registro.html');
            } else {
                // Si no está verificado, cerrar sesión y mostrar mensaje
                Parse.User.logOut();
                ons.notification.alert('Por favor verifica tu correo antes de continuar.');
                loadPage('index.html');
            }
        })
        .catch(function(error) {
            console.error('Error al iniciar sesión:', error);
            ons.notification.alert('Error en el inicio de sesión. Verifica tus credenciales.');
            loadPage('index.html');
        });
}

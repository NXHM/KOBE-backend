// Valida el nombre de usuario y la contraseña
function validateUsername(req) {
    // test sirve para ver si el patron existe en la cadena de texto
    // Suggested code may be subject to a license. Learn more: ~LicenseLog:159666383.
    const username = req.body.username;
    // Validación de nombre de usuario
    if (username.length < 3 || username.length > 20) {
        return "Username must be between 3 and 20 characters.";
    }
    if (!/\s/.test(username)) {
        return "Username must not contain spaces.";
    }
    if (!/[^a-zA-Z0-9]/.test(username)) {
        return "Username must not contain special characters.";
    }
    return "Username is valid.";
}
function  validatePassword(req) {
    
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    // La contraseña es igual a la confirmación
    if (password !== confirmPassword) {
        return "Passwords do not match. Write the same password in both fields."
    }
    // Longitud de la contraseña
    if (password.length < 8 || password.length > 12) {
        return "Password must be between 8 and 12 characters.";
    }
    // Espacios - no se permiten
    if (/\s/.test(password)) {
        return "Password must not contain spaces.";
    }
    // Mayúsculas - minimo 1
    if (!/[A-Z]/.test(password)) {
        return "Password must contain at least one uppercase letter.";
    }
    // Minusculas - minimo 1
    if (!/[a-z]/.test(password)) {
        return "Password must contain at least one lowercase letter.";
    }
    // Números - minimo 1
    if (!/[0-9]/.test(password)) {
        return "Password must contain at least one number.";
    }
    // Caracteres especiales - minimo 1
    if (!/[!@#$%^&*]/.test(password)) {
        return "Password must contain at least one special character.";
    }
    return "Password is valid.";
}

// Ve si el email es uno existente
function validateEmail(email){
    // Validación de correo electrónico
    // (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    if (!/^[^\s@]+@(hotmail\.com|gmail\.com|yahoo\.com|outlook\.com)$/.test(email)) {
        return "Invalid email address.";
    }
    return "Email is valid.";
}


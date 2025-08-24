// Session management functions
function isLoggedIn() {
    return localStorage.getItem('currentSession') !== null;
}

function getCurrentUser() {
    const session = localStorage.getItem('currentSession');
    return session ? JSON.parse(session) : null;
}

function setCurrentUser(user) {
    localStorage.setItem('currentSession', JSON.stringify(user));
}

function logout() {
    localStorage.removeItem('currentSession');
}

// Authentication functions
function loginUser(email, password) {
    const user = getUserByEmail(email);
    
    if (user && user.password === password) {
        setCurrentUser(user);
        return true;
    }
    
    return false;
}

function registerUser(name, email, password) {
    const newUser = {
        name: name,
        email: email,
        password: password,
        joinDate: new Date().toISOString()
    };
    
    return addUser(newUser);
}

// auth.js - Additional functions needed

function getCurrentUser() {
    const session = localStorage.getItem('currentSession');
    return session ? JSON.parse(session) : null;
}

function isLoggedIn() {
    return localStorage.getItem('currentSession') !== null;
}

function getUserData(email) {
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    return userData[email] || null;
}

function saveUserData(email, data) {
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    userData[email] = data;
    localStorage.setItem('userData', JSON.stringify(userData));
    return true;
}
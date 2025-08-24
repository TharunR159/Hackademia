// Initialize users array in localStorage if it doesn't exist
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
}

// Initialize userData object in localStorage if it doesn't exist
if (!localStorage.getItem('userData')) {
    localStorage.setItem('userData', JSON.stringify({}));
}

// User management functions
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
    return true;
}

function getUserByEmail(email) {
    const users = getUsers();
    return users.find(user => user.email === email);
}

function addUser(user) {
    const users = getUsers();
    
    // Check if user already exists
    if (users.some(u => u.email === user.email)) {
        return false;
    }
    
    users.push(user);
    return saveUsers(users);
}

// User data management functions
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
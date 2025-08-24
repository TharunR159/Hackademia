// user.js - User Details Page Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (!isLoggedIn()) {
        window.location.href = 'index.html';
        return;
    }
    
    // Get current user information
    const currentUser = getCurrentUser();
    if (currentUser) {
        // Display user information
        document.getElementById('user-name').textContent = currentUser.name;
        document.getElementById('user-email').textContent = currentUser.email;
        
        // Set avatar initials
        const initials = currentUser.name.split(' ').map(word => word[0]).join('').toUpperCase();
        document.getElementById('user-avatar').textContent = initials;
        
        // Load user data if exists
        const userData = getUserData(currentUser.email);
        if (userData) {
            // Set gender if available
            if (userData.gender) {
                const genderRadio = document.querySelector(`input[name="gender"][value="${userData.gender}"]`);
                if (genderRadio) {
                    genderRadio.checked = true;
                }
            }
            
            // Set location information
            if (userData.homeLocation) {
                document.getElementById('home-location').value = userData.homeLocation;
            }
            
            if (userData.officeLocation) {
                document.getElementById('office-location').value = userData.officeLocation;
            }
            
            // Set office details
            if (userData.workSchedule) {
                document.getElementById('work-schedule').value = userData.workSchedule;
            }
            
            if (userData.workstation) {
                document.getElementById('workstation').value = userData.workstation;
            }
            
            // Set commuting preferences
            if (userData.commuteMethod) {
                document.getElementById('commute-method').value = userData.commuteMethod;
            }
            
            if (userData.commuteTime) {
                document.getElementById('commute-time').value = userData.commuteTime;
            }
            
            // Load other locations
            if (userData.otherLocations && userData.otherLocations.length > 0) {
                const otherLocationsList = document.getElementById('other-locations-list');
                userData.otherLocations.forEach(location => {
                    addLocationItem(location.name, location.address);
                });
            }
            
            // Show navigation button if user already has data
            document.getElementById('nav-to-main').style.display = 'block';
            document.getElementById('save-and-navigate').style.display = 'inline-block';
        }
    }
    
    // Add location functionality
    const addLocationBtn = document.getElementById('add-location-btn');
    addLocationBtn.addEventListener('click', function() {
        addLocationItem();
    });
    
    // Form submission
    const form = document.getElementById('userDetailsForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        saveUserDataAndNavigate(false);
    });
    
    // Save and navigate button
    document.getElementById('save-and-navigate').addEventListener('click', function() {
        saveUserDataAndNavigate(true);
    });
    
    // Cancel button
    document.getElementById('cancel-btn').addEventListener('click', function() {
        if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
            window.location.href = 'index.html';
        }
    });
    
    // Navigation button
    document.getElementById('nav-to-main').addEventListener('click', function() {
        window.location.href = 'main.html';
    });
});

// Function to add a new location item
function addLocationItem(name = '', address = '') {
    const otherLocationsList = document.getElementById('other-locations-list');
    const locationItem = document.createElement('div');
    locationItem.className = 'location-item';
    locationItem.innerHTML = `
        <div style="flex: 1;">
            <input type="text" placeholder="Enter location name" class="location-name" value="${name}">
            <input type="text" placeholder="Enter address" class="location-address" value="${address}" style="margin-top: 8px;">
        </div>
        <span class="delete-btn" onclick="this.parentElement.remove()">×</span>
    `;
    otherLocationsList.appendChild(locationItem);
}

// Function to save user data and optionally navigate
function saveUserDataAndNavigate(navigateAfterSave) {
    // Get form values
    const gender = document.querySelector('input[name="gender"]:checked');
    const homeLocation = document.getElementById('home-location').value;
    const officeLocation = document.getElementById('office-location').value;
    const workSchedule = document.getElementById('work-schedule').value;
    const workstation = document.getElementById('workstation').value;
    const commuteMethod = document.getElementById('commute-method').value;
    const commuteTime = document.getElementById('commute-time').value;
    
    // Get other locations
    const otherLocations = [];
    document.querySelectorAll('.location-item').forEach(item => {
        const name = item.querySelector('.location-name').value;
        const address = item.querySelector('.location-address').value;
        if (name && address) {
            otherLocations.push({ name, address });
        }
    });
    
    // Validate required fields
    if (!gender) {
        alert('Please select your gender');
        return;
    }
    
    if (!homeLocation) {
        alert('Please enter your home location');
        return;
    }
    
    if (!officeLocation) {
        alert('Please enter your office location');
        return;
    }
    
    // Get current user
    const currentUser = getCurrentUser();
    if (!currentUser) {
        alert('User not found. Please log in again.');
        window.location.href = 'index.html';
        return;
    }
    
    // Save user data
    const userData = {
        gender: gender.value,
        homeLocation,
        officeLocation,
        otherLocations,
        workSchedule,
        workstation,
        commuteMethod,
        commuteTime,
        lastUpdated: new Date().toISOString()
    };
    
    if (saveUserData(currentUser.email, userData)) {
        // Show navigation button after successful save
        document.getElementById('nav-to-main').style.display = 'block';
        document.getElementById('save-and-navigate').style.display = 'inline-block';
        
        if (navigateAfterSave) {
            alert('Your profile information has been saved successfully! Redirecting to Live Maps...');
            window.location.href = 'main.html';
        } else {
            alert('Your profile information has been saved successfully!');
        }
    } else {
        alert('Error saving your information. Please try again.');
    }
}
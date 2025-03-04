// Display the saved exercises every time the user visits the website
window.onload = function () {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
        favorites = JSON.parse(storedFavorites);
        displayFavorites();
    }
};

// Handle form submition
document.querySelector('form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const type = document.getElementById('type').value;
    const muscle = document.getElementById('muscle').value;
    const difficulty = document.getElementById('difficulty').value;
    const apiKey = 'hoy4FdaA6bJHCRUWUhL79g==bZxQ5hwloIJ4PCwW';

    let url = `https://api.api-ninjas.com/v1/exercises?X-Api-Key=${apiKey}`;
    if (name) url += `&name=${name}`;
    if (type) url += `&type=${type}`;
    if (muscle) url += `&muscle=${muscle}`;
    if (difficulty) url += `&difficulty=${difficulty}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayResults(data);
        })
});

// Display the search results
function displayResults(data) {
    const results = document.getElementById('results');
    results.innerHTML = '';

    if (data.length === 0) {
        results.innerHTML = 'No exercises found.';
        return;
    }

    data.forEach(exercise => {
        const div = document.createElement('div');
        div.innerHTML = `
            <h3>${exercise.name}</h3>
            <p><strong>Type:</strong> ${exercise.type}</p>
            <p><strong>Muscle:</strong> ${exercise.muscle}</p>
            <p><strong>Difficulty:</strong> ${exercise.difficulty}</p>
            <p>${exercise.instructions}</p>
            <i class="fas fa-heart save-icon" title="Save Exercise"></i>
        `;

        div.querySelector('.save-icon').addEventListener('click', () => saveToFavorites(exercise));

        results.appendChild(div);
    });
}

// Save an exercise to favorites
let favorites = [];

function saveToFavorites(exercise) {
    if (!favorites.some(fav => fav.name === exercise.name)) {
        favorites.push(exercise);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        showNotification(`${exercise.name} added to favorites!`);
        displayFavorites();
    }
}

// Display the saved exercises
function displayFavorites() {
    const favoritesSection = document.getElementById('favorites');
    favoritesSection.innerHTML = '<h3>Your Favorite Exercises:</h3>';

    if (favorites.length === 0) {
        favoritesSection.innerHTML += '<p>No favorite exercises yet.</p>';
        return;
    }

    favorites.forEach((exercise, index) => {
        const favDiv = document.createElement('div');
        favDiv.classList.add('favorite-card');
        favDiv.innerHTML = `
            <h4>${exercise.name}</h4>
            <p>${exercise.type}</p>
            <button class="remove-btn" onclick="removeFavorite(${index})">Remove</button>
        `;
        favoritesSection.appendChild(favDiv);
    });
}

// Remove a saved exercise when the user clicks the delete button
function removeFavorite(index) {
    favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites();
}

// Show a confirmation message when the user saves an exercise
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000); 
}

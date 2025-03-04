//Handle form submition
document.getElementById('nutrition-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const food = document.getElementById('food').value;
    const apiKey = 'hoy4FdaA6bJHCRUWUhL79g==bZxQ5hwloIJ4PCwW';
    const url = `https://api.api-ninjas.com/v1/nutrition?query=${food}`;

    const resultsDiv = document.getElementById('nutrition-results');
    resultsDiv.innerHTML = 'Loading...';

    try {
        const response = await fetch(url, {
            headers: { 'X-Api-Key': apiKey }
        });
        const data = await response.json();

        if (data.length > 0) {
            resultsDiv.innerHTML = data.map(foodItem => `
                <div class="nutrition-card">
                    <h3>${foodItem.name}</h3>
                    <p><strong>Fat:</strong> ${foodItem.fat_total_g}g</p>
                    <p><strong>Carbs:</strong> ${foodItem.carbohydrates_total_g}g</p>
                    <p><strong>Sodium:</strong> ${foodItem.sodium_mg}mg</p>
                    <p><strong>Potassium:</strong> ${foodItem.potassium_mg}mg</p>
                    <p><strong>Cholesterol:</strong> ${foodItem.cholesterol_mg}mg</p>
                    <p><strong>Fiber:</strong> ${foodItem.fiber_g}g</p>
                    <p><strong>Sugar:</strong> ${foodItem.sugar_g}g</p>
                </div>
            `).join('');
        } else {
            resultsDiv.innerHTML = 'No nutritional information found.';
        }
    } catch (error) {
        resultsDiv.innerHTML = 'An error occurred. Please try again.';
    }
});
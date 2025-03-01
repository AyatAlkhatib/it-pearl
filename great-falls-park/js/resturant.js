// Listen for the form submission event
document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault();  // Prevent the default form submission behavior
    
    const searchQuery = document.getElementById('search-query').value;
    if (searchQuery) {
        searchRestaurants(searchQuery);  // Call the search function when the user submits a query
    }
});

// Function to search restaurants using Google Places API
function searchRestaurants(query) {
    const apiKey = 'YOUR_GOOGLE_API_KEY'; // Replace with your actual Google API key
    const apiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=halal+restaurants+in+${encodeURIComponent(query)}&key=${apiKey}`;
    
    // Fetch data from the Google Places API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayResults(data.results);  // Pass the results to the displayResults function
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('restaurants-list').innerHTML = '<p>Error fetching data. Please try again later.</p>';
        });
}

// Function to display the search results dynamically
function displayResults(restaurants) {
    const resultsContainer = document.getElementById('restaurants-list');
    resultsContainer.innerHTML = '';  // Clear previous results

    if (restaurants && restaurants.length > 0) {
        // Loop through each restaurant and create HTML elements to display the information
        restaurants.forEach(restaurant => {
            const restaurantDiv = document.createElement('div');
            restaurantDiv.classList.add('restaurant');
            restaurantDiv.innerHTML = `
                <h3>${restaurant.name}</h3>
                <p>${restaurant.formatted_address}</p>
                <p class="rating">Rating: ${restaurant.rating ? restaurant.rating : 'No rating available'}</p>
            `;
            resultsContainer.appendChild(restaurantDiv);
        });
    } else {
        resultsContainer.innerHTML = '<p>No results found. Try a different search.</p>';
    }
}

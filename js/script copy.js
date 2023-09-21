document.addEventListener("DOMContentLoaded", async function() {
    const apiKey = 'b6ca0c17b0mshc58453acf0204d5p1d4ddfjsnf85bee10df24';
    const apiUrl = 'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=12.91285&longitude=100.87808&limit=30&currency=USD&distance=2&open_now=false&lunit=km&lang=en_US';

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(apiUrl, options);
        const data = await response.json();
        displayRestaurants(data.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    function displayRestaurants(data) {
        const restaurantsContainer = document.getElementById('restaurants');
    
        if (data && data.length > 0) {
            data.forEach(restaurant => {
                if (restaurant.name) { // Check if name is defined
                    const restaurantCard = document.createElement('div');
                    restaurantCard.classList.add('col-md-4');
    
                    restaurantCard.innerHTML = `
                        <div class="card mb-4 box-shadow">
                            <img class="card-img-top" src="${restaurant.photo ? restaurant.photo.images.medium.url : 'placeholder.jpg'}" alt="${restaurant.name}" style="object-fit: cover; height: 225px;">
                            <div class="card-body">
                                <h5 class="card-title">${restaurant.name}</h5>
                                <p class="card-text">${restaurant.address}</p>
                            </div>
                        </div>
                    `;
    
                    restaurantsContainer.appendChild(restaurantCard);
                }
            });
        } else {
            // Display a message when no restaurants are found
            restaurantsContainer.innerHTML = '<p>No restaurants found nearby.</p>';
        }
    }
    
});

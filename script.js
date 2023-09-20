document.addEventListener("DOMContentLoaded", function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        fetchPlaces(36.7212, -4.4218); // Malaga, Spain
    }

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        fetchPlaces(latitude, longitude);
    }

    function error() {
        fetchPlaces(36.7212, -4.4218); // Malaga, Spain
    }

    function fetchPlaces(latitude, longitude) {
        const apiKey = '5ae2e3f221c38a28845f05b60d6724ff797b2d164014ab4c8c4979bd';
        const apiUrl = `https://api.opentripmap.com/0.1/en/places/radius?radius=10000&lon=${longitude}&lat=${latitude}&kinds=interesting_places&format=json&apikey=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => displayPlaces(data))
            .catch(error => console.error('Error fetching data:', error));
    }

    function displayPlaces(data) {
        const placesContainer = document.getElementById('places');

        data.features.forEach(place => {
            const placeCard = document.createElement('div');
            placeCard.classList.add('col-md-4', 'mb-4');

            placeCard.innerHTML = `
                <div class="card">
                    <img src="${place.properties.image}" class="card-img-top" alt="${place.properties.name}">
                    <div class="card-body">
                        <h5 class="card-title">${place.properties.name}</h5>
                        <p class="card-text">${place.properties.wikidata}</p>
                    </div>
                </div>
            `;

            placesContainer.appendChild(placeCard);
        });
    }
});

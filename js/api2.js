async function fetchData(location) {
    const url = `https://travel-advisor.p.rapidapi.com/locations/search?query=${location}&limit=30&offset=0&units=km&location_id=1&currency=USD&sort=relevance&lang=es`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e21c209f21mshef20eddbdb1fc18p1a3d20jsn49c232387112',
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        if (result.data && result.data.length > 0) {
            const restaurants = result.data.filter(item => item.result_type === 'restaurants');
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = ''; // Limpiar los resultados anteriores

            if (restaurants.length > 0) {
                restaurants.forEach(async restaurant => {
                    const restaurantDiv = document.createElement('div');
                    restaurantDiv.innerHTML = `
                        <h2>${restaurant.result_object.name}</h2>
                        <p><strong>Dirección:</strong> ${restaurant.result_object.address}</p>
                    `;

                    // Mostrar una sola foto del restaurante
                    const photos = restaurant.result_object.photo.images;
                    if (photos) {
                        const firstPhoto = Object.values(photos)[0]; // Get the first photo
                        if (firstPhoto) {
                            const img = document.createElement('img');
                            img.src = firstPhoto.url;
                            img.width = 300; // Set medium width
                            img.height = 200; // Set medium height
                            restaurantDiv.appendChild(img);
                        } else {
                            restaurantDiv.innerHTML += '<p>No hay fotos disponibles para este restaurante.</p>';
                        }
                    }

                    restaurantDiv.innerHTML += '<hr>'; // Separador entre restaurantes
                    resultsDiv.appendChild(restaurantDiv);
                });
            } else {
                resultsDiv.innerHTML = '<p>No se encontraron restaurantes en la ubicación buscada.</p>';
            }
        } else {
            resultsDiv.innerHTML = '<p>No se encontraron datos para la ubicación buscada.</p>';
        }
    } catch (error) {
        console.error(error);
    }
}

document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const location = document.getElementById('location-input').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Limpiar los resultados anteriores antes de hacer una nueva búsqueda
    if (location) {
        fetchData(location);
    } else {
        resultsDiv.innerHTML = '<p>Por favor, ingrese una región.</p>';
    }
});



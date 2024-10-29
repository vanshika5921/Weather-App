
// Fetch real-time weather data from API
const apiKey = '4c32458d3b942b5983436b7476b11f8c';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';



document.addEventListener('DOMContentLoaded', () => {
    getWeather('New York'); // Default city

    // Search bar functionality
    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            getWeather(searchBar.value);
        }
    });

   
});

// Function to get weather data
function getWeather(city) {
    fetch(`${apiUrl}${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => updateWeatherUI(data))
        .catch(error => console.error('Error fetching weather data:', error));
}

// Function to update the UI with fetched weather data
function updateWeatherUI(data) {
    document.getElementById('location-name').textContent = data.name;
    document.getElementById('temperature').textContent = `${data.main.temp}°C`;
    document.getElementById('weather-description').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind-speed').textContent = `Wind Speed: ${data.wind.speed} km/h`;

    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">`;
}

// to show weekly data


document.addEventListener('DOMContentLoaded', function() {
    const apiKey = "40a03e7f99a9ca402c55cd7a688535de";
    let city = "New York";

    // Function to fetch and display weather data
    function fetchWeatherData(city) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const forecastContainer = document.getElementById('forecast-container');
                forecastContainer.innerHTML = ''; // Clear any existing content

                // Track dates that have already been added to avoid duplicate days
                const datesAdded = [];

                data.list.forEach(forecast => {
                    const date = new Date(forecast.dt * 1000);  // Convert the Unix timestamp to a date
                    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
                    const dateString = date.toLocaleDateString('en-US');

                    // Add the forecast only if this date has not been added before
                    if (!datesAdded.includes(dateString)) {
                        datesAdded.push(dateString);

                        const dayForecast = document.createElement('div');
                        dayForecast.className = 'day-forecast';

                        dayForecast.innerHTML = `
                            <div class="day-name">${dayName}</div>
                            <div class="day-details">
                                <div class="day-temperature">${Math.round(forecast.main.temp)}°C</div>
                                <div class="day-weather-description">${forecast.weather[0].description}</div>
                                <div class="day-humidity">Humidity: ${forecast.main.humidity}%</div>
                                <div class="day-wind-speed">Wind Speed: ${Math.round(forecast.wind.speed)} km/h</div>
                            </div>
                        `;

                        forecastContainer.appendChild(dayForecast);
                    }
                });
            })
            .catch(error => console.error('Error fetching the weather data:', error));
    }

    // Fetch weather data for the default city when the page loads
    fetchWeatherData(city);

    // Add an event listener to the search bar
    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            city = searchBar.value.trim();
            if (city) {
                fetchWeatherData(city);
            }
        }
    });
});


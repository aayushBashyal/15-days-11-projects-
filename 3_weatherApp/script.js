// Simple Weather App JavaScript
const API_KEY = '4682f957fa3b46698f0140209251112';

// Get HTML elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const cityName = document.getElementById('cityName');
const currentDate = document.getElementById('currentDate');
const temperature = document.getElementById('temperature');
const condition = document.getElementById('condition');
const weatherIcon = document.getElementById('weatherIcon');
const feelsLike = document.getElementById('feelsLike');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const windDir = document.getElementById('windDir');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const forecastContainer = document.getElementById('forecastContainer');

// Fetch weather data
async function getWeather(city) {
    try {
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3`;
        const response = await fetch(url);
        
        if (!response.ok) {
            alert('City not found! Please try again.');
            return;
        }
        
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong! Please try again.');
    }
}

// Display weather data
function displayWeather(data) {
    // Current weather
    cityName.textContent = `${data.location.name}, ${data.location.country}`;
    
    const date = new Date();
    currentDate.textContent = date.toDateString();
    
    temperature.textContent = Math.round(data.current.temp_c) + '°C';
    condition.textContent = data.current.condition.text;
    weatherIcon.src = 'https:' + data.current.condition.icon;
    
    // Weather details
    feelsLike.textContent = Math.round(data.current.feelslike_c) + '°C';
    humidity.textContent = data.current.humidity + '%';
    windSpeed.textContent = Math.round(data.current.wind_kph) + ' km/h';
    windDir.textContent = data.current.wind_dir;
    sunrise.textContent = data.forecast.forecastday[0].astro.sunrise;
    sunset.textContent = data.forecast.forecastday[0].astro.sunset;
    
    // 3-day forecast
    displayForecast(data.forecast.forecastday);
}

// Display forecast
function displayForecast(forecast) {
    forecastContainer.innerHTML = '';
    
    const dayNames = ['Today', 'Tomorrow', 'Day After'];
    
    forecast.forEach((day, index) => {
        const card = document.createElement('div');
        card.className = 'forecast-card';
        
        card.innerHTML = `
            <div class="forecast-day">${dayNames[index]}</div>
            <div class="forecast-icon">
                <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
            </div>
            <div class="forecast-temp">
                <span class="high">${Math.round(day.day.maxtemp_c)}°</span>
                <span class="low">${Math.round(day.day.mintemp_c)}°</span>
            </div>
            <div class="forecast-condition">${day.day.condition.text}</div>
            <div class="forecast-details">
                <div class="forecast-detail">Rain: ${day.day.daily_chance_of_rain}%</div>
                <div class="forecast-detail">Wind: ${Math.round(day.day.maxwind_kph)} km/h</div>
            </div>
        `;
        
        forecastContainer.appendChild(card);
    });
}

// Event listener for search button
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
        cityInput.value = '';
    } else {
        alert('Please enter a city name!');
    }
});

// Event listener for Enter key
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

// Load default city on page load
window.addEventListener('load', () => {
    getWeather('Kathmandu');
});
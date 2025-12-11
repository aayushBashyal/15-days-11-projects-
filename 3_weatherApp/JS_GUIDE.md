# Weather App - JavaScript Guide

## All HTML IDs and Classes Reference

### Input Elements
```html
ID: #cityInput              - Search input field
ID: #searchForm             - Search form (listen for submit)
ID: #cityName               - Display city name
ID: #currentDate            - Display current date
```

### Main Weather Display
```html
ID: #temperature            - Display main temperature (e.g., "25")
ID: #condition              - Display weather condition text
ID: #weatherIcon            - Display weather icon (img src)
```

### Weather Details (6 Cards)
```html
ID: #feelsLike              - Display feels like temperature
ID: #humidity               - Display humidity percentage
ID: #windSpeed              - Display wind speed
ID: #windDir                - Display wind direction
ID: #sunrise                - Display sunrise time
ID: #sunset                 - Display sunset time
```

### Extra Info Cards
```html
ID: #visibility             - Display visibility distance
ID: #pressure               - Display pressure
```

### Forecast Container
```html
ID: #forecastContainer      - Container for 3-day forecast cards
```

---

## Step-by-Step JavaScript Example

### 1. Get Elements from HTML
```javascript
const API_KEY = '4682f957fa3b46698f0140209251112'

// Input and form elements
const cityInput = document.getElementById('cityInput');
const searchForm = document.getElementById('searchForm');

// Main weather display
const cityNameEl = document.getElementById('cityName');
const currentDateEl = document.getElementById('currentDate');
const temperatureEl = document.getElementById('temperature');
const conditionEl = document.getElementById('condition');
const weatherIconEl = document.getElementById('weatherIcon');

// Detail cards
const feelsLikeEl = document.getElementById('feelsLike');
const humidityEl = document.getElementById('humidity');
const windSpeedEl = document.getElementById('windSpeed');
const windDirEl = document.getElementById('windDir');
const sunriseEl = document.getElementById('sunrise');
const sunsetEl = document.getElementById('sunset');

// Extra info
const visibilityEl = document.getElementById('visibility');
const pressureEl = document.getElementById('pressure');

// Forecast container
const forecastContainer = document.getElementById('forecastContainer');
```

### 2. Create Fetch Function
```javascript
async function fetchWeather(city) {
    try {
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3`;
        const response = await fetch(url);
        const data = await response.json();
        
        // data structure:
        // data.current - current weather
        // data.location - city info
        // data.forecast.forecastday[0,1,2] - 3 days forecast
        
        return data;
    } catch (error) {
        console.error('Error fetching weather:', error);
    }
}
```

### 3. Update HTML with Data
```javascript
function displayWeather(data) {
    // Destructure the data
    const location = data.location;
    const current = data.current;
    const forecast = data.forecast.forecastday;
    
    // Display location
    cityNameEl.textContent = `${location.name}, ${location.country}`;
    
    // Display current date
    currentDateEl.textContent = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Display temperature
    temperatureEl.textContent = Math.round(current.temp_c);
    
    // Display condition
    conditionEl.innerHTML = `
        <i class="fas fa-cloud"></i>
        <span>${current.condition.text}</span>
    `;
    
    // Display weather icon
    weatherIconEl.src = 'https:' + current.condition.icon;
    
    // Display details
    feelsLikeEl.textContent = Math.round(current.feelslike_c) + '°';
    humidityEl.textContent = current.humidity + '%';
    windSpeedEl.textContent = Math.round(current.wind_kph) + ' km/h';
    windDirEl.textContent = current.wind_dir;
    sunriseEl.textContent = forecast[0].astro.sunrise;
    sunsetEl.textContent = forecast[0].astro.sunset;
    
    // Display extra info
    visibilityEl.textContent = current.vis_km + ' km';
    pressureEl.textContent = current.pressure_mb + ' mb';
    
    // Display 3-day forecast
    displayForecast(forecast);
}
```

### 4. Display 3-Day Forecast
```javascript
function displayForecast(forecastData) {
    // Clear previous forecast
    forecastContainer.innerHTML = '';
    
    const days = ['Today', 'Tomorrow', 'Day After'];
    
    forecastData.forEach((day, index) => {
        const forecastCard = document.createElement('div');
        forecastCard.className = 'col-md-4';
        
        forecastCard.innerHTML = `
            <div class="glass-card forecast-card">
                <div class="forecast-day">${days[index]}</div>
                <div class="forecast-icon">
                    <img src="https:${day.day.condition.icon}" alt="Weather">
                </div>
                <div class="forecast-temp">
                    <span class="high">${Math.round(day.day.maxtemp_c)}°</span>
                    <span class="low">${Math.round(day.day.mintemp_c)}°</span>
                </div>
                <div class="forecast-condition">${day.day.condition.text}</div>
                <div class="forecast-details">
                    <div class="forecast-detail">
                        <i class="fas fa-droplet"></i>
                        <span>${day.day.daily_chance_of_rain}%</span>
                    </div>
                    <div class="forecast-detail">
                        <i class="fas fa-wind"></i>
                        <span>${Math.round(day.day.maxwind_kph)} km/h</span>
                    </div>
                </div>
            </div>
        `;
        
        forecastContainer.appendChild(forecastCard);
    });
}
```

### 5. Handle Search
```javascript
searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const city = cityInput.value.trim();
    if (city === '') return;
    
    const data = await fetchWeather(city);
    if (data) {
        displayWeather(data);
    }
    
    cityInput.value = ''; // Clear input
});
```

### 6. Load Default City on Page Load
```javascript
window.addEventListener('DOMContentLoaded', async () => {
    const data = await fetchWeather('Kathmandu');
    if (data) {
        displayWeather(data);
    }
});
```

---

## Complete Script Example (Put in script.js)

```javascript
const API_KEY = '4682f957fa3b46698f0140209251112'

// ===== Element References =====
const cityInput = document.getElementById('cityInput');
const searchForm = document.getElementById('searchForm');

const cityNameEl = document.getElementById('cityName');
const currentDateEl = document.getElementById('currentDate');
const temperatureEl = document.getElementById('temperature');
const conditionEl = document.getElementById('condition');
const weatherIconEl = document.getElementById('weatherIcon');

const feelsLikeEl = document.getElementById('feelsLike');
const humidityEl = document.getElementById('humidity');
const windSpeedEl = document.getElementById('windSpeed');
const windDirEl = document.getElementById('windDir');
const sunriseEl = document.getElementById('sunrise');
const sunsetEl = document.getElementById('sunset');

const visibilityEl = document.getElementById('visibility');
const pressureEl = document.getElementById('pressure');

const forecastContainer = document.getElementById('forecastContainer');

// ===== Fetch Weather Data =====
async function fetchWeather(city) {
    try {
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather:', error);
    }
}

// ===== Display Current Weather =====
function displayWeather(data) {
    const location = data.location;
    const current = data.current;
    const forecast = data.forecast.forecastday;
    
    // Update main display
    cityNameEl.textContent = `${location.name}, ${location.country}`;
    
    currentDateEl.textContent = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    temperatureEl.textContent = Math.round(current.temp_c);
    
    conditionEl.innerHTML = `
        <i class="fas fa-cloud"></i>
        <span>${current.condition.text}</span>
    `;
    
    weatherIconEl.src = 'https:' + current.condition.icon;
    
    // Update detail cards
    feelsLikeEl.textContent = Math.round(current.feelslike_c) + '°';
    humidityEl.textContent = current.humidity + '%';
    windSpeedEl.textContent = Math.round(current.wind_kph) + ' km/h';
    windDirEl.textContent = current.wind_dir;
    sunriseEl.textContent = forecast[0].astro.sunrise;
    sunsetEl.textContent = forecast[0].astro.sunset;
    
    // Update extra info
    visibilityEl.textContent = current.vis_km + ' km';
    pressureEl.textContent = current.pressure_mb + ' mb';
    
    // Update forecast
    displayForecast(forecast);
}

// ===== Display 3-Day Forecast =====
function displayForecast(forecastData) {
    forecastContainer.innerHTML = '';
    
    const days = ['Today', 'Tomorrow', 'Day After'];
    
    forecastData.forEach((day, index) => {
        const forecastCard = document.createElement('div');
        forecastCard.className = 'col-md-4';
        
        forecastCard.innerHTML = `
            <div class="glass-card forecast-card">
                <div class="forecast-day">${days[index]}</div>
                <div class="forecast-icon">
                    <img src="https:${day.day.condition.icon}" alt="Weather">
                </div>
                <div class="forecast-temp">
                    <span class="high">${Math.round(day.day.maxtemp_c)}°</span>
                    <span class="low">${Math.round(day.day.mintemp_c)}°</span>
                </div>
                <div class="forecast-condition">${day.day.condition.text}</div>
                <div class="forecast-details">
                    <div class="forecast-detail">
                        <i class="fas fa-droplet"></i>
                        <span>${day.day.daily_chance_of_rain}%</span>
                    </div>
                    <div class="forecast-detail">
                        <i class="fas fa-wind"></i>
                        <span>${Math.round(day.day.maxwind_kph)} km/h</span>
                    </div>
                </div>
            </div>
        `;
        
        forecastContainer.appendChild(forecastCard);
    });
}

// ===== Event Listeners =====
searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const city = cityInput.value.trim();
    if (city === '') return;
    
    const data = await fetchWeather(city);
    if (data) {
        displayWeather(data);
    }
    
    cityInput.value = '';
});

// ===== Load Default City =====
window.addEventListener('DOMContentLoaded', async () => {
    const data = await fetchWeather('Kathmandu');
    if (data) {
        displayWeather(data);
    }
});
```

---

## API Response Data Structure

The WeatherAPI returns this structure:

```javascript
{
  location: {
    name: "Kathmandu",
    country: "Nepal",
    lat: 27.72,
    lon: 85.34
  },
  current: {
    temp_c: 22.5,
    temp_f: 72.5,
    feelslike_c: 21.2,
    humidity: 65,
    wind_kph: 12.5,
    wind_dir: "N",
    vis_km: 10.0,
    pressure_mb: 1010.0,
    condition: {
      text: "Partly cloudy",
      icon: "//cdn.weatherapi.com/weather/128x128/day/116.png"
    }
  },
  forecast: {
    forecastday: [
      {
        date: "2024-12-11",
        day: {
          maxtemp_c: 25.0,
          mintemp_c: 18.0,
          daily_chance_of_rain: 30,
          maxwind_kph: 15.0,
          condition: { text: "Cloudy", icon: "..." }
        },
        astro: {
          sunrise: "06:30 AM",
          sunset: "05:45 PM"
        }
      },
      // Day 2 and Day 3...
    ]
  }
}
```

---

## Common Tasks

### How to get current temperature?
```javascript
const temp = data.current.temp_c;
```

### How to format date nicely?
```javascript
const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric', 
    month: 'long',
    day: 'numeric'
});
```

### How to display forecast image?
```javascript
// WeatherAPI returns URLs like //cdn.weatherapi.com/...
// Need to add https: prefix
const iconUrl = 'https:' + day.day.condition.icon;
```

### How to add quick city buttons?
Listen for dropdown clicks and fetch that city:
```javascript
document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', async (e) => {
        e.preventDefault();
        const city = e.target.textContent.trim();
        const data = await fetchWeather(city);
        if (data) {
            displayWeather(data);
        }
    });
});
```

---

Happy coding! 🚀

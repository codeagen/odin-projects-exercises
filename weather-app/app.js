// Visual Crossing API configuration
const API_KEY = 'WWRDVY6RR72JAHXH7VR938BKV';
const API_BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

// Global state
let currentUnit = 'fahrenheit';
let currentWeatherData = null;

// DOM Elements
const weatherForm = document.getElementById('weatherForm');
const locationInput = document.getElementById('locationInput');
const searchBtn = document.getElementById('searchBtn');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const weatherDisplay = document.getElementById('weatherDisplay');
const fahrenheitBtn = document.getElementById('fahrenheitBtn');
const celsiusBtn = document.getElementById('celsiusBtn');

// API Functions
async function fetchWeatherData(location) {
    const url = `${API_BASE_URL}/${encodeURIComponent(location)}?unitGroup=us&key=${API_KEY}&contentType=json`;
    
    try {
        console.log('Fetching weather data for:', location);
        console.log('API URL:', url.replace(API_KEY, 'HIDDEN_API_KEY'));
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Raw API Response:', data);
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

// Data processing functions
function processWeatherData(data) {
    console.log('Processing weather data...');
    
    const current = data.currentConditions;
    const forecast = data.days.slice(0, 7);
    
    const processedData = {
        location: data.resolvedAddress,
        current: {
            temp: current.temp,
            feelsLike: current.feelslike,
            condition: current.conditions,
            humidity: current.humidity,
            windSpeed: current.windspeed,
            uvIndex: current.uvindex,
            icon: current.icon
        },
        forecast: forecast.map(day => ({
            date: new Date(day.datetime),
            tempMax: day.tempmax,
            tempMin: day.tempmin,
            condition: day.conditions,
            icon: day.icon
        }))
    };
    
    console.log('Processed weather data:', processedData);
    return processedData;
}

// Temperature conversion functions
function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function formatTemperature(temp, unit) {
    const convertedTemp = unit === 'celsius' ? fahrenheitToCelsius(temp) : temp;
    return `${Math.round(convertedTemp)}°${unit === 'celsius' ? 'C' : 'F'}`;
}

// UI Functions
function showLoading() {
    console.log('Showing loading state...');
    loadingDiv.style.display = 'block';
    weatherDisplay.style.display = 'none';
    errorDiv.style.display = 'none';
    searchBtn.disabled = true;
    searchBtn.textContent = 'Loading...';
}

function hideLoading() {
    console.log('Hiding loading state...');
    loadingDiv.style.display = 'none';
    searchBtn.disabled = false;
    searchBtn.textContent = 'Get Weather';
}

function showError(message) {
    console.error('Showing error:', message);
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    weatherDisplay.style.display = 'none';
}

function updateWeatherTheme(condition) {
    console.log('Updating weather theme for condition:', condition);
    
    const body = document.body;
    // Clear existing weather theme classes
    body.classList.remove('sunny', 'cloudy', 'rainy', 'snowy', 'clear-night');
    
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
        body.classList.add('sunny');
        console.log('Applied sunny theme');
    } else if (conditionLower.includes('cloud') || conditionLower.includes('overcast')) {
        body.classList.add('cloudy');
        console.log('Applied cloudy theme');
    } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle') || conditionLower.includes('shower')) {
        body.classList.add('rainy');
        console.log('Applied rainy theme');
    } else if (conditionLower.includes('snow') || conditionLower.includes('blizzard') || conditionLower.includes('sleet')) {
        body.classList.add('snowy');
        console.log('Applied snowy theme');
    }
}

function displayWeatherData(weatherData) {
    console.log('Displaying weather data:', weatherData);
    
    const { location, current, forecast } = weatherData;
    
    // Update current weather display
    document.getElementById('locationName').textContent = location;
    document.getElementById('currentTemp').textContent = formatTemperature(current.temp, currentUnit);
    document.getElementById('weatherCondition').textContent = current.condition;
    document.getElementById('feelsLike').textContent = formatTemperature(current.feelsLike, currentUnit);
    document.getElementById('humidity').textContent = `${Math.round(current.humidity)}%`;
    document.getElementById('windSpeed').textContent = `${Math.round(current.windSpeed)} mph`;
    document.getElementById('uvIndex').textContent = current.uvIndex || 'N/A';
    
    // Update forecast display
    const forecastGrid = document.getElementById('forecastGrid');
    forecastGrid.innerHTML = ''; // Clear existing forecast
    
    forecast.forEach((day, index) => {
        const dayName = index === 0 ? 'Today' : day.date.toLocaleDateString('en-US', { weekday: 'short' });
        
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        forecastItem.innerHTML = `
            <div class="forecast-day">${dayName}</div>
            <div class="weather-condition" style="font-size: 0.9em;">${day.condition}</div>
            <div class="forecast-temps">
                <span class="high-temp">${formatTemperature(day.tempMax, currentUnit)}</span>
                <span class="low-temp">${formatTemperature(day.tempMin, currentUnit)}</span>
            </div>
        `;
        forecastGrid.appendChild(forecastItem);
    });
    
    // Update visual theme and show weather display
    updateWeatherTheme(current.condition);
    weatherDisplay.style.display = 'block';
    errorDiv.style.display = 'none';
    
    console.log('Weather display updated successfully');
}

// Event Handlers
weatherForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const location = locationInput.value.trim();
    if (!location) {
        console.warn('No location entered');
        return;
    }
    
    console.log('Form submitted with location:', location);
    
    // Check if API key is set
    if (API_KEY === 'YOUR_API_KEY_HERE') {
        showError('Please set your Visual Crossing API key in the script.js file. Get your free API key at visualcrossing.com');
        return;
    }
    
    showLoading();
    
    try {
        // Simulate network delay for demonstration (you can remove this)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Fetch and process weather data
        const rawData = await fetchWeatherData(location);
        currentWeatherData = processWeatherData(rawData);
        
        // Display the weather data
        displayWeatherData(currentWeatherData);
        
    } catch (error) {
        console.error('Weather fetch error:', error);
        
        let errorMessage = 'Failed to fetch weather data. ';
        
        if (error.message.includes('401')) {
            errorMessage += 'Invalid API key. Please check your API key.';
        } else if (error.message.includes('400')) {
            errorMessage += 'Invalid location. Please check the location name.';
        } else if (error.message.includes('429')) {
            errorMessage += 'Rate limit exceeded. Please try again later.';
        } else {
            errorMessage += 'Please check the location name and your internet connection.';
        }
        
        showError(errorMessage);
    } finally {
        hideLoading();
    }
});

// Unit toggle event handlers
fahrenheitBtn.addEventListener('click', () => {
    if (currentUnit === 'fahrenheit') return;
    
    console.log('Switching to Fahrenheit');
    currentUnit = 'fahrenheit';
    fahrenheitBtn.classList.add('active');
    celsiusBtn.classList.remove('active');
    
    // Re-display data with new unit if weather data exists
    if (currentWeatherData) {
        displayWeatherData(currentWeatherData);
    }
});

celsiusBtn.addEventListener('click', () => {
    if (currentUnit === 'celsius') return;
    
    console.log('Switching to Celsius');
    currentUnit = 'celsius';
    celsiusBtn.classList.add('active');
    fahrenheitBtn.classList.remove('active');
    
    // Re-display data with new unit if weather data exists
    if (currentWeatherData) {
        displayWeatherData(currentWeatherData);
    }
});

// Initialize the application
console.log('Weather app initialized!');
console.log('Instructions:');
console.log('1. Get your free API key from https://www.visualcrossing.com/sign-up/');
console.log('2. Replace YOUR_API_KEY_HERE in this file with your actual API key');
console.log('3. Open index.html in your browser');
console.log('4. Enter a city name and click "Get Weather"');

// Optional: Load weather for user's approximate location (you can uncomment this)
/*
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords;
            locationInput.value = `${latitude},${longitude}`;
            console.log('Got user location:', latitude, longitude);
        },
        error => {
            console.log('Geolocation not available or denied:', error);
        }
    );
}
*/
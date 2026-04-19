const API_KEY = '9e4acd20f77f882d7673f880eaba53b8';

// --- MEJORA: Escuchar la tecla Enter ---
document.getElementById('cityInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = document.getElementById('cityInput').value;
        if (city) fetchWeather(city);
    }
});

document.getElementById('searchBtn').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    if (city) fetchWeather(city);
});

async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            alert("Ciudad no encontrada o error de API");
            return;
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error("Error:", error);
    }
}

function displayWeather(data) {
    const resultDiv = document.getElementById('weatherResult');
    const temp = Math.round(data.main.temp);
    
    // --- MEJORA: Cambio de fondo dinámico ---
    if (temp > 28) {
        // Clima cálido: Naranja/Rojo
        document.body.style.background = "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)";
    } else if (temp < 15) {
        // Clima frío: Azul oscuro/Gris
        document.body.style.background = "linear-gradient(135deg, #2c3e50 0%, #000000 100%)";
    } else {
        // Clima templado: El azul original
        document.body.style.background = "linear-gradient(135deg, #00b4db, #0083b0)";
    }

    resultDiv.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p class="temp">${temp}°C</p>
        <p>Humedad: ${data.main.humidity}%</p>
        <p>Condición: ${data.weather[0].description}</p>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
    `;
}
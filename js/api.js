const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

async function fetchJson(url) {
    const response = await fetch(url);

    if (!response.ok) {
        if (response.status >= 500) {
            throw new Error('El servicio del clima no está disponible en este momento. Inténtalo más tarde.');
        }

        if (response.status === 429) {
            throw new Error('Se alcanzó el límite de consultas. Espera un momento e inténtalo de nuevo.');
        }

        throw new Error(`No fue posible completar la consulta (error ${response.status}).`);
    }

    try {
        return await response.json();
    } catch {
        throw new Error('El servicio devolvió una respuesta con formato inválido.');
    }
}

function validateBasicInput(city) {
    if (typeof city !== 'string' || !city.trim()) {
        throw new Error('El campo está vacío. Escribe el nombre de una ciudad.');
    }

    const cleanCity = city.trim().replace(/\s+/g, ' ');

    if (cleanCity.length < 2) {
        throw new Error('Escribe al menos dos caracteres para buscar una ciudad.');
    }

    if (cleanCity.length > 100) {
        throw new Error('El nombre es demasiado largo. Usa un nombre más corto.');
    }

    if (/\p{C}/u.test(cleanCity)) {
        throw new Error('El nombre contiene caracteres invisibles no válidos.');
    }

    if (/[<>{}|\\^~\[\]`]/.test(cleanCity)) {
        throw new Error('El nombre contiene caracteres no permitidos.');
    }

    if (/javascript:|data:|vbscript:|on\w+=/i.test(cleanCity)) {
        throw new Error('El nombre contiene un patrón no permitido.');
    }

    if (!/\p{Letter}/u.test(cleanCity)) {
        throw new Error('El nombre debe contener al menos una letra.');
    }

    return cleanCity;
}

function analyzeCityNotFound(input) {
    if (/\d/.test(input)) {
        return `No encontramos una ciudad llamada "${input}". Los nombres de ciudades generalmente no contienen números.`;
    }

    if (/[^\p{L}\s\-'.áéíóúñü]/u.test(input)) {
        return `No encontramos una ciudad con caracteres especiales en "${input}". Prueba solo con letras, espacios y guiones.`;
    }

    if (input.length < 3) {
        return `No encontramos resultados para "${input}". Prueba con un nombre más largo.`;
    }

    return `No encontramos una ciudad llamada "${input}". Verifica el nombre e inténtalo de nuevo.`;
}

/**
 * Busca una ciudad y obtiene su clima actual desde Open-Meteo.
 * @param {string} city Nombre de la ciudad.
 * @returns {Promise<object>} Datos meteorológicos normalizados.
 */
export async function getWeather(city) {
    try {
        const cleanCity = validateBasicInput(city);

        const geocodingParams = new URLSearchParams({
            name: cleanCity,
            count: '1',
            language: 'es',
            format: 'json'
        });
        const locationData = await fetchJson(`${GEOCODING_URL}?${geocodingParams}`);

        const location = Array.isArray(locationData.results) ? locationData.results[0] : null;

        if (!location) {
            throw new Error(analyzeCityNotFound(cleanCity));
        }

        const weatherParams = new URLSearchParams({
            latitude: String(location.latitude),
            longitude: String(location.longitude),
            current: 'temperature_2m,wind_speed_10m,weather_code',
            temperature_unit: 'celsius',
            wind_speed_unit: 'kmh',
            timezone: 'auto'
        });
        const weatherData = await fetchJson(`${WEATHER_URL}?${weatherParams}`);

        if (
            !weatherData.current ||
            typeof weatherData.current.temperature_2m !== 'number' ||
            typeof weatherData.current.wind_speed_10m !== 'number' ||
            typeof weatherData.current.weather_code !== 'number'
        ) {
            throw new Error('La respuesta del clima no tiene datos actuales válidos.');
        }

        return {
            city: location.name,
            country: location.country,
            admin1: location.admin1,
            timezone: weatherData.timezone,
            temperature: weatherData.current.temperature_2m,
            windSpeed: weatherData.current.wind_speed_10m,
            weatherCode: weatherData.current.weather_code
        };
    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error('No pudimos conectar con el servicio del clima. Revisa tu conexión a internet.');
        }

        throw error;
    }
}

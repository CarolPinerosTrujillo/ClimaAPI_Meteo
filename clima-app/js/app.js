import { getWeather } from './api.js';
import { formatWeather } from './weather.js';
import {
    getCityInput,
    getSearchForm,
    onCityShortcut,
    onClearHistory,
    renderHistory,
    setLoading,
    showError,
    showWeather
} from './ui.js';

const HISTORY_KEY = 'clima-app:last-searches';
const MAX_HISTORY_ITEMS = 5;

function readHistory() {
    try {
        const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
        return Array.isArray(history) ? history : [];
    } catch {
        return [];
    }
}

function saveToHistory(city) {
    const updatedHistory = [city, ...readHistory().filter((item) => item.toLowerCase() !== city.toLowerCase())]
        .slice(0, MAX_HISTORY_ITEMS);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
    renderHistory(updatedHistory);
}

async function searchCity(city) {
    const cleanCity = city.trim();

    if (!cleanCity) {
        showError('Ingresa una ciudad válida para buscar.');
        return;
    }

    getCityInput().value = cleanCity;
    setLoading(true);

    try {
        const weather = await getWeather(cleanCity);
        showWeather(formatWeather(weather));
        saveToHistory(weather.city);
    } catch (error) {
        showError(error.message || 'Ocurrió un error inesperado. Inténtalo de nuevo.');
    } finally {
        setLoading(false);
    }
}

getSearchForm().addEventListener('submit', (event) => {
    event.preventDefault();
    searchCity(getCityInput().value);
});

onCityShortcut(searchCity);
onClearHistory(() => {
    localStorage.removeItem(HISTORY_KEY);
    renderHistory([]);
});

renderHistory(readHistory());

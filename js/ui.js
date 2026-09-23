const elements = {
    form: document.querySelector('#search-form'),
    input: document.querySelector('#city-input'),
    button: document.querySelector('#search-button'),
    recommendedCities: document.querySelector('#recommended-cities'),
    historySection: document.querySelector('#history-section'),
    historyList: document.querySelector('#history-list'),
    clearHistory: document.querySelector('#clear-history'),
    status: document.querySelector('#status-message'),
    result: document.querySelector('#weather-result'),
    cityName: document.querySelector('#city-name'),
    locationDetails: document.querySelector('#location-details'),
    icon: document.querySelector('#weather-icon'),
    temperature: document.querySelector('#temperature'),
    windSpeed: document.querySelector('#wind-speed'),
    description: document.querySelector('#weather-description')
};

export function getSearchForm() {
    return elements.form;
}

export function getCityInput() {
    return elements.input;
}

export function onCityShortcut(callback) {
    elements.recommendedCities.addEventListener('click', (event) => {
        const cityButton = event.target.closest('[data-city]');

        if (cityButton) {
            callback(cityButton.dataset.city);
        }
    });

    elements.historyList.addEventListener('click', (event) => {
        const cityButton = event.target.closest('[data-city]');

        if (cityButton) {
            callback(cityButton.dataset.city);
        }
    });
}

export function onClearHistory(callback) {
    elements.clearHistory.addEventListener('click', callback);
}

export function renderHistory(cities) {
    elements.historyList.replaceChildren();
    elements.historySection.hidden = cities.length === 0;

    cities.forEach((city) => {
        const cityButton = document.createElement('button');
        cityButton.type = 'button';
        cityButton.className = 'city-chip city-chip--history';
        cityButton.dataset.city = city;
        cityButton.textContent = city;
        elements.historyList.append(cityButton);
    });
}

export function setLoading(isLoading) {
    elements.button.disabled = isLoading;
    elements.input.disabled = isLoading;
    elements.button.textContent = isLoading ? 'Consultando...' : 'Consultar';

    if (isLoading) {
        elements.status.textContent = 'Buscando la ciudad y su clima...';
        elements.status.classList.remove('status-message--error');
    }
}

export function showError(message) {
    elements.result.hidden = true;
    elements.status.textContent = message;
    elements.status.classList.add('status-message--error');
}

export function showWeather(weather) {
    elements.status.textContent = '';
    elements.status.classList.remove('status-message--error');
    elements.cityName.textContent = weather.city;
    elements.locationDetails.textContent = `${weather.location} · Zona horaria: ${weather.timezone}`;
    elements.icon.textContent = weather.icon;
    elements.icon.className = `weather-icon ${weather.iconClass}`;
    elements.temperature.textContent = weather.temperatureText;
    elements.windSpeed.textContent = weather.windText;
    elements.description.textContent = weather.description;
    elements.result.hidden = false;
}

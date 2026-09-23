const WEATHER_DESCRIPTIONS = {
    0: { description: 'Cielo despejado', icon: '☀︎', iconClass: 'weather-icon--sun' },
    1: { description: 'Principalmente despejado', icon: '☀︎', iconClass: 'weather-icon--sun' },
    2: { description: 'Parcialmente nublado', icon: '☁︎', iconClass: 'weather-icon--cloud' },
    3: { description: 'Nublado', icon: '☁︎', iconClass: 'weather-icon--cloudy' },
    45: { description: 'Niebla', icon: '☁︎', iconClass: 'weather-icon--cloudy' },
    48: { description: 'Niebla con escarcha', icon: '☁︎', iconClass: 'weather-icon--cloudy' },
    51: { description: 'Llovizna ligera', icon: '☁︎', iconClass: 'weather-icon--cloud' },
    53: { description: 'Llovizna moderada', icon: '☁︎', iconClass: 'weather-icon--cloud' },
    55: { description: 'Llovizna intensa', icon: '☁︎', iconClass: 'weather-icon--cloud' },
    61: { description: 'Lluvia ligera', icon: '☁︎', iconClass: 'weather-icon--cloud' },
    63: { description: 'Lluvia moderada', icon: '☁︎', iconClass: 'weather-icon--cloud' },
    65: { description: 'Lluvia intensa', icon: '☁︎', iconClass: 'weather-icon--cloud' },
    71: { description: 'Nevada ligera', icon: '❄︎', iconClass: 'weather-icon--cloud' },
    73: { description: 'Nevada moderada', icon: '❄︎', iconClass: 'weather-icon--cloud' },
    75: { description: 'Nevada intensa', icon: '❄︎', iconClass: 'weather-icon--cloud' },
    80: { description: 'Chubascos ligeros', icon: '☁︎', iconClass: 'weather-icon--cloud' },
    81: { description: 'Chubascos moderados', icon: '☁︎', iconClass: 'weather-icon--cloud' },
    82: { description: 'Chubascos fuertes', icon: '☁︎', iconClass: 'weather-icon--cloud' },
    95: { description: 'Tormenta eléctrica', icon: '⚡︎', iconClass: 'weather-icon--cloudy' },
    96: { description: 'Tormenta con granizo ligero', icon: '⚡︎', iconClass: 'weather-icon--cloudy' },
    99: { description: 'Tormenta con granizo fuerte', icon: '⚡︎', iconClass: 'weather-icon--cloudy' }
};

export function describeWeatherCode(code) {
    return WEATHER_DESCRIPTIONS[code] ?? {
        description: 'Estado no disponible',
        icon: '◌',
        iconClass: 'weather-icon--cloud'
    };
}

export function formatWeather(weather) {
    const condition = describeWeatherCode(weather.weatherCode);
    const region = [weather.admin1, weather.country].filter(Boolean).join(', ');

    return {
        ...weather,
        description: condition.description,
        icon: condition.icon,
        iconClass: condition.iconClass,
        location: region || 'Ubicación no disponible',
        temperatureText: `${weather.temperature.toFixed(1)} °C`,
        windText: `${weather.windSpeed.toFixed(1)} km/h`
    };
}

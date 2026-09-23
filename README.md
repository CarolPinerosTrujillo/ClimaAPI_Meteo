# ClimaAPI Meteo — ClimaApp

Aplicación web que consulta el clima actual de cualquier ciudad usando la API gratuita [Open-Meteo](https://open-meteo.com). Está pensada para las ciudades de los estudiantes de **Generation** (Bogotá, Medellín, Popayán, Cali y Barranquilla), aunque permite buscar cualquier ciudad del mundo.

## Características

- Consulta de clima actual: temperatura, velocidad del viento y estado del tiempo.
- Geocodificación de ciudades con la API de Open-Meteo (soporta acentos y tildes).
- Ciudades recomendadas de un clic.
- Historial de las últimas 5 búsquedas guardado en `localStorage`.
- Validación de entrada y manejo de errores amigable en español.
- Diseño responsive y accesible (aria-live, roles, navegación por teclado).

## Estructura

```
clima-app/
├── index.html          # Interfaz principal
├── css/styles.css      # Estilos de la aplicación
├── js/
│   ├── app.js          # Orquestación, historial y flujo de búsqueda
│   ├── api.js          # Cliente de Open-Meteo y validación de entrada
│   ├── ui.js           # Manipulación del DOM y renderizado
│   └── weather.js      # Traducción de códigos meteorológicos y formato
├── assets/             # Imágenes e íconos
└── package.json        # Definición del proyecto (ES modules)
```

## Uso

Abre `index.html` en tu navegador o sirve la carpeta con cualquier servidor estático:

```bash
# Opción con npx (sin instalar nada)
npx serve clima-app
```

Luego escribe una ciudad en el buscador o haz clic en una de las recomendadas.

## Origen del proyecto

> Este proyecto fue creado por estudiantes de Generation con un enfoque de
> **prompt engineering**: la aplicación se construyó de forma **constructiva y
> guiada mediante ingeniería de prompts** usando **GitHub Copilot** y **opencode**,
> refinando paso a paso la interfaz, el consumo de la API y el manejo de errores.

## Notas sobre la documentación

El archivo `documentacion.md` (documentación interna de desarrollo) no se sube al
repositorio: está excluido en `.gitignore`.
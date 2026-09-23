# ClimaAPI Meteo — ClimaApp

Aplicación web que consulta el clima actual de cualquier ciudad usando la API gratuita [Open-Meteo](https://open-meteo.com). Está pensada para las ciudades de los estudiantes de **Generation** (Bogotá, Medellín, Popayán, Cali y Barranquilla), aunque permite buscar cualquier ciudad del mundo.

## Uso

Abre `index.html` en tu navegador o sirve la carpeta con cualquier servidor estático:

```bash
# Opción con npx (sin instalar nada)
npx serve clima-app
```

Luego escribe una ciudad en el buscador o haz clic en una de las recomendadas.

**Ejemplos de búsqueda válidos:**
- `Bogotá` → temperatura y viento actuales de Bogotá.
- `New York` → clima de la ciudad ingresada.
- `Popayán` (chip recomendado) → consulta en un clic.
- `Bogotá D.C.` → se normaliza y busca la ciudad correctamente.

## Restricciones al ingresar el dato

Antes de consultar el clima, el nombre de la ciudad pasa por varias validaciones. Si no las cumple, la app muestra un mensaje y no realiza la petición:

| Restricción | Regla | Ejemplo que se rechaza |
| --- | --- | --- |
| Campo vacío | No se puede enviar sin texto | `""` o `"   "` |
| Longitud mínima | Al menos 2 caracteres | `"x"` |
| Longitud máxima | Máximo 100 caracteres | `"aaaa... (101 letras)"` |
| Caracteres invisibles | No se admiten caracteres de control | `"Bogotá\n..."` |
| Caracteres especiales | No se admiten `<`, `>`, `{`, `}`, `\|`, `\`, `^`, `~`, `[`, `]` ni `` ` `` | `"Bogotá{"` |
| Patrón de inyección | No se admiten `javascript:`, `data:`, `vbscript:`, `onX=` | `"<script>alert(1)</script>"` o `"javascript:..."` |
| Sin letras | Debe contener al menos una letra | `"12345"` |
| Ciudad inexistente | Si no hay resultados, se muestra un consejo según el tipo de error | `"xyzabcquechonotienecasa"` |

**Mensajes que verás si no se cumple una regla:**
- `El campo está vacío. Escribe el nombre de una ciudad.`
- `Escribe al menos dos caracteres para buscar una ciudad.`
- `No encontramos una ciudad llamada "xyz". Verifica el nombre e inténtalo de nuevo.`

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

## Origen del proyecto

> Este proyecto fue creado por estudiantes de Generation con un enfoque de
> **prompt engineering**: la aplicación se construyó de forma **constructiva y
> guiada mediante ingeniería de prompts** usando **GitHub Copilot** y **opencode**,
> refinando paso a paso la interfaz, el consumo de la API y el manejo de errores.


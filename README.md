# 🏎️ F1 2026 · Data Garage

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Material--UI-v9-007FFF?style=for-the-badge&logo=mui&logoColor=white" alt="Material UI" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/GSAP-3.15-88CE02?style=for-the-badge&logo=greensock&logoColor=black" alt="GSAP" />
</p>

Aplicación web sobre la Fórmula 1 con datos reales de la temporada 2026: pilotos, escuderías, calendario, resultados y clasificaciones. Tiene un diseño oscuro y futurista, con animaciones y scroll suave para que sea agradable de recorrer.

---

## ✨ Características

- **Pilotos:** fichas de toda la parrilla con dorsal, equipo, estadísticas y retrato.
- **Escuderías:** tarjetas de cada constructor con sus colores, motor y datos clave.
- **Carreras y clasificaciones:** calendario, resultados de cada Gran Premio y campeonatos de pilotos y constructores.
- **Circuitos y galería:** trazados, longitud, récords de vuelta y datos técnicos.
- **Datos en tiempo real:** consumo de dos APIs públicas de F1, con caché en `sessionStorage` para que la navegación sea rápida y no se repitan peticiones.
- **Animaciones cuidadas:** pantalla de intro, hero animado, transiciones entre secciones y scroll inercial.

---

## 🛠️ Tecnologías

| Área | Herramientas |
| :--- | :--- |
| Framework | React 19 |
| Build | Vite |
| UI | Material UI v9 con tema oscuro personalizado, Emotion |
| Animaciones | Framer Motion, GSAP, Lenis (smooth scroll) |
| Tipografías | Bebas Neue, Rajdhani |
| Datos | Jolpica F1 API (Ergast), OpenF1 API |

---

## 🚀 Ejecutar en local

Necesitas Node.js 18 o superior.

```bash
git clone https://github.com/Purvish69/F1.git
cd F1
npm install
npm run dev
```

Se abre en `http://localhost:5173`.

Para generar la versión de producción: `npm run build`.

---

## 🛰️ Fuentes de datos

- [Jolpica F1 API](https://api.jolpi.ca/ergast/f1): datos históricos y de temporada, basada en Ergast.
- [OpenF1](https://openf1.org/): telemetría y tiempos en vivo.

Proyecto sin ánimo de lucro. Las marcas y logotipos de Fórmula 1 pertenecen a sus respectivos propietarios.

---

## 👤 Autor

Hecho por [Purvish](https://github.com/Purvish69).

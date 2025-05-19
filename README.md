# Tech Practice Frontend

Este proyecto es un clon de la página de detalle de producto de Mercado Libre, construido con Next.js, React y Tailwind CSS.

## Requisitos
- Node.js >= 18.18.0
- npm >= 9.0.0

## Stack
- **Frontend:** Next.js, React, Tailwind CSS
- **Tests:** Jest, React Testing Library
- **Propósito:** Prototipo de página de producto para práctica técnica.

Para instrucciones de instalación, ejecución y pruebas, consulta el archivo `run.md` en esta misma carpeta.

## Estructura de carpetas principal
```
tech-practice-frontend/
├── __tests__/           # Tests en la raíz (convención de Jest)
├── app/                 # Páginas y rutas de Next.js
├── components/          # Componentes reutilizables
├── lib/                 # Utilidades y lógica de negocio
├── public/              # Archivos estáticos
└── ...
```

## Convención de nombres de Jest
- La carpeta `__tests__` en la raíz sigue la convención de Jest para identificar automáticamente archivos de test.
- Jest busca carpetas que empiecen con `__` para ejecutar los tests sin configuración adicional.

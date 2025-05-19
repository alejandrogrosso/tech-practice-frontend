# Instrucciones para ejecutar el Frontend

Este frontend está construido con Next.js y Tailwind CSS.

## Instalación

```bash
npm install --legacy-peer-deps
```

## Variables de entorno

Crea un archivo `.env.local` con:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api 
```

## Ejecución en desarrollo

```bash
npm run dev
```

## Tests

```bash
npm test
```

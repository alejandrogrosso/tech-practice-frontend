# Instrucciones de Ejecución

## Requisitos Previos
- Node.js >= 18.18.0

Si tu versión de Node.js es inferior a 18.18.0, puedes actualizarla usando nvm (Node Version Manager):

```bash
# Instalar nvm (si no lo tienes)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Instalar Node.js 18.18.0
nvm install 18.18.0
nvm use 18.18.0
```

## Instalación

```bash
npm install --legacy-peer-deps
```

## Variables de entorno
Crea un archivo `.env.local` en la raíz del proyecto con el siguiente contenido:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api 
```

## Ejecución en desarrollo
```bash
npm run dev
```
La aplicación estará disponible en: http://localhost:3000

## Tests
```bash
# Ejecutar tests
npm test

# Ejecutar tests con cobertura
npm run test:coverage
```

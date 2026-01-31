# Imagen base de Node.js
FROM node:18-alpine

# Directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar TODAS las dependencias (incluye devDependencies para compilar)
RUN npm ci

# Copiar el resto del código
COPY . .

# Compilar TypeScript a JavaScript
RUN npm run build

# Limpiar devDependencies para producción (opcional, reduce tamaño)
RUN npm prune --production

# Exponer el puerto (Render usa la variable PORT)
EXPOSE ${PORT:-3000}

# Usuario no-root por seguridad
USER node

# Comando de inicio - USA EL CÓDIGO COMPILADO
CMD ["node", "dist/main.js"]